const fastify = require('fastify')({ logger: true })

fastify.register(require('@fastify/postgres'), {
  connectionString: `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
})

fastify.register(require('@fastify/cors'), {
  origin: '*',
  methods: ['GET', 'POST'],
})

fastify.get('/', (request, reply) => {
  reply.send({
    empresa: "TT-burger",
    aplicação: "Portal de Vendas",
    rotas: ["/vendas"]
  })
});

const getVendasOpts = {
  schema: {
    response: {
      200: {
        "type": "array",
        "minItems": 0,
        "items": {
          "type": "object",
          "properties": {
            "loja": {
              "type": "string"
            },
            "data": {
              "type": "string"
            },
            "valor_total": {
              "type": ["string", "null"]
            },
            "qtd_produtos": {
              "type": ["string", "null"]
            },
            "qtd_clientes": {
              "type": ["string", "null"]
            },
            "qtd_vendas": {
              "type": ["string", "null"]
            },
            "meta_valor": {
              "type": ["string", "null"]
            },
            "meta_prod_clt": {
              "type": ["string", "null"]
            }
          },
          "required": [
            "loja",
            "data",
          ]
        }
      }
    }
  }
}


fastify.get('/vendas/:data', getVendasOpts, (req, reply) => {
  fastify.pg.query(
    `SELECT 
    ag_vendas.loja, 
    ag_vendas.data, 
    ag_vendas.valor_total, 
    ag_vendas.qtd_produtos, 
    ag_vendas.qtd_clientes, 
    ag_vendas.qtd_vendas, 
    metas.meta_valor, 
    metas.meta_prod_clt 
  FROM 
    (
      select 
        con.loja, 
        con.data, 
        sum(con.valor_total) AS valor_total, 
        count(DISTINCT con.id_venda) AS qtd_vendas, 
        sum(con.qtd_produtos) AS qtd_produtos, 
        count(DISTINCT con.id_cliente) AS qtd_clientes 
      FROM 
        (
          SELECT 
            ORDER_TABLE.ID_VENDA, 
            ORDER_TABLE.DATA, 
            ORDER_TABLE.LOJA, 
            SUM(ORDER_TABLE.qtd_produtos) AS QTD_PRODUTOS, 
            SUM(ORDER_TABLE.VALOR_TOTAL) AS VALOR_TOTAL, 
            ORDER_TABLE.id_cliente 
          FROM 
            (
              SELECT 
                VENDAS.ID_VENDA, 
                VENDAS.DATA, 
                VENDAS.LOJA, 
                NULL AS QTD_PRODUTOS, 
                SUM(VENDAS.VALOR_EFETIVO) AS VALOR_TOTAL, 
                VENDAS.ID_CLIENTE 
              FROM 
                VENDAS 
              WHERE 
                VENDAS.CANCELADA = 'f' AND
				VENDAS.DATA = CAST($1 AS DATE)
              GROUP BY 
                VENDAS.ID_VENDA, 
                VENDAS.DATA, 
                VENDAS.LOJA, 
                VENDAS.ID_CLIENTE 
              UNION 
              SELECT 
                PROD.ID_VENDA, 
                PROD.DATA, 
                PROD.LOJA, 
                SUM(PROD.QUANTIDADE) AS QTD_PRODUTOS, 
                NULL AS VALOR_TOTAL, 
                NULL AS QTD_CLIENTES 
              FROM 
                VENDA_PRODUTOS AS PROD 
              WHERE 
                PROD.CANCELADO = 'N' AND
				PROD.DATA = CAST($1 AS DATE)
              GROUP BY 
                PROD.ID_VENDA, 
                PROD.DATA, 
                PROD.LOJA
            ) AS ORDER_TABLE 
          GROUP BY 
            ORDER_TABLE.ID_VENDA, 
            ORDER_TABLE.DATA, 
            ORDER_TABLE.LOJA, 
            ORDER_TABLE.id_cliente 
          ORDER BY 
            ORDER_TABLE.ID_VENDA
        ) AS con 
      GROUP BY 
        con.data, 
        con.loja
    ) AS ag_vendas 
    LEFT JOIN metas ON ag_vendas.loja = metas.loja
	WHERE 
		metas.DATA = CAST($1 AS DATE)
    ORDER BY ag_vendas.loja;`, [req.params.data],
    function onResult(err, result) {

      reply.send(err || result.rows);
    }
  )
});

// Server
fastify.listen({ port: 5000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  } else {
    console.log('Server is up and running on port 5000')
  }
})
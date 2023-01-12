const fastify = require('fastify')({logger: true}) 

fastify.register(require('@fastify/postgres'), {
  connectionString:  `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
})

fastify.register(require('@fastify/cors'), {
  origin:'*',
  methods:['GET','POST'],
})

fastify.get('/', (request, reply) => {
  reply.send({
      empresa: "TT-burger",
      aplicação: "Portal de Vendas",
      rotas: [ "/vendas" ]
      })
});

const getVendasOpts =  {
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
    

fastify.get('/vendas', getVendasOpts, (req, reply) => {
  fastify.pg.query(
    `SELECT 
    ag_vendas.loja, 
    ag_vendas.data, 
    ag_vendas.valor_total, 
    ag_vendas.qtd_produtos, 
    ag_vendas.qtd_clientes, 
    metas.meta_valor, 
    metas.meta_prod_clt 
  FROM 
    (
      select 
        con.loja, 
        con.data, 
        sum(valor_efetivo) AS valor_total, 
        count(DISTINCT con.id_venda) AS qtd_vendas, 
        sum(con.quantidade) AS qtd_produtos, 
        count(DISTINCT con.id_cliente) AS qtd_clientes 
      FROM 
        (
          SELECT 
            vendas.id_venda, 
            vendas.data, 
            vendas.loja, 
            NULL AS quantidade, 
            vendas.valor_efetivo, 
            vendas.id_cliente 
          FROM 
            vendas 
          WHERE 
            vendas.cancelada = 'f' 
          UNION 
          SELECT 
            prod.id_venda, 
            prod.data, 
            prod.loja, 
            prod.quantidade, 
            NULL, 
            NULL 
          FROM 
            venda_produtos AS prod 
          WHERE 
            prod.cancelado = 'N'
        ) AS con 
      GROUP BY 
        con.data, 
        con.loja
    ) AS ag_vendas 
    LEFT JOIN metas ON ag_vendas.loja = metas.loja;`,
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
    console.log('Server is up and running on port 5000' )
  }
})
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
          "items": [
            {

              "type": "object",
              "properties": {
                "loja": {
                  "type": "string"
                },
                "data": {
                  "type": "string"
                },
                "meta_valor": {
                  "type": "string"
                },
                "meta_prod_clt": {
                  "type": "string"
                },
                "qtd_compras": {
                  "type": "string"
                },
                "qtd_produtos_vendidos": {
                  "type": "string"
                },
                "valor_total": {
                  "type": "string"
                },
                "qtd_clientes": {
                  "type": "string"
                }
              },
              "required": [
                "loja",
                "data",
                "meta_valor",
                "meta_prod_clt",
                "qtd_compras",
                "qtd_produtos_vendidos",
                "valor_total",
                "qtd_clientes"
              ]
            },
            {
              "type": "object",
              "properties": {
                "loja": {
                  "type": "string"
                },
                "data": {
                  "type": "string"
                },
                "meta_valor": {
                  "type": "string"
                },
                "meta_prod_clt": {
                  "type": "string"
                },
                "qtd_compras": {
                  "type": "string"
                },
                "qtd_produtos_vendidos": {
                  "type": "string"
                },
                "valor_total": {
                  "type": "string"
                },
                "qtd_clientes": {
                  "type": "string"
                }
              },
              "required": [
                "loja",
                "data",
                "meta_valor",
                "meta_prod_clt",
                "qtd_compras",
                "qtd_produtos_vendidos",
                "valor_total",
                "qtd_clientes"
              ]
            },
            {
              "type": "object",
              "properties": {
                "loja": {
                  "type": "string"
                },
                "data": {
                  "type": "string"
                },
                "meta_valor": {
                  "type": "string"
                },
                "meta_prod_clt": {
                  "type": "string"
                },
                "qtd_compras": {
                  "type": "null"
                },
                "qtd_produtos_vendidos": {
                  "type": "null"
                },
                "valor_total": {
                  "type": "null"
                },
                "qtd_clientes": {
                  "type": "null"
                }
              },
              "required": [
                "loja",
                "data",
                "meta_valor",
                "meta_prod_clt",
                "qtd_compras",
                "qtd_produtos_vendidos",
                "valor_total",
                "qtd_clientes"
              ]
            }
          ]
        }
      }
    }
  }
    

fastify.get('/vendas', getVendasOpts, (req, reply) => {
  fastify.pg.query(
    `select metas.loja, metas.data, metas.meta_valor, metas.meta_prod_clt,
    agregado_vendas.qtd_compras, agregado_vendas.qtd_produtos_vendidos,
    agregado_vendas.valor_total, agregado_vendas.qtd_clientes
    from metas
    FULL JOIN 
    (
    SELECT venda_produtos.loja, vendas.data,
    COUNT(DISTINCT venda_produtos.id_venda) as qtd_compras,
    SUM(quantidade) as qtd_produtos_vendidos, 
    SUM(valor_efetivo) as valor_total ,
    COUNT(DISTINCT vendas.id_cliente) as qtd_clientes
    FROM venda_produtos 
    FULL JOIN vendas 
    ON venda_produtos.id_venda = vendas.id_venda 
    WHERE cancelado='N' AND cancelada='f' 
    GROUP BY venda_produtos.loja, vendas.data
    ) as agregado_vendas
    ON metas.loja = agregado_vendas.loja;`,
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
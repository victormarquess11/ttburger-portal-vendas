const fastify = require('fastify')({logger: true}) 

fastify.register(require('@fastify/postgres'), {
  connectionString:  `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
})

fastify.get('/', async (request, reply) => {
  reply.send({
      empresa: "TT-burger",
      aplicação: "Portal de Vendas",
      rotas: [ "/lojas/metas", "/lojas/somas", "/lojas/produtos" ]
      })
});

fastify.get('/lojas/metas', (req, reply) => {
  fastify.pg.query(
    'SELECT loja, meta_valor, meta_prod_clt FROM metas;',
    function onResult(err, result) {
      reply.send(err || result.rows);
    }
  )
});

fastify.get('/lojas/somas', (req, reply) => {
  fastify.pg.query(
    "SELECT venda_produtos.loja, SUM(quantidade) as soma_quantidade, SUM(valor_efetivo) as soma_valor FROM venda_produtos JOIN vendas ON venda_produtos.id_venda = vendas.id_venda WHERE cancelado='N' AND cancelada='f' GROUP BY venda_produtos.loja;",
    function onResult(err, result) {
      reply.send(err || result.rows);
    }
  )
});
fastify.get('/lojas/produtos', (req, reply) => {
  fastify.pg.query(
    "SELECT venda_produtos.loja, COUNT(DISTINCT venda_produtos.id_venda) as qtd_compras, SUM(quantidade) as Soma_Quantidade, SUM(valor_efetivo) as Soma_Valor FROM venda_produtos JOIN vendas ON venda_produtos.id_venda = vendas.id_venda WHERE cancelado='N' AND cancelada='f' GROUP BY venda_produtos.loja;",
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
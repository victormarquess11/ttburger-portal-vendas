import Fastify from 'fastify'
// import lojasRoute from './Routes/lojas'

const fastify = Fastify({
  logger: true
})

// fastify.register(lojasRoute)

// Route that returns all the store location names 
fastify.get('/lojas', function (request, reply) {
  reply.send(
    {
      "lojas": [
        {
          "name": "Arpoador",
          "targetSales": "7889,897933",
          "targetPercentCompleted": "30%",
          "productsPerCustomer": "3,08",
          "averageTicketPerCustomer": "58,34"
        }
      ]
    }
  )
})

// Server
fastify.listen({ port: 5000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
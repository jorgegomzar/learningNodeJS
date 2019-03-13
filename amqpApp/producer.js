const amqp = require('amqplib/callback_api');
const log = require('./auxiliar');

// Conexion con el servidor
amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    var q = 'nombreCanal';
    var msg = process.argv.slice(2).join('  ') || 'Hello World!';

    ch.assertQueue(q, { durable: true });

    ch.sendToQueue(q, new Buffer(msg), { presistent: true });
    log('Sent: ' + msg);
  });

  setTimeout(() => { conn.close(); process.exit(0) }, 500);
});

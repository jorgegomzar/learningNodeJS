const amqp = require('amqplib/callback_api');
const log = require('./auxiliar');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    var q = 'nombreCanal';

    ch.prefetch(1);
    ch.consume(q, (msg) => {
      log("Received: " + msg.content.toString());
      ch.ack(msg);
    }, {noAck: false});
  });
});

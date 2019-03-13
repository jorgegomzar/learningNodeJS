const mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', () => {
  client.subscribe('presence', (err) => {
    if (err) { console.log(err); } else {
      console.log('Conexión realizada');
      client.publish('presence', 'Hello mqtt');
      console.log('Mensaje enviado');
      client.end();
    }
  });
});

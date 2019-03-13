const mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', () => {
  client.subscribe('presence', err => {
    if (err) { console.log(err); } else {
      console.log('Conexión realizada');
    }
  });
});

client.on('message', (topic, message) => {
  console.log(message.toString());
  client.end();
});

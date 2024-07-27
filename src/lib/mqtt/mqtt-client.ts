import mqtt from 'mqtt';

const connectUrl = 'wss://broker.emqx.io:8084/mqtt';

const clientId = 'mqttjs_' + Math.random().toString(16).substring(2, 8);
// https://github.com/mqttjs/MQTT.js#qos
const qos = 0;
const options = {
  keepalive: 60,
  clientId: clientId,
  clean: true,
  connectTimeout: 30 * 1000,

  username: 'mqttT',
  password: 'mqttT',
  reconnectPeriod: 1000,
};

console.log('connecting mqtt client');
export const client = mqtt.connect(connectUrl, options);

client.on('connect', () => {
  console.log('Client connected: ' + clientId);
});

client.on('error', (err) => {
  console.log('Connection error: ', err);
  client.end();
});

export const publishData = (topic: string, payload: any) => {
  // Check if client is connected before publishing
  if (client.connected) {
    client.publish(topic, payload, { qos }, (error) => {
      if (error) {
        console.error('Publish error: ', error);
      } else {
        console.log('Message published to topic:', topic);
      }
    });
  } else {
    console.log('Client not connected, cannot publish');
  }
};

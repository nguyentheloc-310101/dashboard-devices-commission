# MQTT WebSocket Example

This example demonstrates how to connect to an MQTT broker using WebSockets with `MQTT.js`.

## Code Example

```javascript
const connectUrl = 'wss://broker.emqx.io:8084/mqtt';

const clientId = 'mqttjs_' + Math.random().toString(16).substring(2, 8);
const payload = 'WebSocket mqtt test';
// https://github.com/mqttjs/MQTT.js#qos
const qos = 0;
const options = {
  keepalive: 60,
  clientId: clientId,
  clean: true,
  connectTimeout: 30 * 1000,
  /**
   * By default, EMQX allows clients to connect without authentication.
   * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
   */
  username: 'mqttT',
  password: 'mqttT',
  reconnectPeriod: 1000,
  // for more options and details, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
};
const topic = 'vite-topic';
console.log('connecting mqtt client');
const client = mqtt.connect(connectUrl, options);

// https://github.com/mqttjs/MQTT.js#event-error
client.on('error', (err) => {
  console.log('Connection error: ', err);
  client.end();
});

// https://github.com/mqttjs/MQTT.js#event-reconnect
client.on('reconnect', () => {
  console.log('Reconnecting...');
});
// https://github.com/mqttjs/MQTT.js#event-connect
client.on('connect', () => {
  console.log('Client connected:' + clientId);

  // subscribe topic
  // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
  client.subscribe(topic, { qos }, (error) => {
    if (error) {
      console.log('Subscribe error:', error);
      return;
    }
    console.log(`Subscribe to topic ${topic}`);
  });

  // publish message
  // https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
  client.publish(topic, payload, { qos }, (error) => {
    if (error) {
      console.error(error);
    }
  });
});

// https://github.com/mqttjs/MQTT.js#event-message
client.on('message', (topic, payload) => {
  console.log('Received Message: ' + payload);
});
//npm i @types/json-bigint
```

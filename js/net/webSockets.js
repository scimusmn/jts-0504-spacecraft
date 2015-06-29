define([], function() {
  function wsClient() { }

  var ws = null;

  wsClient.connectInterval;

  var addr = 'ws://localhost:8080/';

  var customCB = null;

  wsClient.connect = function(connectCB) {
    if ('WebSocket' in window) {
      // Default testing server is ws://echo.websocket.org
      ws = new WebSocket(addr);

      ws.onopen = function() {
        // Web Socket is connected, send data using send()
        clearInterval(wsClient.connectInterval);
        if (customCB) ws.onmessage = customCB;
        else ws.onmessage = function(evt) {
        };

        if (connectCB) connectCB(), 'connected';
      };

      ws.onerror = function(error) {
        if ('WebSocket' in window) wsClient.connectInterval = setInterval(this.connect, 2000);
      };

      ws.onclose = function() {
        // Websocket is closed.
        wsClient.connectInterval = setInterval(self.connect.bind(self), 2000);
      };
    } else {
      clearInterval(wsClient.connectInterval);
      console.log('Websocket not supported');
    }
  };

  wsClient.setMsgCallback = function(cb) {
    customCB = cb;
    if (ws) ws.onmessage = cb;
  };

  wsClient.send = function(msg) {
    if (ws) ws.send(msg);
  };

  return wsClient;
});

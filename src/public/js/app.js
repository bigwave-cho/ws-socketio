//https://developer.mozilla.org/ko/docs/Web/API/WebSocket

// app의 socket은 서버로의 연결을, server의 socket은 어떤 브라우저가 연결되었나(클라)
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('connected to Server!');
});

socket.addEventListener('message', (message) => {
  console.log('Just got this: ', message.data, 'from server');
});

socket.addEventListener('close', () => {
  1;
  console.log('disconnected from the server');
});

setTimeout(() => {
  socket.send('hello from the browswer!');
}, 10000);

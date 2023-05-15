const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');

//https://developer.mozilla.org/ko/docs/Web/API/WebSocket

// app의 socket은 서버로의 연결을, server의 socket은 어떤 브라우저가 연결되었나(클라)
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('connected to Server!');
});

socket.addEventListener('message', (message) => {
  console.log('Just got this: ', message.data.toString(), 'from server');
});

socket.addEventListener('close', () => {
  1;
  console.log('disconnected from the server');
});

function handleSubmit(event) {
  event.preventDefault();

  const input = messageForm.querySelector('input');
  socket.send(input.value);
  input.value = '';
}

messageForm.addEventListener('submit', handleSubmit);

const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
}

function hadleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  // emit('이벤트명', {}, 서버에서 호출할 function)
  // 원래는 json으로 stringify해서 보냈다면
  // socket.io는 오브젝트도 보낼 수 있음.
  socket.emit('enter_room', input.value, showRoom);
  roomName = input.value;
  input.value = '';
}

form.addEventListener('submit', hadleRoomSubmit);

socket.on('welcome', () => {
  addMessage('Someone joined!');
});

/*
const messageList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');

//https://developer.mozilla.org/ko/docs/Web/API/WebSocket

// app의 socket은 서버로의 연결을, server의 socket은 어떤 브라우저가 연결되었나(클라)
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener('open', () => {
  console.log('connected to Server!');
});

socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener('close', () => {
  1;
  console.log('disconnected from the server');
});

function handleSubmit(event) {
  event.preventDefault();

  const input = messageForm.querySelector('input');
  socket.send(makeMessage('new_message', input.value));

  const li = document.createElement('li');
  li.innerText = `You: ${input.value}`;
  messageList.append(li);

  input.value = '';
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
}

messageForm.addEventListener('submit', handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
*/

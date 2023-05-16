const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;

let roomName, nickName;

function addMessage(message) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#msg input');
  const value = input.value;
  // socket이 비동기적으로 작동하기 떄문에
  // input.value를 그대로 써버리면
  // server로 전송 값은 가지만
  // 콜백함수는 빈값을 받게 됨.

  socket.emit('new_message', input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = '';
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
  span = room.querySelector('span');
  span.innerText = `My nickname is ${nickName}`;

  const msgForm = room.querySelector('#msg');

  msgForm.addEventListener('submit', handleMessageSubmit);
}

function hadleRoomSubmit(event) {
  event.preventDefault();
  console.log(form);
  console.log(form.querySelector('#roomName'));
  const roomInput = form.querySelector('#roomName');

  const nickInput = form.querySelector('#nickName');
  roomName = roomInput.value;
  nickName = nickInput.value;

  socket.emit('enter_room', roomName, nickName, showRoom);
}

form.addEventListener('submit', hadleRoomSubmit);

socket.on('welcome', (user) => {
  addMessage(`${user} arrived!`);
});

socket.on('bye', (left) => {
  addMessage(`${left} left`);
});

socket.on('new_message', (msg) => {
  addMessage(msg);
});

socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  roomList.innerHTML = '';

  if (rooms.length === 0) {
    return;
  }

  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.innerText = room;
    roomList.append(li);
  });
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

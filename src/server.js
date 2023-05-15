import express, { application } from 'express';
import path from 'path';
import http from 'http';
import { WebSocketServer } from 'ws';
const __dirname = path.resolve();

// express 인스턴스 생성
const app = express();

console.log(3000);

app.set('view engine', 'pug'); // view engine은 pug
app.set('views', __dirname + '/src/views'); // views dir 경로
app.use('/public', express.static(__dirname + '/src/public'));
// /public 파일 : 프론트엔드에서 구동되는 코드
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/')); // 어떤 경로든 '/'으로 리다이렉

const handleListen = () => console.log('Listening on http://localhost:3000');

const server = http.createServer(app); //http server

const wss = new WebSocketServer({
  server,
  // WS에 http server 넣으면 http, ws서버를 둘 다 실행 가능
  // http 에 접속해도 ws가 실행됨
  // ws://naver~~:3000  http://naver~~:3000
});

//this: WebSocket.Server<WebSocket.WebSocket>, socket: WebSocket.WebSocket, request: http.IncomingMessage
// socket을 이용해 메시지를 주고 받기 가능. socket을 저장해두고 써야 함.
// 연결된 소켓들 배열
const sockets = [];

wss.on('connection', (socket) => {
  //연결될 때마다 소켓추가
  sockets.push(socket);

  console.log('Connected to Browser!');

  socket.on('close', () => {
    console.log('discnnected from the Browswer!');
  });

  socket.on('message', (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString('utf8')));
  });
});

server.listen(3000, handleListen);

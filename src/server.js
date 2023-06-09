import express, { application } from 'express';
import path from 'path';
import http from 'http';
import { WebSocketServer } from 'ws';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

const __dirname = path.resolve();

// express 인스턴스 생성
const app = express();

app.set('view engine', 'pug'); // view engine은 pug
app.set('views', __dirname + '/src/views'); // views dir 경로
app.use('/public', express.static(__dirname + '/src/public'));
// /public 파일 : 프론트엔드에서 구동되는 코드
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/')); // 어떤 경로든 '/'으로 리다이렉

const handleListen = () => console.log('Listening on http://localhost:3000');

const httpServer = http.createServer(app); //http server
const wsServer = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  },
});
//https://admin.socket.io/ 여기 접속해보면 socket 어드민

instrument(wsServer, {
  auth: false,
});

// public room만 골라내기
function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  const publicRooms = [];

  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on('connection', (socket) => {
  // wsServer.socketsJoin('announcements')
  socket['nickname'] = 'Anon';

  socket.onAny((event) => {
    //지금 확인되는 어댑터는 메모리(서버 꺼지면 휘발)
    //in memory adapter는 서버간 커넥션 불가
    console.log(wsServer.sockets.adapter);
    console.log(`Socket Event :${event}`); //"enter_room"
  });

  //함수는 마지막 인자로
  socket.on('enter_room', (roomName, nickname, done) => {
    socket.join(roomName);
    socket['nickname'] = nickname;
    done();

    //socket.io/docs/v4/server-api/#sockettoroom
    //하나의 소켓(roomName)
    // 방 접속 -> 해당 방 모두에게 Welcome 이벤트 emit
    socket.to(roomName).emit('welcome', socket.nickname, countRoom(roomName));

    // 모든 소켓에 이벤트
    wsServer.sockets.emit('room_change', publicRooms());
  });

  //disconnecting: 방을 떠나기 직전에 실행
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit('bye', socket.nickname, countRoom(room) - 1)
    );
    wsServer.sockets.emit('room_change', publicRooms());
  });

  socket.on('disconnect', () => {
    wsServer.sockets.emit('room_change', publicRooms());
  });

  socket.on('new_message', (msg, roomName, done) => {
    socket.to(roomName).emit('new_message', `${socket.nickname}: ${msg}`);
    done();
  });

  // socket.on('nickname', (nickname) => {
  //   socket['nickname'] = nickname;
  // });

  // console.log(socket);
  /*
  ws는 소켓을 배열에 push해서 관리해야 했다면
  socket.io는 아래처럼 알아서 관리함.
  client: Client {
    sockets: Map(1) { '0Lf6pkfDpovNUz6-AAAB'
    */
});

/* Socket.io와 비교를 위해 주석처리
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
  // 닉 안정한 사람 기본 anon
  socket['nickname'] = 'Anon';
  console.log('Connected to Browser!');

  socket.on('close', () => {
    console.log('discnnected from the Browswer!');
  });

  // WebScoket의 문제
  //현 상태 나를 포함한 모든 socket에 메시지 전송중

  // 단지 프로토콜일 뿐이라 개발자가 모든 기능을
  // 직접 구현하고 message의 타입을 구분해줘야하는 등..
  // socket.io 프레임워크 쓰면 간단히 해결됨.

  socket.on('message', (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case 'new_message':
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}:${message.payload}`)
        );
        break;
      case 'nickname':
        socket['nickname'] = message.payload;
        //socket은 객체라 위처럼 프로퍼티 추가 가능
        break;
    }
  });
});
*/

httpServer.listen(3000, handleListen);

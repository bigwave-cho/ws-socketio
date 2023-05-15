import express, { application } from 'express';
import path from 'path';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
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

server.listen(3000, handleListen);

// express는 http이므로 ws를 지원하지 않는다. 따라서 function을 추가해야 함.

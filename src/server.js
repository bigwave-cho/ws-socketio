import express, { application } from 'express';

// express 인스턴스 생성
const app = express();

console.log(3000);

// express 어플을 시작해서 3000번 포트에서 수신대기 설정
// 포트 3000을 통해 다른 클라이언트를 통해 이 서버에 접속 가능
app.listen(3000);

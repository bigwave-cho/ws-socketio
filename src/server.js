import express, { application } from 'express';
import path from 'path';
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
app.listen(3000, handleListen);

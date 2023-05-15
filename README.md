# ZOOM

WebRTC, Websockets

- nodemon : 개발 중 어플의 파일 변경을 감지하여 자동 재시작해줌
  {
  "ignore": ["src/public/*"],
  "exec": "npx @babel/node src/server.js"
  }
  src의 server.js에 babel_node 명령문을 실행

- package.json
  "scripts": {
  "dev": "nodemon"
  },
  dev 실행하면 nodemon이 실행되고 nodemon은 nodemon.json에 있는 명령문을 실행

- babel.config
  {
  "presets": ["@babel/preset-env"]
  // 자동으로 현재 환경에 가장 적합한 바벨 플러그인 선택하여
  // 최신 JS 코드를 지원하지않는 브라우저에서도 실행가능한 코드로 변환
  }

  (최신 문법의 js를 브라우저가 이해가능한 ES5로 컴파일 해줌)

npm run dev -> nodemon 실행 -> src/public경로의 모든 파일변경은 무시(재시작X)
-> @bable/node 패키지 npx(실행)하여 src/server.js 파일 작동
-> babel.confing에 따라 프리셋 적용
-> 최종적으로 변환된 'src/server.js' 파일이 노드js환경에서 실행되어 앱이 작동.
-> 이 파일은 Express.js를 사용하여 웹서버를 가동하고 클라이언트의 요청에 응답하게 됨.

## HTTP / WebSocket

- ex: https://www.naver.com
  HTTP는 statless한 상태(1회성 user-backend간 지속 연결 X)
  로그인의 경우 서버는 유저를 기억하지 않기 때문에 cookie등에 신원확인을 담아 서버에 알려줘야함.
  브라우저의 req가 있어야 서버의 res가 가능

- ex: ws://naver.com
  브라우저와 서버가 양방향 연결( connected)됨.
  서버가 브라우저의 req없이 res가 가능

- WS 라이브러리
  https://www.npmjs.com/package/ws
  JS를 위한 WS 라이브러리로 WS 프로토콜의 설명에 있는 기본적 기능만 가지고 있음.

  추후 채팅방 기능 등을 구현해놓은 라이브러리도 사용해볼 것.
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

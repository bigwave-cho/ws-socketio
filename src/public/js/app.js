//https://developer.mozilla.org/ko/docs/Web/API/WebSocket

// app의 socket은 서버로의 연결을, server의 socket은 어떤 브라우저가 연결되었나(클라)
const socket = new WebSocket(`ws://${window.location.host}`);

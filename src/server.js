const server = require('http').createServer();
const os = require('os-utils');
const io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});

let tick = 0;
// 1. 소켓 커넥션
io.on('connection', client => {
  setInterval(() => {
    // 2. cpu 이벤트를 보냄
    os.cpuUsage(cpuPercent => {
      client.emit('cpu', {
        name: tick++,
        value: cpuPercent
      });
    });
  }, 100); // 1초는 문제 없는데... 0.1초는 풀링이 상당합니다...
  // hook도 state로 들어오기 때문에
  // 언어변경을 state에서 변화를 주게 되면 stage에 쌓여서 느리게 반영되는게 아닐까 싶기도 합니다.
  // 언어 변환 시 완전히 /en /kr로 Route를 변경하여 처음부터 시작하게 만드는것도 좋을것 같습니다.
});

server.listen(3000);

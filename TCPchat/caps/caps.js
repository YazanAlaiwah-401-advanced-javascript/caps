const net = require('net');
const uuidv4 = require('uuid').v4;
const PORT = process.env.PORT || 3000;
const server = net.createServer();

server.listen(PORT, () => console.log(`Hearing from ${PORT} port`));
const socketPool = {};
server.on('connection', (socket) => {
  const id = `socket-${uuidv4()}`;
  socketPool[id] = socket;
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('error', (e) => console.log(`Socket error ${e.message}`));
  socket.on('end', (e) => delete socketPool[id]);
});
function dispatchEvent(buffer) {
  const message = JSON.parse(buffer.toString().trim());
  message.id = uuidv4();
  pickup('pickup', message);
}

function pickup(event, payload) {
  let time = new Date();
  console.log({ Event: { event, time, payload } });
  payload.event = event;
  broadcast(payload);
  setTimeout(() => all('transit', payload), 1000);
}
function all(event, payload) {
  let time = new Date();
  console.log({ Event: { event, time, payload } });
  payload.event = event;
  broadcast(payload);
  if (event !== 'delivered') {
    setTimeout(() => all('delivered', payload), 3000);
  }
}
function broadcast(paylod) {
  const payload = JSON.stringify(paylod);
  for (let socket in socketPool) {
    socketPool[socket].write(payload);
  }
}
server.on('error', (e) => console.log('SERVER ERROR', e.message));

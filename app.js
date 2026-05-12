const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from CI/CD Pipeline! Version: ' + (process.env.APP_VERSION || '1.0') + '\n');
});

server.listen(port, () => {
  console.log('Server running on port ' + port);
});

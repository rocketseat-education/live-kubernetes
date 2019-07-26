const server = require('./server');

server.listen(3333 || process.env.PORT);

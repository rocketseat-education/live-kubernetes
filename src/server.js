const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const expectionHandler = require('./middlewares/ExceptionHandler');

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.handlers();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use(routes);
  }

  handlers() {
    this.express.use(expectionHandler);
  }
}

module.exports = new App().express;

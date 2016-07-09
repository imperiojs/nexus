"use strict"; // eslint-disable-line
/* eslint-disable no-console */
const express = require('express');
const app = express();
const server = require('http').Server(app); // eslint-disable-line
const port = process.env.PORT || 3000;
const path = require('path');
// const imperio = require('imperio')(server);
const imperio = require('./../../imperioDev/index.js')(server);

app.use(express.static(path.join(`${__dirname}/../client`)));
app.use(express.static(path.join(`${__dirname}/../../imperioDev`)));
app.set('view engine', 'ejs');

/* ----------------------------------
 * --------      Routes      --------
 * ---------------------------------- */

// Work around for node making get requests for favicon.io
app.get('/favicon.ico', (req, res) => {
  console.log('favicon workaround handled!');
  res.send();
});
// App will serve up different pages for client & desktop
app.get('/', imperio.init(),
  (req, res) => {
    // prepare data for browser pages
    const data = {
      agentMsg: '',
      paramNonce: req.params.nonce,
      nonce: req.imperio.nonce,
      connectRequests: imperio.activeConnectRequests,
    };

    console.log('loading ROOT page');
    if (req.imperio.isDesktop) {
      data.agentMsg = 'This is a desktop';
      res.render('./../client/index.ejs', data);
    } else if (req.imperio.isMobile) {
      data.agentMsg = 'This is a mobile';
      res.render('./../client/mobile.ejs', data);
    }
  }
);
// handle nonce in URL
app.get('/:nonce', imperio.init(),
  (req, res) => {
    console.log('loading NONCE page');
    if (req.imperio.isDesktop) {
      data.agentMsg = 'This is a desktop with NONCE';
      res.render('./../client/index.ejs', data);
    } else if (req.imperio.isMobile) {
      data.agentMsg = 'This is a mobile with NONCE';
      res.render('./../client/mobile.ejs', data);
    }
  }
);
// 404 error on invalid endpoint
app.get('*', (req, res) => {
  res.status(404)
     .render('./../client/404.ejs');
});

/* ----------------------------------
 * --------      Server      --------
 * ---------------------------------- */

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

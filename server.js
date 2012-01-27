var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , path = require('path')
  , listeners = 0

app.listen(3000);

function handler (req, res) {
  console.log('request starting...');
     
  var filePath = '.' + req.url;
  if (filePath == './')
      filePath = './index.html';
       
  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }
   
  path.exists(filePath, function(exists) {
    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          res.writeHead(500);
          res.end();
        }
        else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    }
    else {
      res.writeHead(404);
      res.end();
    }
  });
}

io.sockets.on('connection', function (socket) {
  console.info("connected")
  socket.emit('assigned', ++listeners);

  socket.on('disconnect', function (socket) {
    console.info("disconnected")
    --listeners;
  });

  socket
  .on('play', function (data) {
    io.sockets.emit('play', data);
  })
  .on('pause', function (data) {
    io.sockets.emit('pause', data);
  });
});

function setbit(offset, value) {
  listeners += (1 << offset)
}

function nextPlayerId () {
  current = listeners;
  listeners++;

  axb = a ^ b;

  getOffset()
}

function getOffset (a, b) {
}
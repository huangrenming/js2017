var http = require('http');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var server = http.createServer(function (request, response) {
    var url = request.url;
    if (url == '/favicon.ico') {
      return response.end('404');
    }

    if (url == '/') {
      url = '/test.html';
    }

    response.setHeader('Content-Type', mime.lookup(url) + ';charset=utf-8');

    fs.exists('.' + url, function (exists) {
      if (exists) {
        fs.readFile('.' + url, function (err, data) {
          console.error(url, err, data);
          if (err) {
            response.statusCode = 404;
            response.end();
          } else {
            response.statusCode = 200;
            response.write(data);
            response.end();
          }
        })
      } else {
        response.statusCode = 404;
        response.end();
      }
    })
  });

server.listen(8080, function () {
  console.log("127.0.0.1:8080");
  console.log(process.argv);
});

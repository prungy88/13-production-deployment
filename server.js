/* TODO: add express-request-proxy */
var express = require('express'),
  requestProxy = require('express-request-proxy'),
  //process is an object...and it has env or environment variables
  port = process.env.PORT || 3000,
  app = express();

var proxyGithub = function(request, response) {
  console.log('Routing Github request for', request.params[0]);
  //requestProxy is like an iife
  (requestProxy ({
    url: 'https://api.github.com/' + request.params[0],
    headers: {Authorization: 'token ' + process.env.GITHUB_TOKEN}
  }))(request, response);
};

//wildcard picks up on any request we make to github
app.get('/github/*', proxyGithub);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});

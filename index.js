var express = require('express');
var http = require('http');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/:id', function(request, response) {
  var strID = request.params.id;
  if (!!strID) {
    var httpQuery = {
      host: 'aigis.wikia.com',
      path: '/api.php?format=json&action=query&titles=' + strID + '&prop=revisions&rvprop=content'
    };
    fetchWiki(httpQuery,function(objResponse) {
      //response.send('hi');
      console.log(objResponse);
      response.send(objResponse);
    });
  } else {
    response.send('uhh');
  }
  
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

function fetchWiki(objRequest,callback) {
  return http.request(objRequest, function(response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function(d) {
      console.log(body);
      //var parsed = JSON.parse(body);
      callback(body);
    });
  }).end();
}


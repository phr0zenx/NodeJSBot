var express = require('express');
var http = require('http');
var app = express();
var options = {
  host: 'aigis.wikia.com',
  path: '/api.php?format=json&action=query&titles=Leeanne&prop=revisions&rvprop=content'
};


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/:id', function(request, response) {
  var strID = request.params.id;
  if (!!strID) {
    response.send('Hello World!' + strID);
  } else {
    response.send('uhh');
  }
  
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

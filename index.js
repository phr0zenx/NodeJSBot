var express = require('express');
var http = require('http');
var app = express();



app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/:id', function(request, response) {
  var strID = request.params.id;
  if (!!strID) {
    var httpquery = {
      host: 'aigis.wikia.com',
      path: '/api.php?format=json&action=query&titles=Leeanne&prop=revisions&rvprop=content'
    };
    http.request(httpquery, postHttp).end();
    //response.send('Hello World!' + strID);
  } else {
    response.send('uhh');
  }
  
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

postHttp = function(response) {
   var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
    //response.send(str);
  });
}

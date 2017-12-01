const Discord = require('discord.js');
const client = new Discord.Client();

var http = require('http');

client.on('ready', ()=> {
  console.log('ONLINE');
});

client.on('message', message => {
  if (!!message.content && message.content.substring(0, 4) === '!anna') {
    var strQuery = message.content.substring(6,message.content.length-1);
    if(!!strQuery) {
      var httpQuery = {
        host: 'aigis.wikia.com',
        path: '/api.php?format=json&action=query&titles=' + strQuery + '&prop=revisions&rvprop=content'
      };
      fetchWiki(httpQuery,function(objResponse) {
        console.log(objResponse);
        message.channel.send(objResponse);
      });
    }
  }
});


function fetchWiki(objRequest,callback) {
  return http.request(objRequest, function(response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function(d) {
      callback(body);
    });
  }).end();
}

client.login(process.env.BOT_TOKEN);


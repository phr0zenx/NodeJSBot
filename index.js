const Discord = require('discord.js');
const client = new Discord.Client();

var http = require('http');

client.on('ready', ()=> {
  console.log('ONLINE');
});

client.on('message', message => {
  var strMessage = message.content;
  console.log(strMessage);
  var procword = '!anna';
  if (!!strMessage && strMessage.substring(0, procword.length) === procword) {
    var strQuery = message.content.substring(6,message.content.length);
    console.log(strQuery);
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


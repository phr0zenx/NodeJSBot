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
        var objJson = JSON.parse(objResponse);
        
        var output = parseWikiJson(objJson.query.pages);
        if (output !== '') {
          message.channel.send(output);
        }
        
      });
    }
  }
});

function parseWikiJson(objJson) {
  var strMessage = '';
  if (!!objJson) {
    var docid = Object.keys(objJson)[0];
    if (docid === -1) {
      return strMessage;
    } else {
      var output = '';
      var tmpJson = JSON.stringify(objJson[docid].revisions[0]);
      var regPattern = /\|.*?\\n/g;
      var aryMatch = tmpJson.match(regPattern);
      if (aryMatch.length > 0) {
        output = '```' + aryMatch[0].replace("\\n","").replace("|","").replace("\u003Cbr\u003E","") + '\n' + 
          aryMatch[1].replace("\\n","").replace("|","").replace("\u003Cbr\u003E","") + '\n' + 
          aryMatch[2].replace("\\n","").replace("|","").replace("\u003Cbr\u003E","") + '\n' + 
          aryMatch[3].replace("\\n","").replace("|","").replace("\u003Cbr\u003E","") + '\n' + 
          aryMatch[4].replace("\\n","").replace("|","").replace("\u003Cbr\u003E","") + '\n' + 
          aryMatch[5].replace("\\n","").replace("|","").replace("\u003Cbr\u003E","") + '\n' + 
          aryMatch[6].replace("\\n","").replace("|","").replace("\u003Cbr\u003E","") + '\n' + 
          '```'
      }
      return output;
    }
  }
}

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


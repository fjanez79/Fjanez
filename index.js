var tmi = require('tmi.js');
var readline = require('readline');
var https = require('https');

var canais = [];
var client = null;



executar_canais();
conectar();

//setInterval(function(){

    //client.whisper("johnpittertvbot", "!bonus");
	
//}, 10 * 60 * 1000);

setInterval(function(){

    canais = [];

    client.disconnect();

    executar_canais();
    conectar();
	
}, 50 * 60 * 1000);




function executar_canais() {
    var site = https.get("https://raw.githubusercontent.com/glaydson2323/glaydson2323/main/canais.txt", function(pagina) {
    var github = readline.createInterface({
      input: pagina
    });
    github.on('line', (line) => {
      canais.push(line);
    }).on('close', () => {
      console.log(canais);
    });
  });
  }

function conectar() {
    var options = {
        options: {
            debug: true
        },
        connection: {
            cluster: "aws",
            reconnect: true
        }, 
        identity: {
            username: "hell_play_",
            password: "Ffjz@151285"
        },
        channels: canais
    };
    
    client = new tmi.client(options);
    client.connect();
    
    client.on("connected", function (address, port) {
        console.log("Conectado...");
    });
    
}


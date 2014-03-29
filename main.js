var server = require('http').createServer(handleHTTP).listen(8000), 
io = require('socket.io').listen(server), 
five = require('johnny-five'),
fs = require('fs'),
url = require('url'),
board,themocouple;

var i=0;

board = new five.Board();

board.on("ready", function() {

	thermocouple = new five.Sensor({
		pin: "A2",
		freq: 1000
	});

	board.repl.inject({
		sensor: thermocouple
	});

});

function handleHTTP(req,res) {
	var path = url.parse(req.url);
	console.log("HTTP connection");

	var get = path.href == '/' ? __dirname+"/index.html" : __dirname + path.href;
	fs.readFile(get,function(err,data) {
		if(err) { res.writeHeader(404); res.end("Error"); }
		res.writeHeader(200);
		res.end(data);
	});
}

io.sockets.on('connection',function(sock) {
	console.log("socket connection!");

	var thermData = function(data) {
		var tempOut = {
			x: new Date().getTime(),
			y:data.c
		}
		i++;
		console.log("Sending %j to client",tempOut);
		sock.emit('newData',tempOut);
	};

	thermocouple.on("data",function() {
		/* 
		convert raw voltage value to temp,
		from datasheet: voltage / 5mV = tempC 
		*/
		var raw = this.raw;
		var temp = { 
   		get v() { 
   			return (raw/1024)*5.0 
   		},
   		get c() {
   			return this.v / 0.005;
   		},
   		get f(){
   			return (this.c*1.8)+32;
   		},
   		get k(){
   			return this.c+273.15;
   		}
   	}
   	thermData(temp);
	});


});


var http = require('http');
var fs = require('fs');

var server = http.createServer(function (request, response){
	fs.readFile('client.html', 'utf-8', function (error, data){
		response.writeHead(200,{'Content-type': 'text/html'});
		response.write(data);
		response.end();
	})
});

server.listen(21000);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
//connection is an event in socket , a node event (when someone connects)
//.socket is a method, inside the socket module
//when connect, it will bring in the socket
	socket.on('message_to_server', function(data){
		io.sockets.emit('message_to_client', {
			message: data["message"]
		})
	});
})
console.log("test");
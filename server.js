var express 	= require("express"),
	app			= express(),
	http 		= require ("http"),
	server 		= http.createServer(app),
	fs 			= require ("fs"),
	bodyParser 	= require ("body-parser"),
	io 			= require ("socket.io");
	port 		= process.env.PORT || 3000;
var sockets 		= io.listen(server);


/*                                      App files load                           */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/'));
//app.use("/style", express.static(__dirname + '/style'));
//app.use("/js", express.static(__dirname + '/js'));
//app.use("/files", express.static(__dirname + '/files'));
app.get("/", function(req, res){
	res.sendFile(__dirname + ("/index.html"))
})

/*                               server listen                      */

app.set("port", process.env.PORT || 3000);

server.listen(app.get("port"), function(){
	console.log("Running server at localhost: "+port);
})

sockets.on("connection", function (socket){
	console.log("nuevo cliente conectado");

	socket.on("client-message", function (data1,data2){
		sockets.emit("server-message", data1,data2);
	})
})
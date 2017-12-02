var express 	= require("express"),
	app			= express(),
	fs 			= require ("fs"),
	bodyParser 	= require ("body-parser"),
	port 		= process.env.PORT || 3000;


/*                                      App files load                           */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/style", express.static(__dirname + '/style'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/files", express.static(__dirname + '/files'));
app.get("/", function(req, res){
	res.sendFile(__dirname + ("/index.html"))
})

/*                                      PUT                             */

app.put("/", function(req, res){
	var text = fs.readFileSync('./js/database.json','utf8');
	var json = JSON.parse(text);

	var user = req.body.user;
	var tirada = req.body.tirada;

	var newDice = {
		user: user,
		tirada: tirada
	}

	json.tiradas.push(newDice);
	fs.writeFileSync("./js/database.json", JSON.stringify(json, null, 4));
	res.json(json);
});

/*                               server listen                      */

app.listen(port, function(){
	console.log("Running server at localhost: "+port);
})
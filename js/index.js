(function () {	
	var user, historial,tirada = [];
	var socket = io();

	//bdGet();

	function randomNumber(max){
		return Math.floor(Math.random(1,max)*(max-1)+1);				//Random between 1 and max
	}

	var dado,cantidad;

	$("select").change(function (){
		dado = $("#dado").val();
	});

/* 									Mensajes del servidor 								*/


	socket.on("server-message", function (data1, data2){
		console.log(data1, data2);
		$("#result").empty();
		$("#result").append("<h4>"+data2+" ha tirado los dados: </h4>");
		for (var i =0; i<data1.length; i++) {
			$("#result").append("<div class='dado col-md-1 text-center'><p>"+data1[i]+"</p></div>");
		}
	});




	$("#tirar").click(function (){				//Al clicker envia dados y crea array
		
		cantidad = $("#cantidad").val();

		for (var i =0; i<cantidad ; i++) {
			tirada.push(randomNumber(dado))
		}

		socket.emit("client-message", tirada, user); 
		tirada = [];

	});

	$("#login > button").click(function (){				//crea user al clicker y expone el nombre
		user = $("#mySearch").val();
		$("#nombres").append("<button class='btn btn-default mg1'>"+user+"</button>");
		$("#login").addClass("hide");
		$("#diceTable").removeClass("hide");
	});

}());

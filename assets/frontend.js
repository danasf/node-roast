var myData=[{ x: new Date().getTime(), y: 0 }];
var state = 1;
var socket = io.connect('http://localhost:8000');

var incoming = document.getElementById("incomingData");

/*var toggle = document.getElementById("toggleData");

toggle.addEventListener('click',function() {
	if(state) {
		socket.emit('pause',{msg:'pause'});
		toggle.innerHTML='Resume';
		state=0;
	} else {
		socket.emit('resume',{msg:'resume'});
		toggle.innerHTML='Pause';
		state=1;
	}
},false);*/

// graph
var graph = new Rickshaw.Graph( {
	element: document.querySelector("#chart"),
	width: 900,
	height: 400,
	series: [{ 
	  color: 'steelblue',
      data: myData
	}],
	onData: function(d) {
		console.log("new data!");
	}
	});

graph.render();

var xAxis = new Rickshaw.Graph.Axis.Time({
    graph: graph
});

var yAxis = new Rickshaw.Graph.Axis.Y({
    graph: graph
});

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: graph,
    yFormatter: function(y) {
    	var c = Math.round(y,2);
    	var f = Math.round((c*1.8)+32,2);
     	return c +"C ("+f+"F)" }
} );


yAxis.render();
xAxis.render();



socket.on('newData', function (data) {
    //console.log(data);
    myData.push(data);
    graph.update();
    //yAxis.update();
    //xAxis.update();

  });
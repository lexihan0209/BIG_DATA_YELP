var colorscale = d3.scale.quantize().domain([0,5000]).range(colorbrewer['RdYlGn'][6]);
var name_id_map;
var id_name_map;
function drawMap(file){
	d3.csv("data/state_rating_counts_0.0.csv",function(error,data){
		var object = {};
		data.forEach(function(d){
			object[d.State] = d.Count;
		})
		drawStates(object);
    })
}
function drawStates(data){
	var SCALE = 0.7;
	var path = d3.geo.path();
	var svg = d3.select("#map").append("svg")
      .attr("width", '100%')
      .attr("height", '100%');
    
    d3.tsv("https://s3-us-west-2.amazonaws.com/vida-public/geo/us-state-names.tsv", function(error, names) {
    	name_id_map = {};
		id_name_map = {};
		  
		for (var i = 0; i < names.length; i++) {
		    name_id_map[names[i].name] = names[i].id;
		    id_name_map[names[i].id] = names[i].code;
		}
	  d3.json("https://s3-us-west-2.amazonaws.com/vida-public/geo/us.json", function(error, us) {
	    svg.append("g")
	        .attr("class", "states-choropleth")
	        .attr("id","states")
	      	.selectAll("path")
	        .data(topojson.feature(us, us.objects.states).features)
	      	.enter().append("path")
	        .attr("transform", "scale(" + SCALE + ")")
	        .style("fill", function(d) {
	          if(data[id_name_map[d.id]] != undefined && data[id_name_map[d.id]] != null){
	        		return colorscale(data[id_name_map[d.id]]);
	        	}else{
	        		return colorscale(0);
	        	}
	        })
	        .attr("d", path)
	        .on("mousemove", function(d) {
	        	//console.log(d.id);
	        	if(data[id_name_map[d.id]] != undefined && data[id_name_map[d.id]] != null){
	        		return data[id_name_map[d.id]];
	        	}else{
	        		return 0;
	        	}
            	
        	})

	      svg.append("path")
	        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
	        .attr("class", "states")
	        .attr("transform", "scale(" + SCALE + ")")
	        .attr("d", path)
	        .style("fill","none")
	        .style("stroke","white")

	      
	    	})
    		
	});

}
function changeSelection(){
	var file = document.getElementById("map_star").value;
	d3.csv(file,function(error,data){
		var object = {};
		data.forEach(function(d){
			object[d.State] = d.Count;
		})
		if(d3.select("#map").select("svg")[0][0] != undefined){
			d3.select("#map").select("#states").selectAll("path").transition().duration(500)
			.style("fill",function(d){
				if(object[id_name_map[d.id]] != undefined && object[id_name_map[d.id]] != null){
	        		return colorscale(object[id_name_map[d.id]]);
	        	}else{
	        		return colorscale(0);
	        	}
			})
		}
		//drawStates(object);
    })
}
function getBoundingBoxCenter(selection) {
    // get the DOM element from a D3 selection
    // you could also use "this" inside .each()
    var element = selection.node(),
        // use the native SVG interface to get the bounding box
        bbox = element.getBBox();
    // return the center of the bounding box
    return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
}

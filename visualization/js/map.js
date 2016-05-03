var colorscale = d3.scale.quantize().domain([0,1000]).range(colorbrewer['RdYlGn'][12]);
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
      .attr("height", '100%')
      .attr("id","map_svg");

    var colorbar = svg.append("g")
    .attr("transform","translate(" + 400 + ",0)");

    colorbar
    .selectAll("rect")
    .data(colorbrewer['YlGnBu'][9].slice(2,9))
    .enter()
    .append("rect")
    .attr("x",function(d,i){return 40 * i})
    .attr("y",0)
    .attr("width",40)
    .attr("height",10)
    .style("fill",function(d){return d;})

    colorbar.selectAll("text")
    .data([0,1,10,100,500,1000,10000])
    .enter()
    .append("text")
    .attr("x",function(d,i){return 40 * i})
    .attr("y",20)
    .style("fill","black")
    .text(function(d){return d})

    
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
	        		return colorMapping(data[id_name_map[d.id]]);
	        	}else{
	        		return colorMapping(0);
	        	}
	        })
	        .attr("d", path)
	        .on("mousemove", function(d) {
	        	var html = "";
  
	            html += "<div class=\"tooltip_kv\">";
	            html += "<span class=\"tooltip_key\">";
	            html += id_name_map[d.id];
	            html += "</span>";
	            html += "<span class=\"tooltip_value\">";
	            html += (data[id_name_map[d.id]] ? data[id_name_map[d.id]] : "0");
	            html += "";
	            html += "</span>";
	            html += "</div>";
	            
	            $("#tooltip-container").html(html);
	            $(this).attr("fill-opacity", "0.8");
	            $("#tooltip-container").show();
	            
	            var coordinates = d3.mouse(this);
	            
	            var map_width = $('.states-choropleth')[0].getBoundingClientRect().width;
	            
	            if (d3.event.layerX < map_width / 2) {
	              d3.select("#tooltip-container")
	                .style("top", (d3.event.layerY + 15) + "px")
	                .style("left", (d3.event.layerX + 15) + "px");
	            } else {
	              var tooltip_width = $("#tooltip-container").width();
	              d3.select("#tooltip-container")
	                .style("top", (d3.event.layerY + 15) + "px")
	                .style("left", (d3.event.layerX - tooltip_width - 30) + "px");
	            }
		        	//console.log(d.id);
	        	/*if(data[id_name_map[d.id]] != undefined && data[id_name_map[d.id]] != null){
	        		return data[id_name_map[d.id]];
	        	}else{
	        		return 0;
	        	}*/
            	
        	})
        	.on("mouseout", function() {
                $(this).attr("fill-opacity", "1.0");
                $("#tooltip-container").hide();
            });

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
		console.log(object);
		if(d3.select("#map").select("svg")[0][0] != undefined){
			d3.select("#map").select("#states").selectAll("path")
			.on("mousemove", function(d) {
	        	var html = "";
  
	            html += "<div class=\"tooltip_kv\">";
	            html += "<span class=\"tooltip_key\">";
	            html += id_name_map[d.id];
	            html += "</span>";
	            html += "<span class=\"tooltip_value\">";
	            html += (object[id_name_map[d.id]] ? object[id_name_map[d.id]] : "0");
	            html += "";
	            html += "</span>";
	            html += "</div>";
	            
	            $("#tooltip-container").html(html);
	            $(this).attr("fill-opacity", "0.8");
	            $("#tooltip-container").show();
	            
	            var coordinates = d3.mouse(this);
	            
	            var map_width = $('.states-choropleth')[0].getBoundingClientRect().width;
	            
	            if (d3.event.layerX < map_width / 2) {
	              d3.select("#tooltip-container")
	                .style("top", (d3.event.layerY + 15) + "px")
	                .style("left", (d3.event.layerX + 15) + "px");
	            } else {
	              var tooltip_width = $("#tooltip-container").width();
	              d3.select("#tooltip-container")
	                .style("top", (d3.event.layerY + 15) + "px")
	                .style("left", (d3.event.layerX - tooltip_width - 30) + "px");
	            }
		        	//console.log(d.id);
	        	/*if(data[id_name_map[d.id]] != undefined && data[id_name_map[d.id]] != null){
	        		return data[id_name_map[d.id]];
	        	}else{
	        		return 0;
	        	}*/
            	
        	})
        	.on("mouseout", function() {
                $(this).attr("fill-opacity", "1.0");
                $("#tooltip-container").hide();
            })
			.transition().duration(200)
			.style("fill",function(d){
				if(object[id_name_map[d.id]] != undefined && object[id_name_map[d.id]] != null){
	        		return colorMapping(object[id_name_map[d.id]]);
	        	}else{
	        		return colorMapping(0);
	        	}
			})
			//.attr("d", path)
	        
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

function colorMapping(count){
	count = parseFloat(count);
	var colorarray = colorbrewer['YlGnBu'][9];
	if(count >= 0 && count <= 1){
		return colorarray[2];
	}
	if(count > 1 && count <= 10){
		return colorarray[3];
	}
	if(count > 10 && count <= 100){
		return colorarray[4];
	}
	if(count > 100 && count <= 500){
		return colorarray[5];
	}
	if(count > 500 && count <= 1000){
		return colorarray[6];
	}
	if(count > 1000 && count <= 10000){
		return colorarray[7];
	}
	if(count > 10000){
		return colorarray[8];
	}
}

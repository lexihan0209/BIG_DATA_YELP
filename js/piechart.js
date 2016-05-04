function drawPieChart(){
	var svg = d3.select("#piechart").append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr("id","pie_svg");

    var width = 348;
    var height = 350;
    var radius = Math.min(width,height) / 2 - 20;//radius of pie chart
    console.log(radius);
    console.log(width);
    var arc = d3.svg.arc()
    			.outerRadius(radius - 10)
    			.innerRadius(0);

    var labelArc = d3.svg.arc()
    				.outerRadius(radius - 40)
    				.innerRadius(radius - 40);

    var pie = d3.layout.pie()
    			.sort(null)
    			.value(function(d){return parseFloat(d['Count'])});

    var g = svg.append("g").attr("transform","translate("+ (width / 2) + "," + (height / 2) + ")");
    d3.csv("data/star_rating_counts.csv",function(error,data){
    	var arcs = g.selectAll(".arc")
    	.data(pie(data))
    	.enter().append("g")
    	.attr("class","arc");

    	arcs.append("path")
    	.attr("d",arc)
    	.style("fill",function(d,i){return colorbrewer['Paired'][5][i];});

    	arcs.append("text")
    	.attr("transform",function(d,i){return "translate(" + labelArc.centroid(d) + ")";})
    	.text(function(d,i){console.log(d); return d.data.Star + " Star Review:" + d.data.Count;})
    	.style("fill","black")
    })

}
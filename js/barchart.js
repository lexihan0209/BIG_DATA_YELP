function drawLineChart(id){
	var svg = d3.select(id)
				.append("svg")
				.attr("width","100%")
				.attr("height","100%");

	var margin = {top:20, left:50, right:50, bottom: 50};
	var width = 600 - margin.left - margin.right;
	var height = 350 - margin.top - margin.bottom;
	var years = ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015'];
	var xScale = d3.scale.linear().domain([0,11]).range([0,width]);
	var yScale = d3.scale.linear().range([height,0]).domain([0,662204]);
	var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
				.tickFormat(function(d,i){return years[i]});

	var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient("left")
				.ticks(10);
	var g = svg.append("g")
		.attr("id","axis")
		.attr("transform","translate(" + margin.left + "," + margin.top + ")")
	g.append("g")
		.attr("class","x axis")
		.attr("transform","translate(" + 0 + "," + height + ")")
		.call(xAxis);
	g.append("g").attr("class","y axis").call(yAxis);

	var review_line = d3.svg.line()
				    .interpolate("linear")
				    .x(function(d) { return xScale(years.indexOf(d.year)); })
				    .y(function(d) { return yScale(parseFloat(d.count)); });

	d3.csv("data/star_rating_count_year_1.csv",function(error,data){

		createLineAndCircle(g,data,colorbrewer['Paired'][12][0]);
	})
	d3.csv("data/star_rating_count_year_2.csv",function(error,data){
		
		createLineAndCircle(g,data,colorbrewer['Paired'][12][3]);
	})
	d3.csv("data/star_rating_count_year_3.csv",function(error,data){
		
		createLineAndCircle(g,data,colorbrewer['Paired'][12][5]);
	})
	d3.csv("data/star_rating_count_year_4.csv",function(error,data){
		
		createLineAndCircle(g,data,colorbrewer['Paired'][12][7]);
	})
	d3.csv("data/star_rating_count_year_5.csv",function(error,data){
		
		createLineAndCircle(g,data,colorbrewer['Paired'][12][9]);
	})
	d3.csv("data/star_rating_count_year_all.csv",function(error,data){
		
		createLineAndCircle(g,data,colorbrewer['Paired'][12][11]);
	})

	var colorbar = g.append("g").attr("transform","translate("+ (width + 20) + ", 30)");
	colorbar.selectAll("rect").data(['1 star','2 star','3 star','4 star','5 star','All']).enter().append("rect")
	.attr("width",50).attr("height",3).attr("x",0).attr("y",function(d,i){return 20 * i}).style("fill",function(d,i){
		if(i == 0){return colorbrewer['Paired'][12][0]}
		if(i == 1){return colorbrewer['Paired'][12][3]}
		if(i == 2){return colorbrewer['Paired'][12][5]}
		if(i == 3){return colorbrewer['Paired'][12][7]}
		if(i == 4){return colorbrewer['Paired'][12][9]}
		if(i == 5){return colorbrewer['Paired'][12][11]}
	})
	colorbar.selectAll("text").data(['1 star reviews','2 star reviews','3 star reviews','4 star reviews','5 star reviews','All']).enter().append("text")
	.attr("x",55).attr("y",function(d,i){return 22 * i}).style("fill",function(d,i){
		if(i == 0){return colorbrewer['Paired'][12][0]}
		if(i == 1){return colorbrewer['Paired'][12][3]}
		if(i == 2){return colorbrewer['Paired'][12][5]}
		if(i == 3){return colorbrewer['Paired'][12][7]}
		if(i == 4){return colorbrewer['Paired'][12][9]}
		if(i == 5){return colorbrewer['Paired'][12][11]}
	})
	.text(function(d){return d;})
	

}

function createLineAndCircle(g,data,color){
		//var tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.count; });
		var margin = {top:20, left:50, right:50, bottom: 50};
		var width = 600 - margin.left - margin.right;
		var height = 350 - margin.top - margin.bottom;
		var years = ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015'];
		var xScale = d3.scale.linear().domain([0,11]).range([0,width]);
		var yScale = d3.scale.linear().range([height,0]).domain([0,662204]);
		var review_line = d3.svg.line()
				    .interpolate("linear")
				    .x(function(d) { return xScale(years.indexOf(d.year)); })
				    .y(function(d) { return yScale(d.count); });

		var line = g.append("g").append("path")
					.attr("d",review_line(data)).style("stroke",color).attr("fill", "none");

		var circle = g.append("g").selectAll("circle").data(data).enter().append("circle")
					.attr("cx",function(d){ return xScale(years.indexOf(d.year));})
					.attr("cy",function(d) { return yScale(parseFloat(d.count)); })
					.attr("r",3)
					.style("fill",color)
					.on("mouseover",function(d,i){
						d3.select(this).append("title").text("Count:" + d.count).style("font-size",16)
					})
					.on("mouseout",function(d,i){
						d3.select(this).append("title").remove();
					})


}
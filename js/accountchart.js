function drawAccountChart(id){
	var svg = d3.select(id)
				.append("svg")
				.attr("width","100%")
				.attr("height","100%");

	var margin = {top:20, left:50, right:50, bottom: 50};
	var width = 550 - margin.left - margin.right;
	var height = 350 - margin.top - margin.bottom;
	var years = ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];
	var xScale = d3.scale.linear().domain([0,12]).range([0,width]);
	var yScale = d3.scale.linear().range([height,0]).domain([0,91000]);
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

	
	/*d3.csv("data/star_rating_count_year_all.csv",function(error,data){
		
		createLineAndCircle(g,data,colorbrewer['Paired'][12][11]);
	})*/
	d3.csv("data/user_account_by_year.csv",function(error,data){
		
		createBar(g,data,colorbrewer['Paired'][12][3]);
	})

}

function createBar(g,data,color){
		var tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.count; });
		var margin = {top:20, left:50, right:50, bottom: 50};
		var width = 550 - margin.left - margin.right;
		var height = 350 - margin.top - margin.bottom;
		var years = ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];
		var xScale = d3.scale.linear().domain([0,12]).range([0,width]);
		var yScale = d3.scale.linear().range([height,0]).domain([0,91000]);
		var review_line = d3.svg.line()
				    .interpolate("linear")
				    .x(function(d) { return xScale(years.indexOf(d.year)); })
				    .y(function(d) { return yScale(d.count); });

		g.append("g").selectAll(".bar")
      	.data(data)
    	.enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d) { return xScale(years.indexOf(d.year)) })
	      .attr("width", width/12 - 2.5)
	      .attr("y", function(d) { return yScale(d.count); })
	      .attr("height", function(d) { return height - yScale(d.count); })
	      .style("fill",color)
	      //.on('mouseover', tip.show)
	      //.on('mouseout', tip.hide)

	     g.append("g").selectAll("text")
	     .data(data)
	     .enter()
	     .append("text")
	     .attr("x", function(d) { return xScale(years.indexOf(d.year))})
	     .attr("y", function(d) { return yScale(d.count); })
	     .style("fill","black")
	     .text(function(d){return d.count})

}
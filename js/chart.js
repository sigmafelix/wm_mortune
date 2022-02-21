        function chart(d, subsets) {
            //var feature = d;
            var data = d //feature.properties[subsets];
            //reparse values in the multiple keys into a single json?
            //is there way to access jsons directly?
            //var json = '{"x": 1991:2014, "y":' + [d.i for i in subsets] + '}'
            var dd = []
            for (i = 0; i < subsets.length; i++) {
                dd.push(d.properties[subsets[i]]);
            };
            var myJSON = JSON.stringify(dd);
            console.log(myJSON)
            //d = d3.json(json)
            var width = 200;
            var height = 80;
            var margin = {
                left: 20,
                right: 15,
                top: 40,
                bottom: 40
            };
            var parse = d3.timeParse("%Ysvg");
            //var format = d3.timeFormat("%b");

            var div = d3.create("div")
            var svg = div.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);
            var g = svg.append("g")
                .attr("transform", "translate(" + [margin.left, margin.top] + ")");

            var y = d3.scaleLinear()
                .domain([0, d3.max(myJSON, function (d) {
                    return d;
                })])
                .range([height, 0]);

            var yAxis = d3.axisLeft()
                .ticks(5)
                .scale(y);
            g.append("g").call(yAxis);

            var x = d3.scaleBand()
                .domain(d3.range(1991, 2014))
                .range([0, width]);

            var xAxis = d3.axisBottom()
                .scale(x)

            g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-75)translate(-12,-15)")

            var line = d3.line()
            //   .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
            //   .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
            //   .curve(d3.curveMonotoneX) // apply smoothing to the line


            var rects = g.selectAll("line")
                .data(myJSON)
                .enter()
                .append("line")
            //.duration(1000);

            var title = svg.append("text")
                .style("font-size", "20px")
                .text('Temporal change')
                .attr("x", width / 2 + margin.left)
                .attr("y", 24)
                .attr("text-anchor", "middle");

            return div.node();

        };

        function lines(d, subsets) {
            var data = d //feature.properties[subsets];
            //reparse values in the multiple keys into a single json?
            //is there way to access jsons directly?
            //var json = '{"x": 1991:2014, "y":' + [d.i for i in subsets] + '}'
            var dd = []
            var years = []
            for (i = 0; i < subsets.length; i++) {
                dd.push(d.properties[subsets[i]]);
            };
            for (var i = 1991; i <= 2014; i++) {
                years.push(i);
            }
            var ddd = {
                'year': years,
                'values': dd
            };
            var myJSON = JSON.parse(JSON.stringify(ddd));
            //var myJSON = myJSON.map(function(item){return {value:item};}); // [{"color":"black"},{"color":"red"}]
            console.log([myJSON]);
            //d = d3.json(json)
            var width = 225;
            var height = 200;

            var margin = {
                left: 25,
                right: 5,
                top: 25,
                bottom: 40
            };
            var parse = d3.timeParse("%Y");
            //var format = d3.timeFormat("%b");
                width = width- margin.left - margin.right // Use the window's width 
                ,
                height = height - margin.top - margin.bottom; // Use the window's height
            // The number of datapoints
            // 5. X scale will use the index of our data
            var xScale = d3.scaleBand()
                .domain(myJSON.year)//d3.range(1991,  2015)) // input
                .range([0, width - 1]); // output

            // 6. Y scale will use the randomly generate number 
            var yScale = d3.scaleLinear()
                .domain([d3.min(myJSON.values, function (d) {
                        return d;
                    }),
                    d3.max(myJSON.values, function (d) {
                        return d;
                    })
                ])
                .range([height, 0]);
            //var yScale = d3.scaleLinear()
            //    .domain([0, 1]) // input 
            //    .range([height, 0]); // output 
            // 7. d3's line generator
            var line = d3.line()
                .x(function (d) {
                    return xScale(d.year);
                }) // set the x values for the line generator
                .y(function (d) {
                    return yScale(d.values);
                }) // set the y values for the line generator 
                .curve(d3.curveMonotoneX); // apply smoothing to the line
            // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
            //var dataset = d3.range(n).map(function (d) {
            //    return {
            //        "y": d3.randomUniform(1)()
            //    }
            //})
            // 1. Add the SVG to the page and employ #2
            var div = d3.create("div");
            var svg = div.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            // 3. Call the x axis in a group tag
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-75)translate(-12,-15)")
                ; // Create an axis component with d3.axisBottom
            // 4. Call the y axis in a group tag
            svg.append("g")
                .attr("class", "y axis")
                .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
            // 9. Append the path, bind the data, and call the line generator 
            svg.append('g')//.selectAll('path')
                //.data([myJSON]) // 10. Binds data to the line 
                //.enter()
                .append("path")
                .attr("d", line(myJSON)); // 11. Calls the line generator 
            // 12. Appends a circle for each datapoint 
            svg.selectAll(".dot")
                .data([myJSON])
                .enter().append("circle") // Uses the enter().append() method
                .attr("class", "dot") // Assign a class for styling
                .attr("cx", function (d) {
                    return xScale(d.year)
                })
                .attr("cy", function (d) {
                    return yScale(d.values)
                })
                .attr("r", 3);
                //.on("mouseover", function (a, b, c) {
                //    console.log(a)
                //    this.attr('class', 'focus')
                //})
                //.on("mouseout", function () {});
        
                return div.node();
            };






        function linechart(d, subsets) {
            var data = d //feature.properties[subsets];
            //reparse values in the multiple keys into a single json?
            //is there way to access jsons directly?
            //var json = '{"x": 1991:2014, "y":' + [d.i for i in subsets] + '}'
            var dd = []
            var years = []
            for (i = 0; i < subsets.length; i++) {
                dd.push(d.properties[subsets[i]]);
            };
            for (var i = 1991; i <= 2014; i++) {
                years.push(i);
            }
            var ddd = {
                'year': years,
                'values': dd
            }
            var myJSON = JSON.parse(JSON.stringify(ddd))
            //var myJSON = myJSON.map(function(item){return {value:item};}); // [{"color":"black"},{"color":"red"}]
            console.log(myJSON);
            //d = d3.json(json)
            var width = 200;
            var height = 80;
            var margin = {
                left: 25,
                right: 15,
                top: 40,
                bottom: 40
            };
            var parse = d3.timeParse("%Y");
            //var format = d3.timeFormat("%b");

            var div = d3.create("div")
            var svg = div.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);
            var g = svg.append("g")
                .attr("transform", "translate(" + [margin.left, margin.top] + ")");

            var yy = d3.scaleLinear()
                .domain([d3.min(myJSON.values, function (d) {
                        return d;
                    }),
                    d3.max(myJSON.values, function (d) {
                        return d;
                    })
                ])
                .range([height, 0]);

            var yAxis = d3.axisLeft()
                .ticks(5)
                .scale(yy);

            var xx = d3.scaleBand()
                .domain(d3.range(1991, 2014))
                .range([0, width + 1]);

            var xAxis = d3.axisBottom()
                .scale(xx)

            g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-75)translate(-12,-15)")

            g.append("g")
                .call(yAxis);

            var valueline = d3.line()
                .x(function (d) {
                    return x(d.years);
                })
                .y(function (d) {
                    return y(d.values);
                })
                .curve(d3.curveMonotoneX);

            g.append("path")
                .data([myJSON])
                .attr("class", "line")
                .attr("d", valueline);


            //g.call(path);

            return div.node();
        };


        function hover(svg, path) {
            svg
                .style("position", "relative");

            if ("ontouchstart" in document) svg
                .style("-webkit-tap-highlight-color", "transparent")
                .on("touchmove", moved)
                .on("touchstart", entered)
                .on("touchend", left)
            else svg
                .on("mousemove", moved)
                .on("mouseenter", entered)
                .on("mouseleave", left);

            const dot = svg.append("g")
                .attr("display", "none");

            dot.append("circle")
                .attr("r", 2.5);

            dot.append("text")
                .style("font", "10px sans-serif")
                .attr("text-anchor", "middle")
                .attr("y", -8);

            function moved() {
                d3.event.preventDefault();
                const ym = y.invert(d3.event.layerY);
                const xm = x.invert(d3.event.layerX);
                const i1 = d3.bisectLeft(data.dates, xm, 1);
                const i0 = i1 - 1;
                const i = xm - data.dates[i0] > data.dates[i1] - xm ? i1 : i0;
                const s = data.series.reduce((a, b) => Math.abs(a.values[i] - ym) < Math.abs(b.values[i] - ym) ? a : b);
                path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
                dot.attr("transform", `translate(${x(data.dates[i])},${y(s.values[i])})`);
                dot.select("text").text(s.name);
            }

            function entered() {
                path.style("mix-blend-mode", null).attr("stroke", "#ddd");
                dot.attr("display", null);
            }

            function left() {
                path.style("mix-blend-mode", "multiply").attr("stroke", null);
                dot.attr("display", "none");
            }
        };


        function final() {

            var lineData = [];



            lineData.push({
                date: new Date(2019, 01, 04),
                nps: 89
            });
            lineData.push({
                date: new Date(2019, 01, 11),
                nps: 96
            });
            lineData.push({
                date: new Date(2019, 01, 18),
                nps: 87
            });
            lineData.push({
                date: new Date(2019, 01, 25),
                nps: 99
            });
            lineData.push({
                date: new Date(2019, 02, 04),
                nps: 83
            });
            lineData.push({
                date: new Date(2019, 02, 11),
                nps: 93
            });
            lineData.push({
                date: new Date(2019, 02, 18),
                nps: 79
            });
            lineData.push({
                date: new Date(2019, 02, 25),
                nps: 94
            });
            lineData.push({
                date: new Date(2019, 03, 4),
                nps: 89
            });
            lineData.push({
                date: new Date(2019, 03, 11),
                nps: 93
            });
            lineData.push({
                date: new Date(2019, 03, 18),
                nps: 81
            });


            lineData.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });



            var height = 120;
            var width = 200;
            var hEach = 10;

            var margin = {
                top: 20,
                right: 15,
                bottom: 25,
                left: 25
            };

            width = width - margin.left - margin.right;
            height = height - margin.top - margin.bottom;

            var div = d3.create('div');
            var svg = div.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            44
            // set the ranges
            var x = d3.scaleTime().range([0, width]);

            x.domain(d3.extent(lineData, function (d) {
                return d.date;
            }));


            var y = d3.scaleLinear().range([height, 0]);


            y.domain([d3.min(lineData, function (d) {
                return d.nps;
            }) - 5, 100]);

            var valueline = d3.line()
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.nps);
                })
                .curve(d3.curveMonotoneX);

            svg.append("path")
                .data([lineData])
                .attr("class", "line")
                .attr("d", valueline);

            //  var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V"));
            var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%y-%b-%d")).tickValues(lineData.map(d => d.date));

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis_woy);

            //  Add the Y Axis
            //  svg.append("g").call(d3.axisLeft(y));

            svg.selectAll(".dot")
                .data(lineData)
                .enter()
                .append("circle") // Uses the enter().append() method
                .attr("class", "dot") // Assign a class for styling
                .attr("cx", function (d) {
                    return x(d.date)
                })
                .attr("cy", function (d) {
                    return y(d.nps)
                })
                .attr("r", 5);


            svg.selectAll(".text")
                .data(lineData)
                .enter()
                .append("text") // Uses the enter().append() method
                .attr("class", "label") // Assign a class for styling
                .attr("x", function (d, i) {
                    return x(d.date)
                })
                .attr("y", function (d) {
                    return y(d.nps)
                })
                .attr("dy", "-5")
                .text(function (d) {
                    return d.nps;
                });

            svg.append('text')
                .attr('x', 10)
                .attr('y', -5)
                .text('Almaty');


        };
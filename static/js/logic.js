// -------------------------------------------------------------------------------------------------

function init() {
    // creating the initial outline of the soon to come d3 line graph.

    // creating the dimensions of the space in the html that will hold line graphs.
    var svgWidth = 700;
    var svgHeight = 400;

    // creating a dictionary of margins for dimensions created above.
    var margin = {top:20, right:40, bottom:60, left:50};

    // creating the width and height of the soon to come graph so it fits within dimensions created above by using the margins dictionary.
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // appending an svg element to the html body with width and height.
    var svg = d3
        .select('#map-id')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    // creating a chart element within the svg element with a set orientaiton.
    var chartGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
    // creating a connection to the created restful flask api that contains a json data object.
    d3.json('http://127.0.0.1:5000/').then(function(data) {
        
    //creating empty dictionaries 
        // inside dictionary
        var innerdict = {}
        // middle dictionary
        var dict = {}
        // outtermost dictionary.
        var compiled = {}
        // dictionary that holds all of the countries names in question for later use.
        var countries = ['United States', 'China', 'Korea, Rep.', 'Russian Federation', 'Brazil', 'Germany', 'India', 'Singapore', 'Japan', 'Kenya', 'Mexico', 'Panama', 'Australia', 'Netherlands', 'Norway', 'Finland', 'Sweden', 'Switzerland', 'France', 'Spain', 'United Kingdom', 'Indonesia', 'Argentina', 'South Africa', 'Colombia', 'Denmark', 'Iceland', 'United Arab Emirates', 'Saudi Arabia']
        
    // the below process is a bunch of loops that transform the whole formatting of the json object from the flask api into a more convenient and usable form. 
        
        // looping through the countries list.
        for(var k = 0; k < countries.length; k++) {
            // refreshing middle dictionary to contain a new set of key/values.
            dict = {}
            // resetting/setting index for middle dictionary to 0.
            x = 0
            // looping through dates/years.
            for(var i = 1961; i < 2019; i++) {
                // refreshing innermost dictionary to contain new key/value pairs.
                innerdict = {}
                // looping through json dateset in original form.
                for(var j = 0; j < data.length; j++) {
                    // finding data based on country name.
                    if(data[j]['country_name'] === countries[k]) {
                        // looping through the keys of original json inner dictionary.
                        Object.keys(data[j]).forEach((key) => { 
                            // finding databased on year/date aka i from above in string form.
                            if(key === (i).toString()) {
                                // looping through the values of the key/value pairs of inner json dictionary.
                                Object.values(data[j]).forEach((metric) => {
                                    // finding data related to gdp.
                                    if(metric === 'GDP growth (annual %)') {
                                        // appending inner dictionary with conditional data.
                                        innerdict['year'] = key;
                                        innerdict['gdp_growth'] = data[j][key]
                                    }
                                    // finding data related to government spending.
                                    else if(metric === 'General government final consumption expenditure (% of GDP)') {
                                        // appending to innermost dictionary.
                                        innerdict['government_spending'] = data[j][key];
                                    }
                                    // finding data related to unemployment.
                                    else if(metric === 'Unemployment, total (% of total labor force) (modeled ILO estimate)') {
                                        // appending toinnermost dictionary.
                                        innerdict["unemployment_rate"] = data[j][key];
                                    };
                                });
                            };
                        });
                    };
                };
                // taking the innerdictionary that now contains all the gdp, unemployment, and government spending data for one year to the middle dictionary.
                dict[x] = innerdict
                // stepping up the middle dictionary index by 1. 
                var x = x + 1
            };
        // adding the middle dictionary that now has all the year data, rather than just one, for a country to the outtermost dictionary and making the middle dictionary's key the country's name. 
        compiled[countries[k].toString()] = dict
        };
        // viewing the final hewly formmated compiled dictionary.
    console.log('World Bank Data', compiled);

    // -------------------------------------------------------------------------------------------------------------------------
    //creating a dropdown menu. 

        var data = compiled 

        var factors = Object.keys(data['Japan'][0])

        var dropdown1 = d3.select('#selDataset1');

        for(var i = 1; i < factors.length; i++) {
            var cell = dropdown1.append('option');
            cell.text(factors[i]);
            cell.value = factors[i];
        }

        var dropdown2 = d3.select('#selDataset2');

        for(var i = 1; i < factors.length; i++) {
            var cell = dropdown2.append('option');
            cell.text(factors[i]);
            cell.value = factors[i];
        }
    // ----------------------------------------------------------------------------------------------------------------------
    // creating the initial line graph.

        var China = Object.values(data['Japan'])

        var parseTime = d3.timeParse('%Y')

        var xTimeScale = d3.scaleTime()
            .domain(d3.extent(China, d => parseTime(d.year)))
            .range([0, width]);

        var yLinearScale1 = d3.scaleLinear()
            .domain([d3.min(China, d => d.gdp_growth), d3.max(China, d => d.gdp_growth)])
            .range([height, 0]);

        var yLinearScale2 = d3.scaleLinear()
            .domain([0, d3.max(China, d => d.government_spending)])
            .range([height, 0]);

        // var yLinearScale3 = d3.scaleLinear()
        //     .domain([0, d3.max(China, d => d.unemployment_rate)])
        //     .range([height, 0]);

        var bottomAxis = d3.axisBottom(xTimeScale);
        var leftAxis = d3.axisLeft(yLinearScale1);
        var rightAxis = d3.axisRight(yLinearScale2);
        // var rightAxis2 = d3.axisRight(yLinearScale3);

        chartGroup.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append('g')
            .classed('green', true)
            .call(leftAxis);

        chartGroup.append('g')
            .attr('transform', `translate(${width}, 0)`)
            .call(rightAxis);

        // chartGroup.append('g')
        //     .call(rightAxis2)

        
        var line1 = d3.line()
            .x(d => xTimeScale(parseTime(d.year)))
            .y(d => yLinearScale1(d.gdp_growth));

        var line2 = d3.line()
            .x(d => xTimeScale(parseTime(d.year)))
            .y(d => yLinearScale2(d.government_spending));
        
        // var line3 = d3.line()
        //     .x(d => xTimeScale(parseTime(d.year)))
        //     .y(d => yLinearScale3(d.unemployment_rate))

        chartGroup.append('path')
            .data([China])
            .attr('d', line1)
            .classed('line green', true);

        chartGroup.append('path')
            .data([China])
            .attr('d', line2)
            .classed('line blue', true);

        // chartGroup.append('path')
        //     .data([China])
        //     .attr('d', line3)
        //     .classed('line red', true)

        chartGroup.append('text')
            .attr('transform', `translate(${width/2}, ${height + margin.top + 20})`)
            .text('Historical Gdp Growth vs Government Spending')

    }).catch(function(error) {
        console.log(error);
    });
};

init();
// ----------------------------------------------------------------------------------------------------------------------------

function handleChange() {
    var panel = d3.select('#map-id')
    panel.html('')
    // creating the initial outline of the soon to come d3 line graph.

    // creating the dimensions of the space in the html that will hold line graphs.
    var svgWidth = 700;
    var svgHeight = 400;

    // creating a dictionary of margins for dimensions created above.
    var margin = {top:20, right:40, bottom:60, left:50};

    // creating the width and height of the soon to come graph so it fits within dimensions created above by using the margins dictionary.
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // appending an svg element to the html body with width and height.
    var svg = d3
        .select('#map-id')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    // creating a chart element within the svg element with a set orientaiton.
    var chartGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // creating a connection to the created restful flask api that contains a json data object.
    d3.json('http://127.0.0.1:5000/').then(function(data) {
    
    //creating empty dictionaries 
        // inside dictionary
        var innerdict = {}
        // middle dictionary
        var dict = {}
        // outtermost dictionary.
        var compiled = {}
        // dictionary that holds all of the countries names in question for later use.
        var countries = ['United States', 'China', 'Korea, Rep.', 'Russian Federation', 'Brazil', 'Germany', 'India', 'Singapore', 'Japan', 'Kenya', 'Mexico', 'Panama', 'Australia', 'Netherlands', 'Norway', 'Finland', 'Sweden', 'Switzerland', 'France', 'Spain', 'United Kingdom', 'Indonesia', 'Argentina', 'South Africa', 'Colombia', 'Denmark', 'Iceland', 'United Arab Emirates', 'Saudi Arabia']
        
    // the below process is a bunch of loops that transform the whole formatting of the json object from the flask api into a more convenient and usable form. 
        
        // looping through the countries list.
        for(var k = 0; k < countries.length; k++) {
            // refreshing middle dictionary to contain a new set of key/values.
            dict = {}
            // resetting/setting index for middle dictionary to 0.
            x = 0
            // looping through dates/years.
            for(var i = 1961; i < 2019; i++) {
                // refreshing innermost dictionary to contain new key/value pairs.
                innerdict = {}
                // looping through json dateset in original form.
                for(var j = 0; j < data.length; j++) {
                    // finding data based on country name.
                    if(data[j]['country_name'] === countries[k]) {
                        // looping through the keys of original json inner dictionary.
                        Object.keys(data[j]).forEach((key) => { 
                            // finding databased on year/date aka i from above in string form.
                            if(key === (i).toString()) {
                                // looping through the values of the key/value pairs of inner json dictionary.
                                Object.values(data[j]).forEach((metric) => {
                                    // finding data related to gdp.
                                    if(metric === 'GDP growth (annual %)') {
                                        // appending inner dictionary with conditional data.
                                        innerdict['year'] = key;
                                        innerdict['gdp_growth'] = data[j][key]
                                    }
                                    // finding data related to government spending.
                                    else if(metric === 'General government final consumption expenditure (% of GDP)') {
                                        // appending to innermost dictionary.
                                        innerdict['government_spending'] = data[j][key];
                                    }
                                    // finding data related to unemployment.
                                    else if(metric === 'Unemployment, total (% of total labor force) (modeled ILO estimate)') {
                                        // appending toinnermost dictionary.
                                        innerdict["unemployment_rate"] = data[j][key];
                                    };
                                });
                            };
                        });
                    };
                };
                // taking the innerdictionary that now contains all the gdp, unemployment, and government spending data for one year to the middle dictionary.
                dict[x] = innerdict
                // stepping up the middle dictionary index by 1. 
                var x = x + 1
            };
        // adding the middle dictionary that now has all the year data, rather than just one, for a country to the outtermost dictionary and making the middle dictionary's key the country's name. 
        compiled[countries[k].toString()] = dict
        };
        // viewing the final hewly formmated compiled dictionary.
    console.log('World Bank Data', compiled);

    // -------------------------------------------------------------------------------------------------------------------------
    //creating a dropdown menu. 

        var inputElement1 = d3.select('#selDataset1');

        var inputValue1 = inputElement1.property('value');

        var inputElement2 = d3.select('#selDataset2');

        var inputValue2 = inputElement2.property('value');

    // ----------------------------------------------------------------------------------------------------------------------
    // creating the initial line graph.

        var data = compiled

        var China = Object.values(data['Japan'])

        var parseTime = d3.timeParse('%Y')

        var xTimeScale = d3.scaleTime()
            .domain(d3.extent(China, d => parseTime(d.year)))
            .range([0, width]);

        if(inputValue1 === 'gdp_growth') { 
            var yLinearScale1 = d3.scaleLinear()
            .domain([d3.min(China, d => d[inputValue1]), d3.max(China, d => d[inputValue1])])
            .range([height, 0]);
            var yLinearScale2 = d3.scaleLinear()
            .domain([d3.min(China, d => d[inputValue2]), d3.max(China, d => d[inputValue2])])
            .range([height, 0]);
        }
        else {
            var yLinearScale1 = d3.scaleLinear()
            .domain([0, d3.max(China, d => d[inputValue1])])
            .range([height, 0]);
            var yLinearScale2 = d3.scaleLinear()
            .domain([0, d3.max(China, d => d[inputValue2])])
            .range([height, 0]);
        };
        if(inputValue2 === 'gdp_growth') { 
            var yLinearScale1 = d3.scaleLinear()
            .domain([d3.min(China, d => d[inputValue2]), d3.max(China, d => d[inputValue2])])
            .range([height, 0]);
        }
        else {
            var yLinearScale1 = d3.scaleLinear()
            .domain([0, d3.max(China, d => d[inputValue2])])
            .range([height, 0]);
        };

        var yLinearScale2 = d3.scaleLinear()
            .domain([0, d3.max(China, d => d[inputValue1])])
            .range([height, 0]);

        // var yLinearScale3 = d3.scaleLinear()
        //     .domain([0, d3.max(China, d => d.unemployment_rate)])
        //     .range([height, 0]);

        var bottomAxis = d3.axisBottom(xTimeScale);
        var leftAxis = d3.axisLeft(yLinearScale1);
        var rightAxis = d3.axisRight(yLinearScale2);
        // var rightAxis2 = d3.axisRight(yLinearScale3);

        chartGroup.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append('g')
            .classed('green', true)
            .call(leftAxis);

        chartGroup.append('g')
            .attr('transform', `translate(${width}, 0)`)
            .call(rightAxis);

        // chartGroup.append('g')
        //     .call(rightAxis2)

        
        var line1 = d3.line()
            .x(d => xTimeScale(parseTime(d.year)))
            .y(d => yLinearScale1(d[inputValue2]));

        var line2 = d3.line()
            .x(d => xTimeScale(parseTime(d.year)))
            .y(d => yLinearScale2(d[inputValue1]));
        
        // var line3 = d3.line()
        //     .x(d => xTimeScale(parseTime(d.year)))
        //     .y(d => yLinearScale3(d.unemployment_rate))

        chartGroup.append('path')
            .data([China])
            .attr('d', line1)
            .classed('line green', true);

        chartGroup.append('path')
            .data([China])
            .attr('d', line2)
            .classed('line blue', true);

        // chartGroup.append('path')
        //     .data([China])
        //     .attr('d', line3)
        //     .classed('line red', true)

        chartGroup.append('text')
            .attr('transform', `translate(${width/2}, ${height + margin.top + 20})`)
            .text('Historical Gdp Growth vs Government Spending')
    }).catch(function(error) {
        console.log(error);
    });
};
// --------------------------------------------------------------------------------------------------------------------------
  var button1 = d3.select('#selDataset1');
  button1.on('change', handleChange);
  var button2 = d3.select('#selDataset2');
  button2.on('change', handleChange);
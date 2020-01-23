function init() {
    // creating the initial outline of the soon to come d3 line graph.

    // creating the dimensions of the space in the html that will hold line graphs.
    var svgWidth = 450;
    var svgHeight = 300;

    // creating a dictionary of margins for dimensions created above.
    var margin = {top:50, right:100, bottom:20, left:50};

    // creating the width and height of the soon to come graph so it fits within dimensions created above by using the margins dictionary.
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // appending an svg element to the html body with width and height.
    var svg = d3
        .select('#first')
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
        var countries = ['United States', 'China', 'Korea, Rep.', 'Russian Federation', 'Brazil', 'Germany', 'India', 'Singapore', 'Japan', 'Kenya', 'Mexico', 'Panama', 'Australia', 'Netherlands', 'Norway', 'Finland', 'Sweden', 'Switzerland', 'France', 'Spain', 'United Kingdom', 'Indonesia', 'Argentina', 'South Africa', 'Colombia', 'Denmark', 'Iceland', 'United Arab Emirates', 'Saudi Arabia', 'Canada', 'Luxembourg']
        
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
                                    }
                                    // finding data related to current account.
                                    else if(metric === 'Current account balance (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["current_account"] = data[j][key];
                                    }
                                    // finding data related to consumer spending.
                                    else if(metric === 'Final consumption expenditure (current US$)') {
                                        // appending toinnermost dictionary.
                                        innerdict["consumer_spending"] = data[j][key];
                                    }
                                    // finding data related to foreign direct investment.
                                    else if(metric === 'Foreign direct investment, net inflows (BoP, current US$)') {
                                        // appending toinnermost dictionary.
                                        innerdict["foreign_investment"] = data[j][key];
                                    }
                                    // finding data related to central government debt.
                                    else if(metric === 'Central government debt, total (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["government_debt"] = data[j][key];
                                    }
                                    // finding data related to capital formation. 
                                    else if(metric === 'Gross capital formation (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["capital_formation"] = data[j][key];
                                    }
                                    else if(metric === 'Broad money (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["broadmoney_supply"] = data[j][key];
                                    }
                                     // finding data related to exports.
                                    else if(metric === 'Exports of goods and services (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["exports_%gdp"] = data[j][key];
                                    }
                                    // finding data related to consumer spending % gdp.
                                    else if(metric === 'Final consumption expenditure (% of GDP)') {
                                    // appending toinnermost dictionary.
                                    innerdict["finalconsumption_%gdp"] = data[j][key];
                                    }
                                    // finding data related to consumer spending % gdp.
                                    else if(metric === 'Domestic credit to private sector (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["private_credit"] = data[j][key];
                                    }
                                    // finding data related to savings rate % gdp.
                                    else if(metric === 'Gross savings (% of GDP)') {
                                    // appending toinnermost dictionary.
                                    innerdict["savings rate % gdp"] = data[j][key];
                                    }
                                    // finding data related to income share of lowest 20%.
                                    else if(metric === 'Income share held by lowest 20%') {
                                    // appending toinnermost dictionary.
                                    innerdict["income share of lowest 20%"] = data[j][key];
                                    }
                                    // finding data related to foreign investment % gdp.
                                    else if(metric === 'Foreign direct investment, net inflows (% of GDP)') {
                                    // appending toinnermost dictionary.
                                    innerdict["foreign investment % gpd"] = data[j][key];
                                    }
                                    // finding data related to per capita gdp.
                                    else if(metric === 'GDP per capita (current US$)') {
                                        // appending toinnermost dictionary.
                                        innerdict["per capita gdp"] = data[j][key];
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

        // saving formated data above to variable name that makes more sense.
        var data = compiled 

        // creating and saving a list of the data type names, such as unemployment.
        var factors = Object.keys(data['China'][0])

        // selecting a html element.
        var dropdown1 = d3.select('#selDataset1');

        // looping, creating, and appending the data type names to option elements on the html page.
        for(var i = 1; i < factors.length; i++) {
            var cell = dropdown1.append('option');
            cell.text(factors[i]);
            cell.value = factors[i];
        }

        // creating second dropdown menu/selecting html element.
        var dropdown2 = d3.select('#selDataset2');

        // looping, creating, and appending the data type names again using factors list created above.
        for(var i = 1; i < factors.length; i++) {
            var cell = dropdown2.append('option');
            cell.text(factors[i]);
            cell.value = factors[i];
        }
    // ----------------------------------------------------------------------------------------------------------------------

    // creating the initial line graph.

        // saving the United States dictionary to a variable.
        var countrydata = Object.values(data['United States'])
        
        // saving d3.timeparse function to variable.
        var parseTime = d3.timeParse('%Y')
        var reverseparseTime = d3.timeFormat("%Y")

        // creating a x scale based on year.
        var xTimeScale = d3.scaleTime()
            .domain(d3.extent(countrydata, d => parseTime(d.year)))
            .range([0, width]);

        // creating a y scale based on gpd.
        var yLinearScale1 = d3.scaleLinear()
            .domain([d3.min(countrydata, d => d.gdp_growth), d3.max(countrydata, d => d.gdp_growth)])
            .range([height, 0]);

        // creating x axis based on x scale.
        var bottomAxis = d3.axisBottom(xTimeScale);
        
        // creating left and right y axis based on y scale.
        var leftAxis = d3.axisLeft(yLinearScale1);
        var rightAxis = d3.axisRight(yLinearScale1);

        // appending x axis to html svg element.
        chartGroup.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(bottomAxis);

        // appending left y axis to html svg elemment.
        chartGroup.append('g')
            .classed('green', true)
            .call(leftAxis);

        // appending right y axis to html svg element.
        chartGroup.append('g')
            .classed('blue', true)
            .attr('transform', `translate(${width}, 0)`)
            .call(rightAxis);
        
        // creating a line based on gdp growth.
        var line1 = d3.line()
            .x(d => xTimeScale(parseTime(d.year)))
            .y(d => yLinearScale1(d.gdp_growth));

        // appending the line to html/svg page based on countrydata/United States.
        var line = chartGroup.append('path')
            .data([countrydata])
            .attr('d', line1)
            .classed('line green', true);
            
        var tooltip = d3.select('#tooltip');

        var tipBox = chartGroup.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('opacity', 0)
            .on('mousemove', drawTooltip)
            .on('mouseout', removeTooltip);

        function removeTooltip() {
            if (tooltip) tooltip.style('display', 'none');
        }

        function drawTooltip() {

            var x0 = reverseparseTime(xTimeScale.invert(d3.mouse(this)[0]))
            
            tooltip.html('United States '+ x0)
                .style('display', 'block')
                .data(countrydata)
                .append('div')
                .html('Gdp Growth: ' + countrydata.find(h => h.year === x0).gdp_growth)
        }

    }).catch(function(error) {
        console.log(error);
    });
};
// --------------------------------------------------------------------------------------------------------------------
// performing the function created above.
init();
// ----------------------------------------------------------------------------------------------------------------------------
// creating a function that will change the graph based on new inputs.

function handleChange() {
    
    // selecting an html element and saving to variable.
    var panel = d3
        .select('#first')
        .select('#map-id')
    
    // clearing that html element.
    panel.html('')

// ---------------------------------------------------------------------------------------------------------------
// creating the initial outline of the soon to come d3 line graph.

    // creating the dimensions of the space in the html that will hold line graphs.
    var svgWidth = 450;
    var svgHeight = 300;

    // creating a dictionary of margins for dimensions created above.
    var margin = {top:50, right:100, bottom:20, left:90};

    // creating the width and height of the soon to come graph so it fits within dimensions created above by using the margins dictionary.
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // appending an svg element to the html body with width and height.
    var svg = d3
        .select('#first')
        .select('#map-id')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    // creating a chart element within the svg element with a set orientaiton.
    var chartGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
// ------------------------------------------------------------------------------------------------------------------------

// reconfiguring the json dictionary.

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
        var countries = ['United States', 'China', 'Korea, Rep.', 'Russian Federation', 'Brazil', 'Germany', 'India', 'Singapore', 'Japan', 'Kenya', 'Mexico', 'Panama', 'Australia', 'Netherlands', 'Norway', 'Finland', 'Sweden', 'Switzerland', 'France', 'Spain', 'United Kingdom', 'Indonesia', 'Argentina', 'South Africa', 'Colombia', 'Denmark', 'Iceland', 'United Arab Emirates', 'Saudi Arabia', 'Canada', 'Luxembourg']
        
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
                                    }
                                    // finding data related to current account.
                                    else if(metric === 'Current account balance (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["current_account"] = data[j][key];
                                    }
                                    // finding data related to consumer spending.
                                    else if(metric === 'Final consumption expenditure (current US$)') {
                                        // appending toinnermost dictionary.
                                        innerdict["consumer_spending"] = data[j][key];
                                    }
                                    // finding data related to foreign direct investment.
                                    else if(metric === 'Foreign direct investment, net inflows (BoP, current US$)') {
                                        // appending toinnermost dictionary.
                                        innerdict["foreign_investment"] = data[j][key];
                                    }
                                    // finding data related to goverment debt.
                                    else if(metric === 'Central government debt, total (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["government_debt"] = data[j][key];
                                    }
                                    // finding data related to capital accumulation.
                                    else if(metric === 'Gross capital formation (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["capital_formation"] = data[j][key];
                                    }
                                    // finding data related to broad money supply.
                                    else if(metric === 'Broad money (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["broadmoney_supply"] = data[j][key];
                                    }
                                     // finding data related to exports.
                                    else if(metric === 'Exports of goods and services (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["exports_%gdp"] = data[j][key];
                                    }
                                    // finding data related to consumer spending % gdp.
                                    else if(metric === 'Final consumption expenditure (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["finalconsumption_%gdp"] = data[j][key];
                                    }
                                    // finding data related to consumer spending % gdp.
                                    else if(metric === 'Domestic credit to private sector (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["private_credit"] = data[j][key];
                                    }
                                    // finding data related to savings rate % gdp.
                                    else if(metric === 'Gross savings (% of GDP)') {
                                    // appending toinnermost dictionary.
                                    innerdict["savings rate % gdp"] = data[j][key];
                                    }
                                    // finding data related to income share of lowest 20%.
                                    else if(metric === 'Income share held by lowest 20%') {
                                    // appending toinnermost dictionary.
                                    innerdict["income share of lowest 20%"] = data[j][key];
                                    }
                                    // finding data related to foreign investment % gdp.
                                    else if(metric === 'Foreign direct investment, net inflows (% of GDP)') {
                                    // appending toinnermost dictionary.
                                    innerdict["foreign investment % gpd"] = data[j][key];
                                    }
                                    // finding data related to per capita gdp.
                                    else if(metric === 'GDP per capita (current US$)') {
                                        // appending toinnermost dictionary.
                                        innerdict["per capita gdp"] = data[j][key];
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
// -------------------------------------------------------------------------------------------------------------------------
    //creating a dropdown menu. 

        // selecting and saving html element to variable.
        var inputElement1 = d3.select('#selDataset1');

        // saving the value in the saved element to variable.
        var inputValue1 = inputElement1.property('value');

        // doing same process as above for second variable.
        var inputElement2 = d3.select('#selDataset2');

        var inputValue2 = inputElement2.property('value');

        // doing same as above but for country variable.
        var countryinputelement = d3.select('#country-name')
        
        // using if then statement to make countryvalue have value at the very beginning.
        if(countryinputelement.property('value') === '') {
            var countryvaluename = 'United States'
        }
        else {
            var countryvaluename = countryinputelement.property('value')
        };
// ----------------------------------------------------------------------------------------------------------------------
    // creating the initial line graph.

        // saving and creating better named variable based on ultimate dictionary.
        var data = compiled

        // saving variable country names dictionary to a variable.
        var countryvalue = Object.values(data[countryvaluename])

        // creating a parsetime fucntion variable.
        var parseTime = d3.timeParse('%Y')
        var reverseparseTime = d3.timeFormat("%Y")

        // creating a x scale based on variable country.
        var xTimeScale = d3.scaleTime()
            .domain(d3.extent(countryvalue, d => parseTime(d.year)))
            .range([0, width]);

        // creating y scale and left y axis(needed to do an if else statement to make graph work, because of differing data styles).
        if(inputValue1 === 'gdp_growth' | inputValue1 === 'current_account') { 
            var yLinearScale1 = d3.scaleLinear()
                .domain([d3.min(countryvalue, d => d[inputValue1]), d3.max(countryvalue, d => d[inputValue1])])
                .range([height, 0]);
                
            var leftAxis = d3.axisLeft(yLinearScale1)
        }
        else {
            var yLinearScale1 = d3.scaleLinear()
                .domain([0, d3.max(countryvalue, d => d[inputValue1])])
                .range([height, 0]);

            var leftAxis = d3.axisLeft(yLinearScale1)
        };
        // creating the y scale for the right axis.
        if(inputValue2 === 'gdp_growth' | inputValue2 === 'current_account') { 
            var yLinearScale2 = d3.scaleLinear()
                .domain([d3.min(countryvalue, d => d[inputValue2]), d3.max(countryvalue, d => d[inputValue2])])
                .range([height, 0]);

            var rightAxis = d3.axisRight(yLinearScale2)
        }
        else {
            var yLinearScale2 = d3.scaleLinear()
                .domain([0, d3.max(countryvalue, d => d[inputValue2])])
                .range([height, 0]);

            var rightAxis = d3.axisRight(yLinearScale2)
        };
        
        // creating the x axis based on x scale. 
        var bottomAxis = d3.axisBottom(xTimeScale);

        // appending x axis to svg html element.
        chartGroup.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(bottomAxis);

        // appending the left y axis to y scale.
        chartGroup.append('g')
            .classed('green', true)
            .call(leftAxis);

        // appending the right y axis to the y scale.
        chartGroup.append('g')
            .classed('blue', true)
            .attr('transform', `translate(${width}, 0)`)
            .call(rightAxis);
        
        // creating a line based on variable data type such as unemployment.
        var line1 = d3.line()
            .x(d => xTimeScale(parseTime(d.year)))
            .y(d => yLinearScale1(d[inputValue1]));

        // creating a line based on a second variable data type such as government spending.
        var line2 = d3.line()
            .x(d => xTimeScale(parseTime(d.year)))
            .y(d => yLinearScale2(d[inputValue2]));

        // appending the first line to the svg html element.
        chartGroup.append('path')
            .data([countryvalue])
            .attr('d', line1)
            .classed('line green', true);

        // appending the second line to the svg element.
        chartGroup.append('path')
            .data([countryvalue])
            .attr('d', line2)
            .classed('line blue', true);

           
        var tooltip = d3.select('#tooltip');
        // const tooltipLine = chartGroup.append('line');

        
        var tipBox = chartGroup.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('opacity', 0)
            .on('mousemove', drawTooltip)
            .on('mouseout', removeTooltip);

        function removeTooltip() {
            if (tooltip) tooltip.style('display', 'none');
        }

        function drawTooltip() {

            var x0 = reverseparseTime(xTimeScale.invert(d3.mouse(this)[0]))
            
            tooltip.html(countryvaluename + ' ' + x0)
                .style('display', 'block')
                .data(countryvalue)
                .append('div')
                .html(`${inputValue1}:  ${countryvalue.find(h => h.year === x0)[inputValue1]}
                <br> ${inputValue2}:   ${countryvalue.find(h => h.year === x0)[inputValue2]}</br>`)
        }

    }).catch(function(error) {
        console.log(error);
    });
};
// --------------------------------------------------------------------------------------------------------------------------
// creating the operations that will change the graph on the front end.  

// selecting a html element.
var button1 = d3.select('#selDataset1');
// performing button change based on the handleChange function created above based on selected data type. 
button1.on('change', handleChange);

// doing same thing directly above.
var button2 = d3.select('#selDataset2');
button2.on('change', handleChange);

// doing same thign as above, but changeing information based on country name input.
var countrybutton = d3.select('#filter-btn');
countrybutton.on('click', handleChange);

// ----------------------------------------------------------------------------------------------------------------
function init() {
    // creating the initial outline of the soon to come d3 line graph.

    // creating the dimensions of the space in the html that will hold line graphs.
    var svgWidth = 450;
    var svgHeight = 300;

    // creating a dictionary of margins for dimensions created above.
    var margin = {top:50, right:40, bottom:20, left:50};

    // creating the width and height of the soon to come graph so it fits within dimensions created above by using the margins dictionary.
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // appending an svg element to the html body with width and height.
    var svg = d3
        .select('#second')
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
        var dropdown1 = d3.select('#selDataset3');

         // looping, creating, and appending the data type names to option elements on the html page.
        for(var i = 1; i < factors.length; i++) {
            var cell = dropdown1.append('option');
            cell.text(factors[i]);
            cell.value = factors[i];
        }
    // ----------------------------------------------------------------------------------------------------------------------
    // creating the initial line graph.

        // saving the variable country dictionary to a variable.
        var firstcountry = Object.values(data['United States'])

         // saving a second variable country dictionary to a variable.
        var secondcountry = Object.values(data['China'])

         // saving d3.timeparse function to variable.
        var parseTime = d3.timeParse('%Y')
        var reverseparseTime = d3.timeFormat("%Y")

        // creating a x scale based on year.
        var xTimeScale = d3.scaleTime()
            .domain(d3.extent(firstcountry, d => parseTime(d.year)))
            .range([0, width]);

        // creating a y scale and y axis based on the first or second variable country's gdp. Used if then statement for different data type reasons.
        if(d3.max(firstcountry, d => d.gdp_growth) - d3.min(firstcountry, d => d.gdp_growth) > (d3.max(secondcountry, d => d.gdp_growth) - d3.min(secondcountry, d => d.gdp_growth))) {
            var yLinearScale1 = d3.scaleLinear()
            .domain([d3.min(firstcountry, d => d.gdp_growth), d3.max(firstcountry, d => d.gdp_growth)])
            .range([height, 0]);

            var leftAxis = d3.axisLeft(yLinearScale1);
        }
        else {
            var yLinearScale1 = d3.scaleLinear()
            .domain([d3.min(secondcountry, d => d.gdp_growth), d3.max(secondcountry, d => d.gdp_growth)])
            .range([height, 0]);

            var leftAxis = d3.axisLeft(yLinearScale1);
        }

        // creating x axis based on x scale.
        var bottomAxis = d3.axisBottom(xTimeScale);
   
        // appending x axis to svg html element.
        chartGroup.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(bottomAxis);

        // appending the left y axis to y scale.
        chartGroup.append('g')
            .classed('green', true)
            .call(leftAxis);
        
        // creating a line based on gpd.
        var line1 = d3.line()
            .x(d => xTimeScale(parseTime(d.year)))
            .y(d => yLinearScale1(d.gdp_growth));
        
        // appending a line to svg element based on firstcountry varaibles data.
        chartGroup.append('path')
            .data([firstcountry])
            .attr('d', line1)
            .classed('line green', true);

        // appending a line to svg element based on secondcountry variables data.
        chartGroup.append('path')
            .data([secondcountry])
            .attr('d', line1)
            .classed('line blue', true);

        var tooltip = d3.select('#tooltip1');

        var tipBox = chartGroup.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('opacity', 0)
            .on('mousemove', drawTooltip1)
            .on('mouseout', removeTooltip1);

        function removeTooltip1() {
            if (tooltip) tooltip.style('display', 'none');
        }

        function drawTooltip1() {

            var x0 = reverseparseTime(xTimeScale.invert(d3.mouse(this)[0]))
            
            tooltip.html('Gdp Growth ' + x0)
                .style('display', 'block')
                .data(firstcountry)
                .data(secondcountry)
                .append('div')
                .html(`United States: ${firstcountry.find(h => h.year === x0).gdp_growth}
                <br>China: ${secondcountry.find(h => h.year === x0).gdp_growth}</br>`)
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

function handleChange2() {
    
     // selecting an html element and saving to variable.
    var panel = d3
        .select('#second')
        .select('#map-id')
    
    // clearing that html element.
    panel.html('')

// ------------------------------------------------------------------------------------------------------------------
// creating the initial outline of the soon to come d3 line graph.

    // creating the dimensions of the space in the html that will hold line graphs.
    var svgWidth = 450;
    var svgHeight = 300;

    // creating a dictionary of margins for dimensions created above.
    var margin = {top:50, right:40, bottom:20, left:50};

    // creating the width and height of the soon to come graph so it fits within dimensions created above by using the margins dictionary.
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // appending an svg element to the html body with width and height.
    var svg = d3
        .select('#second')
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

        
        // selecting and saving html element to variable.
        var inputElement = d3.select('#selDataset3');

         // saving the value in the saved element to variable.
        var inputValue = inputElement.property('value');

        // selecting and saving html element to variable.
        var firstcountryinputelement = d3.select('#country-name1')

         // selecting and saving html element to variable.
        var secondcountryinputelement = d3.select('#country-name2')
        
        // using if then statement to make firstcountryvalue and secondcountry to have value at the very beginning.
        if(firstcountryinputelement.property('value') === '') {
            var firstcountryvaluename = 'United States'
        }
        else {
            var firstcountryvaluename = firstcountryinputelement.property('value')
        };

        if(secondcountryinputelement.property('value') === '') {
            var secondcountryvaluename = 'China'
        }
        else {
            var secondcountryvaluename = secondcountryinputelement.property('value')
        };
    // ----------------------------------------------------------------------------------------------------------------------
    // creating the initial line graph.

        // saving and creating better named variable based on ultimate dictionary
        var data = compiled

         // saving variable country names dictionary to a variable.
        var firstcountry = Object.values(data[firstcountryvaluename])

         // saving variable country names dictionary to a variable.
        var secondcountry = Object.values(data[secondcountryvaluename])

        // creating a parsetime fucntion variable.
        var parseTime = d3.timeParse('%Y')
        var reverseparseTime = d3.timeFormat("%Y")

        // creating a x scale based on variable country.
        var xTimeScale = d3.scaleTime()
            .domain(d3.extent(firstcountry, d => parseTime(d.year)))
            .range([0, width]);

        // creating the x axis based on x scale. 
        var bottomAxis = d3.axisBottom(xTimeScale);

        // creating a y scale and y axis based on the first or second variable country's gdp. Used if then statement for different data type reasons.
        if(inputValue === 'gdp_growth' | inputValue === 'current_account') { 
            
            if(d3.max(firstcountry, d => d[inputValue]) > d3.max(secondcountry, d => d[inputValue])) {
                var maxdomain = d3.max(firstcountry, d => d[inputValue])
            }
            else {
                var maxdomain = d3.max(secondcountry, d => d[inputValue])
            }
            if(d3.min(firstcountry, d => d[inputValue]) < d3.min(secondcountry, d => d[inputValue])) {
                var mindomain = d3.min(firstcountry, d => d[inputValue]) 
            }
            else {
                var mindomain = d3.min(secondcountry, d => d[inputValue])
            }
            
            // creating y scale based on min and max value found above.
            var yLinearScale1 = d3.scaleLinear()
                .domain([mindomain, maxdomain])
                .range([height, 0]);

            // creating left y axis.
            var leftAxis = d3.axisLeft(yLinearScale1);
        }
        else {
            
            if(d3.max(firstcountry, d => d[inputValue]) > d3.max(secondcountry, d => d[inputValue])) {
                var yLinearScale1 = d3.scaleLinear()
                .domain([0, d3.max(firstcountry, d => d[inputValue])])
                .range([height, 0]);
                
                // creating left y axis.
                var leftAxis = d3.axisLeft(yLinearScale1);
            }
            else {
                var yLinearScale1 = d3.scaleLinear()
                .domain([0, d3.max(secondcountry, d => d[inputValue])])
                .range([height, 0]);
                
                // creating left y axis.
                var leftAxis = d3.axisLeft(yLinearScale1);
            }
        };
        
        // appending x axis to svg html element.
        chartGroup.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(bottomAxis);
        
        // appending left y axis to svg html element.
        chartGroup.append('g')
            .classed('green', true)
            .call(leftAxis);

        // creating a line based on variable data type such as unemployment.
        var line1 = d3.line()
            .x(d => xTimeScale(parseTime(d.year)))
            .y(d => yLinearScale1(d[inputValue]));
        
        // appending a line to svg element based on firstcountry varaibles data.
        chartGroup.append('path')
            .data([firstcountry])
            .attr('d', line1)
            .classed('line green', true);

        // appending a line to svg element based on countrycountry varaibles data.
        chartGroup.append('path')
            .data([secondcountry])
            .attr('d', line1)
            .classed('line blue', true);
        
        var tooltip = d3.select('#tooltip1');

        var tipBox = chartGroup.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('opacity', 0)
            .on('mousemove', drawTooltip1)
            .on('mouseout', removeTooltip1);

        function removeTooltip1() {
            if (tooltip) tooltip.style('display', 'none');
        }

        function drawTooltip1() {

            var x0 = reverseparseTime(xTimeScale.invert(d3.mouse(this)[0]))
            
            tooltip.html(inputValue + ' ' + x0)
                .style('display', 'block')
                .data(firstcountry)
                .data(secondcountry)
                .append('div')
                .html(`${firstcountryvaluename}: ${firstcountry.find(h => h.year === x0)[inputValue]}
                <br>${secondcountryvaluename}: ${secondcountry.find(h => h.year === x0)[inputValue]}</br>`)
        }

    }).catch(function(error) {
        console.log(error);
    });
};
// --------------------------------------------------------------------------------------------------------------------------
// creating the operations that will change the graph on the front end. 

// selecting a html element.  
var button3 = d3.select('#selDataset3');
// performing button change based on the handleChange function created above based on selected data type. 
button3.on('change', handleChange2);

// doing same thign as above, but changeing information based on both country name inputs.
var firstcountrybutton = d3.select('#filter-btn1');
firstcountrybutton.on('click', handleChange2);


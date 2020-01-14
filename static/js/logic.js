// creating the initial outline of the soon to come d3 line graph.

// creating the dimensions of the space in the html that will hold line graphs.
var svgWidth = 960;
var svgHeight = 500;

// creating a dictionary of margins for dimensions created above.
var margin = {top:20, right:40, bottom:60, left:50};

// creating the width and height of the soon to come graph so it fits within dimensions created above by using the margins dictionary.
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// appending an svg element to the html body with width and height.
var svg = d3
    .select('body')
    .append(svg)
    .attr('width', svgWidth)
    .attr('height', svgHeight);

// creating a chart element within the svg element with a set orientaiton.
var chartGroup = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
// -------------------------------------------------------------------------------------------------

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
                                    innerdict['gdp growth'] = data[j][key]
                                }
                                // finding data related to government spending.
                                else if(metric === 'General government final consumption expenditure (% of GDP)') {
                                    // appending to innermost dictionary.
                                    innerdict['government spending'] = data[j][key];
                                }
                                // finding data related to unemployment.
                                else if(metric === 'Unemployment, total (% of total labor force) (modeled ILO estimate)') {
                                    // appending toinnermost dictionary.
                                    innerdict["unemployment rate"] = data[j][key];
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

// ----------------------------------------------------------------------------------------------------------------------
}).catch(function(error) {
    console.log(error);
});
  
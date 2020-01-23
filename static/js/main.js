function init() {

    const CHART = document.getElementById("barChart");

    var countries = ['United States', 'China', 'Korea, Rep.', 'Russian Federation', 'Brazil', 'Germany', 'India', 'Singapore', 'Japan', 'Kenya', 'Mexico', 'Panama', 'Australia', 'Netherlands', 'Norway', 'Finland', 'Sweden', 'Switzerland', 'France', 'Spain', 'United Kingdom', 'Indonesia', 'Argentina', 'South Africa', 'Colombia', 'Denmark', 'Iceland', 'United Arab Emirates', 'Saudi Arabia']
            
    var selectElement = d3.select("#select-country");
    countries.forEach(country => selectElement.append("option").attr("value", country).text(country));

    var selectElement2 = d3.select("#select-country2");
    countries.forEach(country => selectElement2.append("option").attr("value", country).text(country));


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


            var data = compiled

            var factors = []

           for(var i = 1; i < Object.keys(data['China'][0]).length; i++) {
                factors.push(Object.keys(data['China'][0])[i])
               }

            console.log(factors)
            console.log(Object.keys(data['China'][0])[2])
            
            results = []

            results1 = []

            for(i = 0; i < Object.keys(data['United States']).length; i++) {
                if(data['United States'][i]['year'] === '2018') {
                    for(var j = 1; j < Object.values(data['United States'][i]).length; j++) {
                        results.push(Object.values(data['United States'][i])[j])
                    }
                };
            };

            console.log(results)

            for(i = 0; i < Object.keys(data['China']).length; i++) {
                if(data['China'][i]['year'] === '2018') {
                    for(var j = 1; j < Object.values(data['China'][i]).length; j++) {
                        results1.push(Object.values(data['China'][i])[j])
                    }
                };
            };
            
            console.log(results1)

            console.log(Object.values(data['United States'][57]))
            let barChart = new Chart(CHART, {
                type: 'bar',
                data: {
                    labels: factors,
                    datasets: [
                        {
                            label: "United States",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75, 192, 192, 0.4)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75, 192, 192, 1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: results,
                        },          {
                                    label: "China",
                                    fill: true,
                                    backgroundColor: "rgba(75, 75, 192, 0.4)",
                                    borderColor: "rgba(75, 72, 192, 1)",
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: "rgba(75, 72, 192, 1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75, 72, 192, 1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: results1,
                                }
                    ]

                }, 
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                               }]
                }
            }
            })   
    })
};
init()

function handlechange() {
    var panel = d3.select("#barChart")
    panel.html("")
    console.log("hey")

    const CHART = document.getElementById("barChart");

    var countries = ['United States', 'China', 'Korea, Rep.', 'Russian Federation', 'Brazil', 'Germany', 'India', 'Singapore', 'Japan', 'Kenya', 'Mexico', 'Panama', 'Australia', 'Netherlands', 'Norway', 'Finland', 'Sweden', 'Switzerland', 'France', 'Spain', 'United Kingdom', 'Indonesia', 'Argentina', 'South Africa', 'Colombia', 'Denmark', 'Iceland', 'United Arab Emirates', 'Saudi Arabia']
            
    var selectElement = d3.select("#select-country");
    countries.forEach(country => selectElement.append("option").attr("value", country).text(country));

    var selectElement2 = d3.select("#select-country2");
    countries.forEach(country => selectElement2.append("option").attr("value", country).text(country));

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

            var inputelement = d3.select("#select-country")
            var inputvalue = inputelement.property("value")
        

            var inputelement2 = d3.select("#select-country2")
            var inputvalue2 = inputelement2.property("value")
           


            var data = compiled

            var factors = []

           for(var i = 1; i < Object.keys(data['China'][0]).length; i++) {
                factors.push(Object.keys(data['China'][0])[i])
               }

            results = []

            results1 = []

            for(i = 0; i < Object.keys(data[inputvalue]).length; i++) {
                if(data[inputvalue][i]['year'] === '2018') {
                    for(var j = 1; j < Object.values(data[inputvalue][i]).length; j++) {
                        results.push(Object.values(data[inputvalue][i])[j])
                    }
                };
            };
            console.log(inputvalue)
            console.log(data[inputvalue][0])

            console.log(inputvalue2, data)
            for(i = 0; i < Object.keys(data[inputvalue2]).length; i++) {
                if(data[inputvalue2][i]['year'] === '2018') {
                    for(var j = 1; j < Object.values(data[inputvalue2][i]).length; j++) {
                        results1.push(Object.values(data[inputvalue2][i])[j])
                    }
                };
            };
            
           
            let barChart = new Chart(CHART, {
                type: 'bar',
                data: {
                    labels: factors,
                    datasets: [
                        {
                            label: inputvalue,
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75, 192, 192, 0.4)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75, 192, 192, 1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: results,
                        },          {
                                    label: "China",
                                    fill: true,
                                    backgroundColor: "rgba(75, 75, 192, 0.4)",
                                    borderColor: "rgba(75, 72, 192, 1)",
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: "rgba(75, 72, 192, 1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75, 72, 192, 1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: results1,
                                }
                    ]

                }, 
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                               }]
                }
            }
            })   
    })
};
var selectElement = d3.select("#select-country");
selectElement.on('change', handlechange);

var selectElement2 = d3.select("#select-country2");
selectElement2.on('change', handlechange);

    

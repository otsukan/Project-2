function init() {

    const CHART = document.getElementById("barChart");

    var countries = ['United States', 'China', 'Korea, Rep.', 'Russian Federation', 'Brazil', 'Germany', 'India', 'Singapore', 'Japan', 'Kenya', 'Mexico', 'Panama', 'Australia', 'Netherlands', 'Norway', 'Finland', 'Sweden', 'Switzerland', 'France', 'Spain', 'United Kingdom', 'Indonesia', 'Argentina', 'South Africa', 'Colombia', 'Denmark', 'Iceland', 'United Arab Emirates', 'Saudi Arabia']
    
    var years =  ["1960","1961","1962","1963","1964","1965","1966","1967","1968","1969","1970","1971","1972","1973","1974","1975","1976","1977","1978","1979","1980","1981","1982","1983","1984","1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"]

    var selectElement = d3.select("#select-country");
    countries.forEach(country => selectElement.append("option").attr("value", country).text(country));

    var selectElement2 = d3.select("#select-country2");
    countries.forEach(country => selectElement2.append("option").attr("value", country).text(country));

    var selectElement3 = d3.select("#select-year");
    years.forEach(year => selectElement3.append("option").attr("value", year).text(year));


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
                                        innerdict['Gdp Growth Rate'] = data[j][key]
                                    }
                                    // finding data related to government spending.
                                    else if(metric === 'General government final consumption expenditure (% of GDP)') {
                                        // appending to innermost dictionary.
                                        innerdict['Government Spending (% of GDP)'] = data[j][key];
                                    }
                                    // finding data related to unemployment.
                                    else if(metric === 'Unemployment, total (% of total labor force) (modeled ILO estimate)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Unemployment Rate"] = data[j][key];
                                    }
                                    // finding data related to current account.
                                    else if(metric === 'Current account balance (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Current Account (% of GDP)"] = data[j][key];
                                    }
                                    // finding data related to capital formation. 
                                    else if(metric === 'Gross capital formation (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Gross Capital Formation (% of GDP)"] = data[j][key];
                                    }
                                    else if(metric === 'Broad money (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Broad Money Supply (% of GDP)"] = data[j][key];
                                    }
                                    // finding data related to exports.
                                    else if(metric === 'Exports of goods and services (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Exports of Goods and Services (% of GDP)"] = data[j][key];
                                    }
                                    // finding data related to consumer spending % gdp.
                                    else if(metric === 'Final consumption expenditure (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Final Consumption Expenditure (% of GDP)"] = data[j][key];
                                    }
                                    // finding data related to consumer spending % gdp.
                                    else if(metric === 'Domestic credit to private sector (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Domestic Credit to Private Sector (% of GDP)"] = data[j][key];
                                    }
                                    // finding data related to savings rate % gdp.
                                    else if(metric === 'Gross savings (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict['Gross savings (% of GDP)'] = data[j][key];
                                    }
                                    // finding data related to income share of lowest 20%.
                                    else if(metric === 'Income share held by lowest 20%') {
                                        // appending toinnermost dictionary.
                                        innerdict['Income share held by lowest 20%'] = data[j][key];
                                    }
                                    // finding data related to foreign investment % gdp.
                                    else if(metric === 'Foreign direct investment, net inflows (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Foreign direct investment, net inflows (% of GDP)"] = data[j][key];
                                    }
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

        var data = compiled

        var factors = []

        for(var i = 1; i < Object.keys(data['China'][0]).length; i++) {
            factors.push(Object.keys(data['China'][0])[i])
            }
        
        results = []

        results1 = []

        for(i = 0; i < Object.keys(data['United States']).length; i++) {
            if(data['United States'][i]['year'] === '2018') {
                for(var j = 1; j < Object.values(data['United States'][i]).length; j++) {
                    results.push(Object.values(data['United States'][i])[j])
                }
            };
        };


        for(i = 0; i < Object.keys(data['China']).length; i++) {
            if(data['China'][i]['year'] === '2018') {
                for(var j = 1; j < Object.values(data['China'][i]).length; j++) {
                    results1.push(Object.values(data['China'][i])[j])
                }
            };
        };
    
        var barChart = new Chart(CHART, {
            type: 'bar',
            data: {
                labels: factors,
                datasets: [
                    {
                        label: "United States 2018",
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
                                label: "China 2018",
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
                                data: results,
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

function handlechange3() {

    // clearing the the contents (canvas element on html page) of the barChart of Chart.js as a workaround, because Chart.js tooltip is funky with dropdowns.
    document.getElementById('chartjs').innerHTML = '&nbsp;'
    // reappending the Chart.js canvas element that holds the Chart.js barchart for reason above.
    document.getElementById('chartjs').innerHTML = '<canvas id="barChart" width="600" height="200"></canvas>'

    const CHART = document.getElementById("barChart");

    var countries = ['United States', 'China', 'Korea, Rep.', 'Russian Federation', 'Brazil', 'Germany', 'India', 'Singapore', 'Japan', 'Kenya', 'Mexico', 'Panama', 'Australia', 'Netherlands', 'Norway', 'Finland', 'Sweden', 'Switzerland', 'France', 'Spain', 'United Kingdom', 'Indonesia', 'Argentina', 'South Africa', 'Colombia', 'Denmark', 'Iceland', 'United Arab Emirates', 'Saudi Arabia']
    
    var years =  ["1960","1961","1962","1963","1964","1965","1966","1967","1968","1969","1970","1971","1972","1973","1974","1975","1976","1977","1978","1979","1980","1981","1982","1983","1984","1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"]

    var selectElement = d3.select("#select-country");
    countries.forEach(country => selectElement.append("option").attr("value", country).text(country));

    var selectElement2 = d3.select("#select-country2");
    countries.forEach(country => selectElement2.append("option").attr("value", country).text(country));

    var selectElement3 = d3.select("#select-year");
    years.forEach(year => selectElement3.append("option").attr("value", year).text(year));

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
                                        innerdict['Gdp Growth Rate'] = data[j][key]
                                    }
                                    // finding data related to government spending.
                                    else if(metric === 'General government final consumption expenditure (% of GDP)') {
                                        // appending to innermost dictionary.
                                        innerdict['Government Spending (% of GDP)'] = data[j][key];
                                    }
                                    // finding data related to unemployment.
                                    else if(metric === 'Unemployment, total (% of total labor force) (modeled ILO estimate)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Unemployment Rate"] = data[j][key];
                                    }
                                    // finding data related to current account.
                                    else if(metric === 'Current account balance (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Current Account (% of GDP)"] = data[j][key];
                                    }
                                    // finding data related to capital formation. 
                                    else if(metric === 'Gross capital formation (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Gross Capital Formation (% of GDP)"] = data[j][key];
                                    }
                                    else if(metric === 'Broad money (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Broad Money Supply (% of GDP)"] = data[j][key];
                                    }
                                    // finding data related to exports.
                                    else if(metric === 'Exports of goods and services (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Exports of Goods and Services (% of GDP)"] = data[j][key];
                                    }
                                    // finding data related to consumer spending % gdp.
                                    else if(metric === 'Final consumption expenditure (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Final Consumption Expenditure (% of GDP)"] = data[j][key];
                                    }
                                    // finding data related to consumer spending % gdp.
                                    else if(metric === 'Domestic credit to private sector (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Domestic Credit to Private Sector (% of GDP)"] = data[j][key];
                                    }
                                    // finding data related to savings rate % gdp.
                                    else if(metric === 'Gross savings (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict['Gross savings (% of GDP)'] = data[j][key];
                                    }
                                    // finding data related to income share of lowest 20%.
                                    else if(metric === 'Income share held by lowest 20%') {
                                        // appending toinnermost dictionary.
                                        innerdict['Income share held by lowest 20%'] = data[j][key];
                                    }
                                    // finding data related to foreign investment % gdp.
                                    else if(metric === 'Foreign direct investment, net inflows (% of GDP)') {
                                        // appending toinnermost dictionary.
                                        innerdict["Foreign direct investment, net inflows (% of GDP)"] = data[j][key];
                                    }
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

        var inputelement3 = d3.select("#select-year")
        var inputvalue3 = inputelement3.property("value")
        
        var data = compiled

        var factors = []

        for(var i = 1; i < Object.keys(data[inputvalue][0]).length; i++) {
            factors.push(Object.keys(data[inputvalue][0])[i])
        }

        results = []

        results1 = []

        for(i = 0; i < Object.keys(data[inputvalue]).length; i++) {
            if(data[inputvalue][i]['year'] === inputvalue3) {
                for(var j = 1; j < Object.values(data[inputvalue][i]).length; j++) {
                    results.push(Object.values(data[inputvalue][i])[j])
                }
            };
        };

        for(i = 0; i < Object.keys(data[inputvalue2]).length; i++) {
            if(data[inputvalue2][i]['year'] === inputvalue3) {
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
                        label: inputvalue + inputvalue3,
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
                                label: inputvalue2 + inputvalue3,
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

var selectElement = document.querySelector("#select-country");
selectElement.addEventListener('change', handlechange3);

var selectElement2 = document.querySelector("#select-country2");
selectElement2.addEventListener('change', handlechange3);

var selectElement2 = document.querySelector("#select-year");
selectElement2.addEventListener('change', handlechange3);
    

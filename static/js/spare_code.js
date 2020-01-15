
gdp = []
government_spending = []
unemployment = []

for (var j = 0; j < data.length; j++) {
if(data[j]['data_type'] === 'GDP growth (annual %)') {
    gdp.push(data[j]);
}
if(data[j]['data_type'] === 'General government final consumption expenditure (% of GDP)') {
    government_spending.push(data[j])
}
if(data[j]['data_type'] === 'Unemployment, total (% of total labor force) (modeled ILO estimate)') {
    unemployment.push(data[j])
}
}
console.log('Gdp:', gdp)
console.log('Government_spending', government_spending)
console.log('Unemployment', unemployment)


function results(country) {
        
    var data = compiled
    var parseTime = d3.timeParse('%Y')
    return {
    
        'years': Object.values(data[country]).map(d => parseTime(d.year)),

        'gdp': Object.values(data[country]).map(d => d.gdp_growth),
        
        'unemployment': Object.values(data[country]).map(d => d.unemployment_rate),
    
        'government_spending': Object.values(data[country]).map(d => d.government_spending),
    
    };
};


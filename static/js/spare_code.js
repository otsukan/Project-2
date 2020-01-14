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
    
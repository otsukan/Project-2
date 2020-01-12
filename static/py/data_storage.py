# importing necessary modules to complete project.
from pymongo import MongoClient
import pandas as pd
import json

def updateDB(csvfile, collection_name):
     # setting up a connection to a mongodb.
    client = MongoClient('localhost', 27017)

    # creating a new database.
    mongo_db = client['economic_data_db']

    # creating a new collection within the new database.
    collection = mongo_db[collection_name]

    # reading in the csv file using pandas, skiping unnecessary rows, and naming columns by years.
    gdp_df = pd.read_csv(csvfile, skiprows=[0,4], names=["country_name", "country_abb", "data_type", "info", "1960","1961","1962","1963","1964","1965","1966","1967","1968","1969","1970","1971","1972","1973","1974","1975","1976","1977","1978","1979","1980","1981","1982","1983","1984","1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"])

    # dropping first row that contains unnecessary information.
    gdp_df = gdp_df.drop(gdp_df.index[0])

    # dropping unnecessary column.
    gdp_df = gdp_df.drop(columns=['info', '1960'])

    # setting the index of the dataframe to country name.
    gdp_df = gdp_df.set_index('country_name')

    # previewing the dataframe.
    gdp_df.head()

    # making a dataframe of a select few countries.
    gdp_df = gdp_df.loc[['United States', 'China', 'Russian Federation', 'Brazil', 'Germany', 'India', 'Singapore', 'Japan', 'Kenya', 'Mexico', 'Panama', 'Australia', 'Netherlands', 'Norway', 'Finland', 'Sweden', 'Switzerland', 'France', 'Spain', 'United Kingdom', 'Indonesia', 'Argentina', 'South Africa', 'Colombia', 'Denmark', 'Iceland', 'United Arab Emirates', 'Saudi Arabia']]

    # previewing the results from above process.
    gdp_df

    # reseting the index of the dataframe for purposes.
    gdp_df = gdp_df.reset_index()

    # turning above refined pandas dataframe into json format.
    gdp_data_json = json.loads(gdp_df.to_json(orient='records'))

    # previewing the new json dictionary of gdp data.
    gdp_data_json

    # clearing the mongodatabase.
    collection.remove()

    # adding updated information to mongodatabase.
    collection.insert(gdp_data_json)

updateDB('Resources/government_spending.csv', 'Government_Spending')


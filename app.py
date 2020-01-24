# importing the necessary modules to create a restful flask api.
from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo 
import json
from bson import json_util
from bson.json_util import dumps
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd

def updateDB(csvfiles):
   
    # setting up a connection to a mongodb.
    client = MongoClient('localhost', 27017)

    # creating a new database.
    mongo_db = client['economic_data_db']
    
    # creating a new collection within the new database.
    collection = mongo_db['worldbank_data']

    collection.remove()
    
    for csvfile in csvfiles:
        
        # reading in the csv file using pandas, skiping unnecessary rows, and naming columns by years.
        worldbank_df = pd.read_csv(f'static/Resources/{csvfile}', skiprows=[0,4], names=["country_name", "country_abb", "data_type", "info", "1960","1961","1962","1963","1964","1965","1966","1967","1968","1969","1970","1971","1972","1973","1974","1975","1976","1977","1978","1979","1980","1981","1982","1983","1984","1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"])

        # dropping first row that contains unnecessary information.
        worldbank_df = worldbank_df.drop(worldbank_df.index[0])

        # dropping unnecessary column.
        worldbank_df = worldbank_df.drop(columns=['info', '1960'])

        # setting the index of the dataframe to country name.
        worldbank_df = worldbank_df.set_index('country_name')

        # previewing the dataframe.
        worldbank_df.head()

        # making a dataframe of a select few countries.
        worldbank_df = worldbank_df.loc[['United States', 'China', 'Korea, Rep.', 'Russian Federation', 'Brazil', 'Germany', 'India', 'Singapore', 'Japan', 'Kenya', 'Mexico', 'Panama', 'Australia', 'Netherlands', 'Norway', 'Finland', 'Sweden', 'Switzerland', 'France', 'Spain', 'United Kingdom', 'Indonesia', 'Argentina', 'South Africa', 'Colombia', 'Denmark', 'Iceland', 'United Arab Emirates', 'Saudi Arabia', 'Canada', 'Luxembourg']]

        # previewing the results from above process.
        worldbank_df 

        # reseting the index of the dataframe for purposes.
        worldbank_df = worldbank_df.reset_index()

        # turning above refined pandas dataframe into json format.
        worldbank_data_json = json.loads(worldbank_df.to_json(orient='records'))

        # previewing the new json dictionary of gdp data.
        worldbank_data_json

        # adding updated information to mongodatabase.
        collection.insert_many(worldbank_data_json)
    
csvfiles = ['gdp_growth.csv', 'government_spending.csv', 'unemployment.csv', 'current_account.csv','capital_formation.csv', 'broadmoney_supply.csv', 'exports.csv', 'consumer_spending_%gdp.csv', 'private_credit.csv', 'savings_rate.csv', 'income_share_lowest_20%.csv', 'foreign_investment_%gdp.csv']       

# --------------------------------------------------------------------------------------------------------------------------
# initializing flask app.
app = Flask(__name__)
CORS(app)

# creating a mongodb connection to desired economic_data_db database.
app.config['MONGO_URI'] = 'mongodb://localhost:27017/economic_data_db'
mongo = PyMongo(app)

# creating route the will hold the mongodb json object data.
@app.route('/')

# creating function that will return mongodb data into a json object dataset.
def jsondata():
    
    updateDB(csvfiles)
    # finding the mongo data and saving to a variable.
    data = mongo.db.worldbank_data.find()
    # creating empty list to store data.
    json_data = []
    # looping through mongo data and storing it in above empty list.
    for d in data:
        json_data.append(d)
    # using the above list and applying json.dumps to complete final step to creating of json object.
    json_data = json.dumps(json_data, default=json_util.default, sort_keys=True)
    # returning the json data to route.
    return json_data

# completing the end of flask making process.
if __name__ =='__main__':
    app.run(debug=True)

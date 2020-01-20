# importing the necessary modules to create a restful flask api.
from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo 
import json
from bson import json_util
from bson.json_util import dumps
from flask_cors import CORS
import worlbank_data_function

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
    worlbank_data_function.updateDB()
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

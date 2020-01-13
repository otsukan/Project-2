from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo 
import json
from bson import json_util
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MONGO_URI'] = 'mongodb://localhost:27017/economic_data_db'
mongo = PyMongo(app)

@app.route('/')

def index():
    return render_template('index.html')
    
@app.route('/data')

def jsondata():
    data = mongo.db.worldbank_data.find()
    json_data = []
    for d in data:
        json_data.append(d)
    json_data = json.dumps(json_data, default=json_util.default)
    return json_data


if __name__ =='__main__':
    app.run(debug=True)

from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo 

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost:27017/economic_data_db'
mongo = PyMongo(app)

@app.route('/')

def index():
    data = mongo.db.worldbank_data.find()
    return render_template('index.html', data=data)


if __name__ =='__main__':
    app.run(debug=True)
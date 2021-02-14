from flask import Flask, render_template, request, send_from_directory,session
import time,datetime 
#from flask_sso import SSO
from flask_login import LoginManager
import yaml
import json
from flask.json import jsonify
import os
import subprocess
from flask_cors import CORS
import time
import logging
import sys
import paramiko
import pymongo
from pymongo import MongoClient
#import yamlordereddictloader
import random
#from bson.regex import Regex
import re 
from collections import OrderedDict

app = Flask(__name__)


app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources='/*', origins='*', allow_headers='*',expose_headers='Authorization')
hostname = 'afftserver-lnx'
port = 22
userId = ''
#app.config['SECRET_KEY'] = 'lolwa'
login_manager = LoginManager(app)
"""ext = SSO()
ext.init_app(app)
SSO_ATTRIBUTE_MAP = {
    'ADFS_LOGIN': (True, 'nickname')
}
app.config['SSO_ATTRIBUTE_MAP'] = SSO_ATTRIBUTE_MAP
session = {}"""

def dict_representer(dumper, data):
    return dumper.represent_dict(data.iteritems())

def dict_constructor(loader, node):
    return OrderedDict(loader.construct_pairs(node))

"""@SSO.login_handler
def login_callback(user_info):
    ""Store information in session.""
    session = user_info"""

@app.route("/")
def main():
    return render_template('index.html')

def execute_command(cmd):
    final_output = []
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True, close_fds=True)
    output,err = process.communicate()
    status = process.returncode
    output = output.splitlines()
    for value in output:
        final_output.append(value.decode("utf-8"))
    return final_output

@app.route("/table", methods=['POST'])
def table():
    logging.info('==========================================================================')
    finalres = {}
    finalres['values'] = []
    user_list = []
    logging.info(request.json)
    connection = pymongo.MongoClient("mongodb://satyabrd:satyabrd@studentmarksheet-shard-00-00.uqbqs.mongodb.net:27017,studentmarksheet-shard-00-01.uqbqs.mongodb.net:27017,studentmarksheet-shard-00-02.uqbqs.mongodb.net:27017/coverage?ssl=true&replicaSet=atlas-82a9p1-shard-0&authSource=admin&retryWrites=true&w=majority")
    db = connection.coverage
    col = db.collection.find()
    print(col)
    finalres.append(col)
    logging.info(finalres)
    return jsonify(finalres)

def create_query(user,time,time_val):
    logging.info("time_val is : %s"%time_val)
    logging.info("time is: %s"%time)
    if user != "All" and time != "All":
        if time == "Daily":
            return {'user' : user, 'stop_time' : time_val}
        else:
            return {'user' : user, 'stop_time' : {"$gt" : time_val}}
    elif user == "All" and time != "All":
        if time == "Daily":
            return {'stop_time' : time_val}
        else:
            return {'stop_time' : {"$gt" : time_val}}
    elif user != "All" and time == "All":
        return {'user' : user}
    else:
        return "no_query"     

if __name__ == "__main__":
    #app.run('127.0.0.1', 5002,threaded=True)
    app.secret_key = os.urandom(12)
    app.run('0.0.0.0', 5000, threaded=True)
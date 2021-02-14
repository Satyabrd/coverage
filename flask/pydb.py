import pymongo
#import zipfile 
import os
import subprocess

def execute_command(cmd):
    final_output = []
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True, close_fds=True)
    output,err = process.communicate()
    status = process.returncode
    output = output.splitlines()
    for value in output:
        final_output.append(value.decode("utf-8"))
    return final_output


myclient = pymongo.MongoClient("mongodb://satyabrd:satyabrd@studentmarksheet-shard-00-00.uqbqs.mongodb.net:27017,studentmarksheet-shard-00-01.uqbqs.mongodb.net:27017,studentmarksheet-shard-00-02.uqbqs.mongodb.net:27017/coverage?ssl=true&replicaSet=atlas-82a9p1-shard-0&authSource=admin&retryWrites=true&w=majority")
db = myclient.coverage
#Creating a database on that client
logdb = myclient["coverage"]
print(logdb)
#Creating a collection on that database
mycol = logdb["logs"]
#list of dictionaries of datas
#insert_many used to insert many accepts a list of dictionaries and x stores list of ids returned
x = logdb.collection.insert_many(log_list)
print(x.inserted_ids)
print(logdb)
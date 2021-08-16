import pymongo
import pandas as pd
import time

start = time.time()
PATH_EXTRACT = './Data/data.xlsx'
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["AutoFeedbackDB"]
mycol = mydb["click"]

myquery = {}

mydoc = mycol.find(myquery)
print(type(mydoc))
df = pd.DataFrame(list(mydoc))
del df['_id']
df.to_excel(PATH_EXTRACT)

end = time.time()
print(f"Run time is - {end - start}")
print("Data extracted to " + PATH_EXTRACT)
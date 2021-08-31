const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const HOST_NAME = '0.0.0.0'
const POST_ROUTE = '/save_data'
const GET_ROUTE = '/mongo_data'
const PORT = 5555

const app = express()
app.use(bodyParser.json());
app.use(cors())

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function insert_to_mongo(query_content) {
  MongoClient.connect(url, function (err, db) {
    if (err) return err.errmsg;
    var dbo = db.db("AutoFeedbackDB");
    dbo.collection("click").insertOne(query_content, function (err, res) {
      if (err) return err.errmsg;
      console.log("1 document inserted");
      db.close();
    });
  });
}
app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/client/index.html`))
})
app.get(GET_ROUTE, (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("AutoFeedbackDB");
    dbo.collection("click").find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
  res.sendStatus(200);
})

app.post(POST_ROUTE, (req, res) => {
  console.log(req.body);
  const error_msg = insert_to_mongo(req.body);
  if (error_msg) console.log(error_msg)
  res.sendStatus(200);
});

app.listen(PORT, HOST_NAME, () => {
  console.log(`listening at http://${HOST_NAME}:${PORT}`)
});

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

const Schema = mongoose.Schema;
const Files = new Schema({
  path: String,
  title: String,
  likes: Number,
  comments: Array
});

const MyModel = mongoose.model('Files', Files);



app.use(express.static("../template"));

app.get('/showfotos',async (req, res) => {
 const data =  await MyModel.find({});

 res.json(data);
});
app.get('/like',async (req, res) => {
  await MyModel.findOneAndUpdate({path:'/' + req.query.src.split('/').slice(3).join('/')}, {$inc : {'likes' : 1}});
  res.json({ok:"OK"});
 });

app.get('/rating',async (req, res) => {
  const file = await MyModel.findOne({path:'/' + req.query.src.split('/').slice(3).join('/')});
  file.comments.push(req.query.comment)
  file.markModified('comments')
  await file.save()
  res.json({ok:"OK"});
 });
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("Is this executed?");


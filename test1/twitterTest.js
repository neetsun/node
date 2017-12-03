var express = require('express')

//make a server
var app = express.createServer()


//make server listen to a portt
app.listen(8000)

var tweets = []

app.get('/',function(req,res){
  res.send('Welcome to Node Twitter')
})

app.post('/send',express.bodyParser(),function(req.res){
  if(req.body && req.body.tweet){ //body parser adds req.body to req
    //req.body.tweet is a property of req.body
    tweets.push(req.body.tweet)
    res.send({status:"ok",message:"Tweet received"})
  }else{
    res.send({status:"nok",message:"No tweet received"})
  }
})

app.get('/tweets',function(req,res){
  res.send(tweets)
})

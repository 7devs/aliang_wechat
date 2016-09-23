var app = require('express')(),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use
app.use('/wxapi',require('./lib/routers/wxapi.js'));

app.use('/*',function(req,res,next){
  res.status(404).send('Not Found');
});

app.listen(8003,function(err){
  console.log('listening at 8003...');
});

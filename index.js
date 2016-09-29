var app = require('express')(),
    bodyParser = require('body-parser'),
    wechat=require('./lib/wechat'),
    conf=require('./lib/config');

app.use(bodyParser.urlencoded({
    extended: false
}));

wechat(conf.wechat);

// wechat.deleteMenu(require('./lib/menu.json'));

wechat.createMenu(require('./lib/menu.json'));

app.use('/wxapi',require('./lib/routers/wxapi.js'));

app.use('/*',function(req,res,next){
  res.status(404).send('Not Found');
});

app.listen(8003,function(err){
  console.log('listening at 8003...');
});

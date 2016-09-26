var router=require('express').Router(),
    xml=require('xml'),
    xmlBodyParser=require('express-xml-bodyparser');

router.route('/')
    .post(xmlBodyParser({
      explicitArray:false
    }),function(req,res,next){
      var data=req.body.xml;
      var content=data.content,msg='回复数字1-9或汉字一至九，获得对应信息';
      if(content==='1' || content==='一'){
        msg='Never put off until tomorrow what you can do today'
      }
      if(content==='2' || content==='二'){
        msg='Never trouble another for waht you can do yourself'
      }
      if(content==='3' || content==='三'){
        msg='Never spend money before you have earned it'
      }
      if(content==='4' || content==='四'){
        msg='Never buy what you don\'t want because it is cheap'
      }
      if(content==='5' || content==='五'){
        msg='Pride costs more than hunger, thirst and cold'
      }
      if(content==='6' || content==='六'){
        msg='We seldom repent of having eaten too little'
      }
      if(content==='7' || content==='七'){
        msg='Nothing is troublesome that we do willingly'
      }
      if(content==='8' || content==='八'){
        msg='How much pain the evils cost us that never happened'
      }
      if(content==='9' || content==='九'){
        msg='Take thinkgs always by the smooth handle'
      }
      if(content==='10' || content==='十'){
        msg='When angry, count ten before you speak; if very angry, count a hundred'
      }
      res.append('Content-Type','text/xml');
      res.send(xml({
        xml:[
          {ToUserName:{_cdata:data.fromusername}},
          {FromUserName:{_cdata:data.tousername}},
          {CreateTime:+new Date()},
          {MsgType:{_cdata:'text'}},
          {Content:{_cdata:msg}}
        ]
      }));
    })
    .get(function(req,res,next){
      var str=req.query.echostr;
      res.send(str);
    });

module.exports=router;

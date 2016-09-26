var router = require('express').Router(),
    xml = require('xml'),
    xmlBodyParser = require('express-xml-bodyparser');

router.route('/')
    .post(xmlBodyParser({
        explicitArray: false
    }), function(req, res, next) {
        var data = req.body.xml;
        var content = data.content;
        var msgType = data.msgtype;
        if (msgType === 'text') {
            var msg = '回复数字1-9或汉字一至九，获得对应信息';
            if (content === '1' || content === '一') {
                msg = 'Never put off until tomorrow what you can do today'
            }
            if (content === '2' || content === '二') {
                msg = 'Never trouble another for waht you can do yourself'
            }
            if (content === '3' || content === '三') {
                msg = 'Never spend money before you have earned it'
            }
            if (content === '4' || content === '四') {
                msg = 'Never buy what you don\'t want because it is cheap'
            }
            if (content === '5' || content === '五') {
                msg = 'Pride costs more than hunger, thirst and cold'
            }
            if (content === '6' || content === '六') {
                msg = 'We seldom repent of having eaten too little'
            }
            if (content === '7' || content === '七') {
                msg = 'Nothing is troublesome that we do willingly'
            }
            if (content === '8' || content === '八') {
                msg = 'How much pain the evils cost us that never happened'
            }
            if (content === '9' || content === '九') {
                msg = 'Take thinkgs always by the smooth handle'
            }
            if (content === '10' || content === '十') {
                msg = 'When angry, count ten before you speak; if very angry, count a hundred'
            }
            res.append('Content-Type', 'text/xml');
            res.send(xml({
                xml: [{
                    ToUserName: {
                        _cdata: data.fromusername
                    }
                }, {
                    FromUserName: {
                        _cdata: data.tousername
                    }
                }, {
                    CreateTime: +new Date()
                }, {
                    MsgType: {
                        _cdata: 'text'
                    }
                }, {
                    Content: {
                        _cdata: msg
                    }
                }]
            }));
        } else if (msgType === 'image') {
            var msg = '这是一张图片';
            res.append('Content-Type', 'text/xml');
            res.send(xml({
                xml: [{
                    ToUserName: {
                        _cdata: data.fromusername
                    }
                }, {
                    FromUserName: {
                        _cdata: data.tousername
                    }
                }, {
                    CreateTime: +new Date()
                }, {
                    MsgType: {
                        _cdata: 'text'
                    }
                }, {
                    Content: {
                        _cdata: msg
                    }
                }]
            }));
        }else if(msgType==='voice'){
          var txt = data.recognition;
          var msg = '你说的是: '+txt;
          if (/一/.test(txt)) {
              msg = 'Never put off until tomorrow what you can do today'
          }
          if (/二/.test(txt)) {
              msg = 'Never trouble another for waht you can do yourself'
          }
          if (/三/.test(txt)) {
              msg = 'Never spend money before you have earned it'
          }
          if (/四/.test(txt)) {
              msg = 'Never buy what you don\'t want because it is cheap'
          }
          if (/五/.test(txt)) {
              msg = 'Pride costs more than hunger, thirst and cold'
          }
          if (/六/.test(txt)) {
              msg = 'We seldom repent of having eaten too little'
          }
          if (/七/.test(txt)) {
              msg = 'Nothing is troublesome that we do willingly'
          }
          if (/八/.test(txt)) {
              msg = 'How much pain the evils cost us that never happened'
          }
          if (/九/.test(txt)) {
              msg = 'Take thinkgs always by the smooth handle'
          }
          if (/十/.test(txt)) {
              msg = 'When angry, count ten before you speak; if very angry, count a hundred'
          }
          res.append('Content-Type', 'text/xml');
          res.send(xml({
              xml: [{
                  ToUserName: {
                      _cdata: data.fromusername
                  }
              }, {
                  FromUserName: {
                      _cdata: data.tousername
                  }
              }, {
                  CreateTime: +new Date()
              }, {
                  MsgType: {
                      _cdata: 'text'
                  }
              }, {
                  Content: {
                      _cdata: msg
                  }
              }]
          }));
        }else{
          var msg='目前只能处理文本、图片及语音信息，您发送的消息类型不在可处理的范围内';
          res.append('Content-Type', 'text/xml');
          res.send(xml({
              xml: [{
                  ToUserName: {
                      _cdata: data.fromusername
                  }
              }, {
                  FromUserName: {
                      _cdata: data.tousername
                  }
              }, {
                  CreateTime: +new Date()
              }, {
                  MsgType: {
                      _cdata: 'text'
                  }
              }, {
                  Content: {
                      _cdata: msg
                  }
              }]
          }));
        }
    })
    .get(function(req, res, next) {
        var str = req.query.echostr;
        res.send(str);
    });

module.exports = router;

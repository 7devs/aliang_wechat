var conf = require('../config'),
    wechat = require('../wechat');

module.exports = function(data) {
    var content = data.content;
    var msgType = data.msgtype;
    var txt = data.recognition;
    var reContent;
    switch (msgType) {
        case 'text':
            reContent = require('./text-parser.js')(content);
            break;
        case 'image':
            break;
        case 'voice':
            reContent = require('./voice-parser.js')(txt);
            break;
        case 'location':
            break;
        case 'shortvideo':
            break;
        case 'video':
            break;
        case 'event':
            reContent=require('./event-parser.js')(data.event,data.eventkey);
            wechat.sendByTemplate(data.fromusername, conf.wechat.template.test, {
                content: {
                    color: '#ffff00',
                    value: '测试内容'
                }
            });
            break;
        case 'link':
            break;
        default:
            reContent = '无法处理';
    }

    return reContent;
}

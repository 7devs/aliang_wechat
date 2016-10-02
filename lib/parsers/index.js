module.exports = function(data) {
    var content = data.content;
    var msgType = data.msgtype;
    var txt = data.recognition;
    var reContent='';
    switch (msgType) {
        case 'text':
            reContent = require('./text-parser.js')(content);
            break;
        case 'image':
            reContent = require('./image-parser.js')(data);
            break;
        case 'voice':
            reContent = require('./voice-parser.js')(txt);
            break;
        case 'location':
            reContent = require('./location-parser.js')(data);
            break;
        case 'shortvideo':
            reContent = '谢谢你分享的视频';
            break;
        case 'video':
            reContent = '谢谢你分享的视频';
            break;
        case 'event':
            reContent = require('./event-parser.js')(data);
            break;
        case 'link':
            reContent = require('./link-parser.js')(data);
            break;
        default:
            reContent = '信息无法处理';
    }

    return reContent;
}

module.exports = function(data,echo) {
    var content = data.content;
    var msgType = data.msgtype;
    var txt = data.recognition;
    switch (msgType) {
        case 'text':
            require('./text-parser.js')(content,echo);
            break;
        case 'image':
            require('./image-parser.js')(data,echo);
            break;
        case 'voice':
            require('./voice-parser.js')(txt,echo);
            break;
        case 'location':
            require('./location-parser.js')(data,echo);
            break;
        case 'shortvideo':
            echo('谢谢你分享的视频');
            break;
        case 'video':
            echo('谢谢你分享的视频');
            break;
        case 'event':
            require('./event-parser.js')(data,echo);
            break;
        case 'link':
            require('./link-parser.js')(data,echo);
            break;
        default:
            echo('信息无法处理');
    }

}

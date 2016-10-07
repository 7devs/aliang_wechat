module.exports = function(data,echo) {
    var content = data.content;
    var msgType = data.msgtype;
    var txt = data.recognition;
    switch (msgType) {
        case 'text':
            require('./text-parser.js')(content,echo);
            break;
        default:
            echo('信息无法处理');
    }

}

var conf = require('../config'),
    wechat = require('../wechat');

module.exports = function(data) {
    var reContent='';

    switch (data.event.toLowerCase()) {
        case 'click':
            reContent = 'have a good time';
            wechat.sendByTemplate(data.fromusername, conf.wechat.template.test, {
                content: {
                    color: '#ff0000',
                    value: '测试内容'
                }
            });
            break;
            // switch(eventKey){
            //   case 'menu11':
            //     reContent='menu11 clicked.';
            //     break;
            //   case 'munu2':
            //     reContent='menu2 clicked.';
            //     break;
            //   default:
            //     reConten='...'
            // }
        case 'view':
        case 'scancode_push':
        case 'scancode_waitmsg':
        case 'pic_syshphoto':
        case 'pic_photo_or_album':
        case 'pic_weixin':
        case 'location_select':
            reContent=data.sendlocationinfo.label;
            break;
        default:
            reContent = '事件无法处理';
    }
    return reContent;
}

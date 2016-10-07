var conf = require('../config'),
    wechat = require('../wechat');

module.exports = function(data,echo) {

    switch (data.event.toLowerCase()) {
        case 'click':
            echo('have a good time');
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
            echo(data.scancodeinfo.scanresult);
            break;
        case 'scancode_waitmsg':
            echo(data.scancodeinfo.scanresult);
            break;
        case 'pic_syshphoto':
        case 'pic_photo_or_album':
        case 'pic_weixin':
        case 'location_select':
            echo(data.sendlocationinfo.label);
            break;
        default:
            echo('事件无法处理');
    }

}

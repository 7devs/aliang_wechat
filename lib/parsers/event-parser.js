module.exports = function(event, eventKey) {
    var reContent;

    switch (event.toLowerCase()) {
        case 'click':
            reContent = 'have a good time';
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
        default:
            reContent = event;
    }
    return reContent;
}

module.exports=function(event,eventKey){
  var reContent;
  var conf=require('../config'),
      wechat=require('../wechat');
  switch(event.toLowerCase()){
    case 'click':
      switch(eventKey){
        case 'menu11':
          reContent='menu11 clicked.';
          break;
        case 'munu2':
          reContent='menu2 clicked.';
          break;
        default:
          reConten='...'
      }
    case 'view':
      reContent='have a good time';
      wechat.sendByTemplate(data.fromusername,conf.wechat.template.test,{
        content:{
          value:'测试内容',
          color:'#ffff00'
        }
      });
      break;
    case 'scancode_push':
    case 'scancode_waitmsg':
    case 'pic_syshphoto':
    case 'pic_photo_or_album':
    case 'pic_weixin':
    case 'location_select':
    default:
      reContent=event;
  }
  return reContent;
}

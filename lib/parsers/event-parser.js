module.exports=function(event,eventKey){
  var reContent;
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
    default:
      reContent=event;
  }
  return reContent;
}

//判断字串串是否为中文圣经经文索引


function isRef(ref){

  var beginwords = "创出利民申约书士路得撒列王历代以拉尼斯伯诗箴传雅歌赛耶哀结但何珥阿摩俄拿弥那鸿哈西番该亚玛马太可使徒罗哥林加弗腓帖提多门希来彼犹启";
  var otherwords = "世记纪埃及未数命书亚师得母耳上下王代志斯拉希米帖伯篇言道歌赛利哀西结以理阿珥摩司巴底拿迦鸿谷番雅基太福音可加翰徒行传马林多前后弗所立比罗撒尼门来各一二三壹贰叁大示录";
  var regex = new RegExp("^[" + beginwords + "]" + "{1}" + "[" + otherwords + "]" + "{0,6}[:0-9,-;\uff1a\u2010-\u2015\uff0d\uff0c\uff1b\u3001\\s]*[0-9]{1,3}$");
  return regex.test(ref);

}


//格式化字符串，替代中文标点，将英文分号替换为逗号

function refFormat(ref) {

    var regex1 = /\uff1a/g; //中文冒号
    var regex2 = /[\u2010-\u2015\uff0d]/g; //破折号
    var regex3 = /[;\uff0c\uff1b\u3001]/g; //逗号及分号
    var regex4 = /\s/g; //空格

    if (ref.search(regex1) !== -1) {
        ref = ref.replace(regex1, ':');
    }
    if (ref.search(regex2) !== -1) {
        ref = ref.replace(regex2, '-');
    }
    if (ref.search(regex3) !== -1) {
        ref = ref.replace(regex3, ',');
    }
    if (ref.search(regex4) !== -1) {
        ref = ref.replace(regex4, '');
    }

    return ref;
}

//“创1:1-5,10”--->[['创','1','1-5'],['创','1','10']]

function refParser(ref) {

    var i, j;
    var result = [];
    //找到第一个数字出现的位置
    for (i = 0; i < ref.length; i++) {
        if (Number.isInteger(ref[i] * 1) === true) {
            j = i;
            break;
        }
    }
    //将字符串分为书卷名及章节号；
    var bookname = ref.substr(0, j);
    var substr = ref.substring(j);
    //分解章节号
    if (substr.indexOf(':') === -1) {
        //整章
        var tmp = substr.split(',');
        for (i = 0; i < tmp.length; i++) {
            result[i]=[];
            result[i][0] = bookname;
            result[i][1] = tmp[i];
        }
    } else{
        //某章的若干节
        var regex=/^[0-9]{1,3}:[0-9]{1,3}-[0-9]{1,3}:[0-9]{1,3}$/;
        var arr = substr.split(',');
        for (i = 0; i < arr.length; i++) {
            if (arr[i].search(":") === -1) {
                result[i] = [];
                result[i][0] = bookname;
                result[i][1] = arr[i - 1].split(':')[0];
                result[i][2] = arr[i];
            } else if(regex.test(arr[i])){
              result[i]=[];
              result[i][0] = bookname;
              result[i][1] = arr[i];
            }else{
                result[i] = [];
                result[i][0] = bookname;
                result[i][1] = arr[i].split(':')[0];
                result[i][2] = arr[i].split(':')[1];
            }
        }
    }
    return result;

}

module.exports.isRef=isRef;
module.exports.refFormat=refFormat;
module.exports.refParser = refParser;

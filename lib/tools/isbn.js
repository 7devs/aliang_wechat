//ISBN号处理：判断及转换；

function isISBN(str) {
    var newstr = str;
    var isbn13regex = /^97[8-9]{1}[0-9]{10}$/;
    var isbn10regex = /^[0-9]{9}[0-9X]$/;
    if (isbn13regex.test(newstr) === true) {
        var lastchar = newstr[12];
        var sum = 0;
        for (var i = 0; i < newstr.length - 1; i++) {
            if ((i + 1) % 2 === 1) {
                sum += parseInt(newstr[i], 10);
            } else {
                sum += parseInt(newstr[i], 10) * 3;
            }
        }
        var checknumber = 10 - sum % 10;
        if (checknumber.toString() === lastchar) {
            return true;
        } else {
            return false;
        }
    } else if (isbn10regex.test(newstr) === true) {
        var lastchar = newstr[9];
        var sum = 0;
        for (var i = 0; i < newstr.length - 1; i++) {
            var arr = [10, 9, 8, 7, 6, 5, 4, 3, 2];
            sum += parseInt(newstr[i], 10) * arr[i];
        }
        var checknumber = 11 - sum % 11;
        if (checknumber < 10 && checknumber.toString() === lastchar) {
            return true;
        } else if (checknumber === 10 && lastchar === 'X') {
            return true;
        } else if (checknumber === 11 && lastchar === '0') {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function isbn13to10(str) {
    //ISBN13编码为13位数字，前3位是978或979，最后一位为校验码；
    //ISBN10编码为10位数字，最后一位为检验码;
    //ISBN10的校验位可能是X，ISBN13的校验位为数字；
    //979的书号将在978的书号用完时启用,2007年1月1日之后出版的书ISBN号均为13位数字.
    //只能将978开头的ISBN号转为10位ISBN；
    var newstr = '';
    if (str.indexOf('-') !== -1) {
        newstr = str.split('-').join('');
    } else {
        newstr = str;
    }
    var isbnregex = /^978[0-9]{10}$/;

    if (isbnregex.test(newstr) === true) {
        var isbnlong = newstr;
    } else {
        return str + ' not a ISBN Number';
    }
    var sum = 0;
    //使用中间9位数字求和；
    for (var i = 3; i < 12; i++) {
        var num = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        sum += parseInt(isbnlong[i], 10) * num[i - 3];
    }
    var remainder = sum % 11;
    var check = 11 - remainder;
    var isbnshort = '';
    if (check < 10) {
        isbnshort = isbnlong.substring(3, 12) + check;
    } else if (check === 10) {
        isbnshort = isbnlong.substring(3, 12) + 'X';
    } else {
        isbnshort = isbnlong.substring(3, 12) + '0';
    }
    //若输入的ISBN号中有连字符'-',以下代码可按原格式返回；
    // if (str[3] !== '-') {
    //     if (check < 10) {
    //         isbnshort = isbnlong.substring(3, 12) + check;
    //     } else {
    //         isbnshort = isbnlong.substring(3, 12) + 'X';
    //     } else {
    //         if (check < 10) {
    //             isbnshort = isbnlong.substring(4, 12) + check;
    //         } else {
    //             isbnshort = isbnlong.substring(4, 12) + 'X';
    //         }
    //     }
    // }
    return isbnshort;
}

function isbn10to13(str) {
    //先去掉连字符
    var newstr = '';
    if (str.indexOf('-') !== -1) {
        newstr = str.split('-').join('');
    } else {
        newstr = str;
    }
    var isbnregex = /^[0-9]{9}[0-9X]{1}$/;

    if (isbnregex.test(newstr) === true) {
        var isbnshort = newstr;
    } else {
        return str + ' not a ISBN Number';
    }
    var sum = 0;
    //10位的ISBN号转为13位的ISBN号在前面加978并重新计算校验位即可；
    //因为只有在启用13位的ISBN号之前才有10位的ISBN号
    var tempstr = '978' + isbnshort.substring(0, 9);
    for (var i = 0; i < 12; i++) {
        //检验规则，从第1位至第12位，奇数位数码乘1，偶数位数码乘3；
        if ((i + 1) % 2 === 1) {
            sum += parseInt(tempstr[i], 10);
        } else {
            sum += parseInt(tempstr[i], 10) * 3;
        }
    }
    var remainder = sum % 10;
    var check = 10 - remainder;
    var isbnlong = tempstr + check;
    //如果输入的ISBN号中有连字符'-'，以下代码可按原格式返回新的书号；
    //var isbnlong='978-'+str.substring(0,str.length-1)+check;
    return isbnlong;
}

module.exports.isISBN = isISBN;
module.exports.isbn13to10 = isbn13to10;
module.exports.isbn10to13 = isbn10to13;

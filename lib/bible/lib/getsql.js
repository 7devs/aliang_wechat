var books = require('../static/books.js');

function getSql(arr) {
    //arr数组，
    var name = arr[0][0];
    var bookId = books[name];
    var bibleVer = 'CUV';
    var i, chapterId, verseId, begin, end, sqlArr = [];
    for (i = 0; i < arr.length; i++) {
        if (arr[i].length === 2) {
            //单章情况，[['创'，1]]
            if (arr[i][1].indexOf('-') === -1) {
                chapterId = parseInt(arr[i][1], 10);
                begin = bookId * 1000 * 1000 + chapterId * 1000;
                end = bookId * 1000 * 1000 + (chapterId + 1) * 1000;
                var sql = "select BookName,ChapterSN,VerseSN,Lection from " + bibleVer + " where IndexSN>" + begin + " and IndexSN<" + end;
                sqlArr.push(sql);
                //经节内容跨章，如[['创'，'1:31-2:3']]
            } else if (arr[i][1].indexOf(':') !== -1) {
                var tmp = arr[i][1].split('-');
                begin = bookId * 1000 * 1000 + parseInt(tmp[0].split(':')[0], 10) * 1000 + parseInt(tmp[0].split(':')[1], 10);
                end = bookId * 1000 * 1000 + parseInt(tmp[1].split(':')[0], 10) * 1000 + parseInt(tmp[1].split(':')[1], 10);
                var sql = "select BookName,ChapterSN,VerseSN,Lection from " + bibleVer + " where IndexSN>=" + begin + " and IndexSN<=" + end;
                sqlArr.push(sql);
            } else {
                //多章，如[['创','1-3']];
                var tmp = arr[i][1].split('-');
                begin = bookId * 1000 * 1000 + parseInt(tmp[0], 10) * 1000;
                end = bookId * 1000 * 1000 + (parseInt(tmp[1], 10) + 1) * 1000;
                var sql = "select BookName,ChapterSN,VerseSN,Lection from " + bibleVer + " where IndexSN>" + begin + " and IndexSN<" + end;
                sqlArr.push(sql);
            }
        } else {
            //引用中含节号并节号为一个范围
            if (arr[i][2].indexOf('-') !== -1) {
                chapterId = parseInt(arr[i][1], 10);
                begin = bookId * 1000 * 1000 + chapterId * 1000 + parseInt(arr[i][2].split('-')[0], 10);
                end = bookId * 1000 * 1000 + chapterId * 1000 + parseInt(arr[i][2].split('-')[1], 10);
                var sql = "select BookName,ChapterSN,VerseSN,Lection from " + bibleVer + " where IndexSN>=" + begin + " and IndexSN<=" + end;
                sqlArr.push(sql);
            } else {
                //单节
                chapterId = parseInt(arr[i][1], 10);
                verseId = parseInt(arr[i][2], 10);
                var idx = bookId * 1000 * 1000 + chapterId * 1000 + verseId;
                var sql = "select BookName,ChapterSN,VerseSN,Lection from " + bibleVer + " where IndexSN=" + idx;
                sqlArr.push(sql);
            }
        }
    }
    
    return sqlArr;
}

exports.getSql = getSql;

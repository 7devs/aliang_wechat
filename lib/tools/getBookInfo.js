//调用豆瓣API获取图书信息
var request = require('request');
    // rp = require('request-promise');

// function getBookInfo(isbn) {
//     var bookInfo='';
//     var bookurl = "http://api.douban.com/v2/book/isbn/" + isbn;
//     // request(bookurl, function(err, res, body) {
//     rp(bookurl)
//         .then(function(res) {
//             var title = JSON.parse(res).title;
//             var author = JSON.parse(res).author[0];
//             var pubdate = JSON.parse(res).pubdate;
//             var publisher = JSON.parse(res).publisher;
//             var price = JSON.parse(res).price;
//             var pages = JSON.parse(res).pages;
//             bookInfo = "书名：" + title + '\n' + "作者：" + author + '\n' + "出版时间：" + pubdate + '\n' + "出版社：" + publisher + '\n' + "定价：" + price + '\n' + "页数：" + pages + "页";
//         })
//         .catch(function(err) {
//             console.log(err);
//         });
//       console.log('info is:',bookInfo);
// }

// function getBookInfo(isbn) {
//
//     var info='test';
//     var bookurl = "http://api.douban.com/v2/book/isbn/" + isbn;
//     new Promise((resolve, reject) => {
//         request(bookurl, (err, res, body) => {
//             if (!err && res.statusCode === 200) {
//                 // console.log(body);
//                 var title = JSON.parse(body).title;
//                 var author = JSON.parse(body).author[0];
//                 var pubdate = JSON.parse(body).pubdate;
//                 var publisher = JSON.parse(body).publisher;
//                 var price = JSON.parse(body).price;
//                 var pages = JSON.parse(body).pages;
//                 var bookInfo = "书名：" + title + '\n' + "作者：" + author + '\n' + "出版时间：" + pubdate + '\n' + "出版社：" + publisher + '\n' + "定价：" + price + '\n' + "页数：" + pages + "页";
//                 resolve(bookInfo);
//             } else {
//                 reject(err);
//             }
//         });
//     }).then(result => {
//         info = result;
//         console.log('bookinfo:'+info);
//     }).catch(err => {
//         console.log(err);
//     })
//     return info;
// }


function getBookInfo(isbn,callback) {
    var bookurl = "http://api.douban.com/v2/book/isbn/" + isbn;
      request.get(bookurl, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            // console.log(body);
            var title = JSON.parse(body).title;
            var author = JSON.parse(body).author[0];
            var pubdate = JSON.parse(body).pubdate;
            var publisher = JSON.parse(body).publisher;
            var price = JSON.parse(body).price;
            var pages = JSON.parse(body).pages;
            var bookInfo = "书名：" + title + '\n' + "作者：" + author + '\n' + "出版时间：" + pubdate + '\n' + "出版社：" + publisher + '\n' + "定价：" + price + '\n' + "页数：" + pages + "页";

        }
        callback(err,bookInfo);
    });
}



module.exports.getBookInfo = getBookInfo;

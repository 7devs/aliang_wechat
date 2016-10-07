var bibleRef = require('./lib/bibleref');
var getsql = require('./lib/getsql');
var sqlite3 = require('sqlite3').verbose();
var myasync=require('async');

function getVerses(txt,callback){
    if (bibleRef.isRef(txt) === true) {
        var ref = bibleRef.refFormat(txt);
        var tmp = bibleRef.refParser(ref);
        var sqls = getsql.getSql(tmp);
        myasync.map(sqls,getScriptures,function(err,result){
          var res='';
          for(var i=0;i<result.length;i++){
            res +=result[i];
          }
          // console.log(res);
          callback(err,res);
        });

    } else {
        callback(err,null);
        // console.log('error');
    }
}

function getScriptures(sql,callback){
  var path=require('path');
  var db = new sqlite3.Database(path.join(__dirname, '.', 'static', 'bible.db'));
  db.all(sql, function(err, data) {
      var scriptures = '';
      if (data.length > 1) {
          for (var j = 0; j < data.length; j++) {
              scriptures += data[j].VerseSN + " " + data[j].Lection;
          }
      } else {
          scriptures += data[0].ChapterSN + ":" + data[0].VerseSN + " " + data[0].Lection;
      }
      callback(err,scriptures);
  });
  db.close();
}

module.exports.getVerses=getVerses;

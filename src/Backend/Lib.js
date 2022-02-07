
const data ={
    videoDuration : function (duration){
                       var _$hour = parseInt((duration) / 3600);
                     if (_$hour<10) { _$hour = "0" + _$hour;}
                     var _$minute = parseInt((duration % 3600) / 60);
                     if (_$minute<10) {_$minute = "0" + _$minute;}
                     var _$second = Math.ceil(duration % 60);
                     if (_$second<10) {_$second = "0" + _$second;}
                     var _$filetime = _$hour + ":" + _$minute + ":" + _$second;
                     return _$filetime;
                 },
    convertTime:  function (time){  
                  const d = new Date(time);
                 const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",                        "November", "December"];
                  const output = d.getDate() + '/'+months[d.getMonth()] +'/'+ d.getFullYear()
                   return output;
                    },
   getTimeinMilli: function(){
                    var d = new Date();
                    return  d.getTime();
                          },
           random : function(val) {return Math.floor((Math.random() * val)+1)}   ,       
          durationVideo :  function(milli) {
                            var ms = milli;
                           var d = new Date(1000*Math.round(ms/1000)); // round to nearest second
                                  function padi(i) { return ('0'+i).slice(-2); }
                         var str = d.getUTCHours() + ':' + padi(d.getUTCMinutes()) + ':' + padi(d.getUTCSeconds());
                              return str
                                 },     
           getTime :  function(date) {
                     var hours = date.getHours();
                     var minutes = date.getMinutes();
                     var ampm = hours >= 12 ? 'PM' : 'AM';
                      hours = hours % 12;
                     hours = hours ? hours : 12;
                      minutes = minutes < 10 ? '0' + minutes : minutes;
                      var strTime = hours + ':' + minutes + ' ' + ampm;
                      return strTime;
                          } ,             
              isImage :function (type) {
  
                  switch (type.toLowerCase()) {
                   case 'jpg':
                    case 'gif':
                   case 'bmp':
                    case 'jpeg':
                     case 'png':
       
                     return true;
                    }
                   return false;
                         },
 
           isVideo :function (type) {
              const name = type.toLowerCase();
            if(name.includes("m4v") || name.includes("avi") || name.includes("mpg") || name.includes("mp4") ){
                  return true;
                }
              return false;
                    }       ,
                    isAudio :function (type) {
              switch (type.toLowerCase()) {
              case 'rec':
             case '3ga':
             case 'wav':
             case 'mp3':
             case 'ogg':
             case 'm4a':
               // etc
               return true;
               }
              return false;
                    } ,
                    fileSize :  function (size) {
                        var i = Math.floor(Math.log(size) / Math.log(1024));
                        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
                    }             
 }
 export default data;
 
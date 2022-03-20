const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
var tag = "chat_app_function_log"
exports.makeUppercase = functions.database.ref('/messages/deb_pan/{pushId}')
    .onCreate((snapshot, context) => {
        var incoming = snapshot.val()
        var incomingType = typeof incoming
        if(incomingType !== 'object'){
            functions.logger.log(tag, `Object expected but ${incomingType} found`)
            return false
        }
        if(!incoming.hasOwnProperty("arrivedServerAt")){
            functions.logger.log(tag, `Field:arrivedServerAt not found`)
            return false
        }
        var timestamp = utcTimestamp()
        //incoming.arrivedServerAt = timestamp
        return snapshot.ref.parent.child(context.params.pushId+"/arrivedServerAt").set(timestamp);
    });

function utcTimestamp(){
    var x = new Date()
    return x.getTime() + x.getTimezoneOffset()*60*1000;
}

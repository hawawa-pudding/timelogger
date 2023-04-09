addMessage=(function(json) {
    for (var i in json) {
        var v = json[i];
        var bgcolor = '';
        if (v.to_user == '霊界') {
            bgcolor = 'gray';
            v.color = 'white';
        } else if (v.to_user == '人狼') {
            //bgcolor = 'black';
            v.color = 'red';
        }
        if (isNgWatcher()) {
            if (v.job=='観戦者') { 
               continue;
            }
        }
        var text = '<div style="background-color:'+bgcolor+'"><span style="">'
         + v.from_user;
        if (v.to_user != 'ALL') {
            text = text + "→" + v.to_user;
        }
        text = text + '</span><span title="' + v.created + '" class="" style="color:' + v.color + '">'
        text = text + ": " + v.message + "</span></div>";
        $('#message').append(text);
    }
})
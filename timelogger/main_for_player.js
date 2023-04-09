g_last_id=0;
addMessage=(function(json, isNew=true) {
    var update_players = false;

    for (var i in json) {
        var v = json[i];
        if (!v) {
            continue;
        }
        if (v.id <= g_last_id) {
            continue;
        }
        g_last_id = v.id;

        // 観戦者コメント非表示設定時
        if ($.cookie('ignoreAudience')) {
            for (var p in g_players) {
                if (v.name == g_players[p].name && g_players[p].job == '観戦者') {
                    console.log('観戦者コメントのため非表示');
                    continue;
                }
            }
        }

        var bgcolor = '';
        if (v.from_user == '鯖') {
            update_players = true;
            //v.from_user = '';
        }
        if (v.to_user == '霊界') {
            bgcolor = 'gray';
            v.color = 'white';
        } else if (v.to_user == '人狼') {
            //bgcolor = 'black';
            v.color = 'red';
        }

        var text = '<div style="background-color:'+bgcolor+'"><span style="">'
         + v.from_user;
        if (v.to_user != 'ALL') {
            text = text + "→" + v.to_user;
        }

        text = text + '</span><span title="' + v.created + '" class="" style="color:' + v.color + '">'
        text = text + ": " + v.message + "</span></div>";

        $('#message').prepend(text);
        console.log('a message is add');
        // 更新条件
        if (isNew && v.from_iser=='鯖') { 
            if ( text.indexOf('【投票結果】') != -1 || text.indexOf('延長しました') != -1) {
                reload();
            }
        }
    }
    if (isNew && update_players) {
        updatePlayers();
    }
})

$(document).ready( function() {
    // 初期設定
    $.ajaxSetup({timeout:2000});
    // メッセージ枠の高さをブラウザの画面にあわせて変更
    //var c_width = $('html').prop('clientWidth');
    fitWindowSize();
    window.onresize = function() {
        fitWindowSize();
    };
    $('#message').css('font-size', isMobile() ? 'x-small' : 'small')
    updatePlayers();
    // BGM設定
    $('#sound-toggle-button').toggleButtons('setState', $.cookie('PLAY_SOUND')==1 ? true : false);
    $('#sound-toggle-button').toggleButtons({
    onChange: function ($el, status, e) {
        updateCookie('PLAY_SOUND', status ? 1 : 0);
        app(status?'volumeOn':'volumeOff');
    }
    });
    // 観戦者コメント非表示設定
    $('#ignoreAudience-toggle-button').toggleButtons({
    onChange: function ($el, status, e) {
        if ($.cookie('ignoreAudience') != status) {
            location.href='/m/player.php?ignoreAudience=' + (status ? 1 : 0);
            $.cookie('ignoreAudience', status ? 1 : 0, {expires: 3650});
        }
    }
    });
    $('#ignoreAudience-toggle-button').toggleButtons('setState', $.cookie('ignoreAudience')==1 ? true : false);
    // 発言ボックス
    $('#message_input').val($.cookie('message_input'));
    $("#message_input").keyup(function() {
        $.cookie('message_input', $(this).val());
    });
    $("#message_input").change(function() {
        $.cookie('message_input', $(this).val());
    });
    $('#message_multi_input').val($.cookie('message_multi_input'));
    $("#message_multi_input").keyup(function() {
        $.cookie('message_multi_input', $(this).val());
    });
    
    // メモ
    $('#memo_input').val($.cookie('memo_input'));
    $("#memo_input").keyup(function() {
        $.cookie('memo_input', $(this).val());
    });

    playSound('night.mp3');
    g_message_json=getLocalMessage();
    g_last_id = 0;

    if (g_message_json) {
        addMessage(g_message_json, false);
    }
    pollingNewMessage();    
});


g_last_id=0;
addMessage=(function(json, isNew=true) {
    var update_players = false;
    for (var i in json) {
        const messElement = document.querySelector("#message");
        while (messElement.firstChild) {
            messElement.removeChild(element.firstChild);
        }

        var v = json[i];
        if (!v) {
            continue;
        };

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

// // プレイヤー一覧更新
// updatePlayers=(function() {
//     $.ajax({ type: "GET",
//         url: '/m/api/',
//         data: {mode:'players'},
//         dataType: 'json'
//     }).done(function(data, status, xhr) {
//         //$.getJSON('/m/api/?mode=players', function(data) {
//         var players = data.players;
//         var player = data.player;
//         var room = data.room;
//         var html = "";
//         if (!players) {
//             return;//サーバーエラーなどの場合は更新しない
//         }
//         if (g_room && room.scene != g_room.scene) {
//             // reload();
//         }
//         g_room = room;
//         g_players = players;
//         var player_num = 0;

//                 for (var i in players) {
//             var c = players[i];
//             html += '<tr><td>';
//             if (c.is_cpu == 1) {
//                 html += '<span class="label label-info">CPU</span>';
//             }
//             html += '<span style="';
//             if (c.alive != 1) {
//                 html += 'color:red';
//             }

//             // プレイヤー名タップ時
//             html += '" data-toggle="modal" onclick="confirmDialog' + "('トリップ：" + ((c.trip && c.trip_open==1) ? c.trip : '非公開') + '<br />';
// 	    html += "','情報','/m/player.php')";
            
            
//             html += '">' + c.name;
//             if (c.global_name && c.global_name != c.name){
//                 html += '(' + c.global_name + ')';
//             }
//             html += '</span></td><td>';
//             //html += '">' + c.name + '</span></td><td>';
//             if (c.job=='観戦者') {
//                 html += '観戦者';
//             } else {
//                 player_num++;
//                 html += c.alive == 1 ? '生' : '死';
//             }
//             // GMならキックボタンをつける
//             if (room.gm == player.name && c.name != player.name && c.name != '初日犠牲者') {
//                 //html += '<a href="/m/player.php?kick=' + c.id + '&name='+c.name+'" title="部屋からキックする"><i class="icon-minus-sign icon-red"></i></a>';
//                 html += '<a title="部屋からキックする" onclick="confirmDialog(\'' + c.name + 'さんを部屋からキックしますか?\',\'確認\',\'/m/player.php?kick=' + c.id + '&name=' + c.name + '\')"><i class="icon-minus-sign icon-red"></i></a>';

//             }

            
// //html += '<span data-toggle="modal" onclick="confirmDialog' + "('トリップ：" + (c.trip_open ? c.trip : '非公開') + '<br />';
// //html += '<a href=\'/m/player.php?kick=' + c.name + '\'><i class="icon-minus-sign icon-red"></i>部屋からキック</a><br />';
// //html += "','情報','/m/player.php')" + '">i</span>';
//        /*
//         役職表示条件
//         ・プレイヤーが死者　かつ　観戦者ではない
//         ・ゲーム終了
//         ・相手が人狼　　かつ　（プレイヤーが人狼または狂信者）
//         ・相手が妖狐　　かつ　（プレイヤーが妖狐または背徳者）
//         ・相手が恋人　かつ　プレイヤーが恋人
//         ・相手が共有者　かつ　プレイヤーが共有者
//         */
//             if ((!player.alive && player.job != '観戦者')
//               || (room.scene == '開始前' || room.scene == '終了')
//               || (c.job=='人狼' && (player.job=='人狼' || player.job=='狂信者') )
//               || (c.job=='妖狐' && (player.job=='妖狐' || player.job=='背徳者') )
//               || (c.job=='恋人' && player.job=='恋人')
//               || (c.job=='共有者' && player.job=='共有者') ) {
//                 html += '(' + c.job + ')';
//             }
//             // 非アクティブならマークを表示
//             if (!c.is_active) {
//                 html += ' <span style="color:red"><i class="icon-ban-circle icon-red" title="切断中' + (c.last_access ? (' [' + c.last_access  + ']') : '') + '"></i></span>';
//             } else {
//                 html += ' <span style="color:green"><i class="icon-signal" title="通信中 [' + c.last_access+ ']"></i></span>';
//             }
//             if (c.rule_ok) {
//                 html += ' <span class="label label-info">同意</span>';
//             }
//             html += '</td></tr>';
//         }
//         html += '</tbody></table>';
//         html += '<div>【役職設定】' + room.jobSettingText + '<br />【村人】' + player_num + '人';
//         if (room.is_onenight == 1) {
//             html += '<br /><span class="label label-info" style="margin:4px">ワンナイト</span><br />';
//         }
//         if (room.scene == '開始前' && room.gm == player.name) {
//             //html += '　<a href="/m/player.php?addCpu=1" class="btn">CPUを追加</a>';
//         }
//         html += '</div>';
//         html = '<table width="90%" class="table table-striped table-bordered tbl" cellspacing="0" cellpadding="0" border="0"><tbody><tr><th class="jetstrap-selected">名前(' + player_num + '人)</th><th>状態</th></tr>' + html;
//         $('#all_players').html(html);
//     //});
//     }).fail(function(xhr, status, error) {
//         //console.log('NG mode=players', xhr, xhr.status, xhr.statusText, status, error);
//     });
// });
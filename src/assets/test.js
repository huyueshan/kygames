websocket发送init //房间初始化
{
  "type": 1,
  "data": {
    "info": {
      "name": "体验房",
      "id": 1,
      "dizhu": 1,
      "player_numb": 4,
      "status": 1
    },
    "game_data": {
      "players": [{
        "name": "111",
        "id": "",
        "face": 0,
        "balance": 0,
        "gender": 0,
        "qz_times": 0,
        "xz_times": 0,
        "pkps": null,
        "pkp_type": 0,
        "result": 0,
        "doubling": 0,
        "remark": ""
      }, {
        "name": "222",
        "id": "",
        "face": 0,
        "balance": 0,
        "gender": 0,
        "qz_times": 0,
        "xz_times": 0,
        "pkps": null,
        "pkp_type": 0,
        "result": 0,
        "doubling": 0,
        "remark": ""
      }, {
        "name": "333",
        "id": "",
        "face": 0,
        "balance": 0,
        "gender": 0,
        "qz_times": 0,
        "xz_times": 0,
        "pkps": null,
        "pkp_type": 0,
        "result": 0,
        "doubling": 0,
        "remark": ""
      }, {
        "name": "444",
        "id": "",
        "face": 0,
        "balance": 0,
        "gender": 0,
        "qz_times": 0,
        "xz_times": 0,
        "pkps": null,
        "pkp_type": 0,
        "result": 0,
        "doubling": 0,
        "remark": ""
      }],
      "qzhuang_players": null,
      "play_zhuang": 0,
      "zhuang_win_lose": 0
    }
  },
  "time": 1552528274,
  "gmt": "CST",
  "offset": 28800
}

websocket发送compete //抢庄
{
  "type": 2,
  "data": {
    "players": [{
      "name": "111",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 0,
      "pkps": null,
      "pkp_type": 0,
      "result": 0,
      "doubling": 0,
      "remark": ""
    }, {
      "name": "222",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 0,
      "pkps": null,
      "pkp_type": 0,
      "result": 0,
      "doubling": 0,
      "remark": ""
    }, {
      "name": "333",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 0,
      "pkps": null,
      "pkp_type": 0,
      "result": 0,
      "doubling": 0,
      "remark": ""
    }, {
      "name": "444",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 0,
      "pkps": null,
      "pkp_type": 0,
      "result": 0,
      "doubling": 0,
      "remark": ""
    }],
    "qzhuang_players": null,
    "play_zhuang": 3,
    "zhuang_win_lose": 0
  },
  "time": 1552528279,
  "gmt": "CST",
  "offset": 28800
}
q
websocket发送redouble //加倍
{
  "type": 3,
  "data": {
    "players": [{
      "name": "222",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 8,
      "pkps": null,
      "pkp_type": 0,
      "result": 0,
      "doubling": 0,
      "remark": ""
    }],
    "qzhuang_players": null,
    "play_zhuang": 0,
    "zhuang_win_lose": 0
  },
  "time": 1552528284,
  "gmt": "CST",
  "offset": 28800
}

websocket发送deal //发牌
{
  "type": 4,
  "data": {
    "players": [{
      "name": "111",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 1,
      "pkps": ["08b", "03b", "05c", "05a", "13a"],
      "pkp_type": 1,
      "result": 0,
      "doubling": 0,
      "remark": "♣8♣3♥5♦5♦K 牛1"
    }],
    "qzhuang_players": null,
    "play_zhuang": 0,
    "zhuang_win_lose": 0
  },
  "time": 1552528290,
  "gmt": "CST",
  "offset": 28800
}

websocket发送show //摊牌
{
  "type": 5,
  "data": {
    "players": [{
      "name": "111",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 1,
      "pkps": ["08b", "03b", "05c", "05a", "13a"],
      "pkp_type": 1,
      "result": 0,
      "doubling": 0,
      "remark": "♣8♣3♥5♦5♦K 牛1"
    }, {
      "name": "222",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 8,
      "pkps": ["06d", "08d", "05b", "03c", "12b"],
      "pkp_type": 0,
      "result": 0,
      "doubling": 0,
      "remark": "♠6♠8♣5♥3♣Q 无牛"
    }, {
      "name": "333",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 6,
      "pkps": ["01c", "07b", "11b", "03a", "07d"],
      "pkp_type": 8,
      "result": 0,
      "doubling": 0,
      "remark": "♥A♣7♣J♦3♠7 牛8"
    }, {
      "name": "444",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 1,
      "pkps": ["04d", "04c", "06b", "11d", "13b"],
      "pkp_type": 4,
      "result": 0,
      "doubling": 0,
      "remark": "♠4♥4♣6♠J♣K 牛4"
    }],
    "qzhuang_players": null,
    "play_zhuang": 3,
    "zhuang_win_lose": 0
  },
  "time": 1552528295,
  "gmt": "CST",
  "offset": 28800
}

websocket发送settle //结算
{
  "type": 6,
  "data": {
    "players": [{
      "name": "111",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 1,
      "pkps": ["08b", "03b", "05c", "05a", "13a"],
      "pkp_type": 1,
      "result": -1,
      "doubling": 0,
      "remark": "♣8♣3♥5♦5♦K 牛1"
    }, {
      "name": "222",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 8,
      "pkps": ["06d", "08d", "05b", "03c", "12b"],
      "pkp_type": 0,
      "result": -8,
      "doubling": 0,
      "remark": "♠6♠8♣5♥3♣Q 无牛"
    }, {
      "name": "333",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 6,
      "pkps": ["01c", "07b", "11b", "03a", "07d"],
      "pkp_type": 8,
      "result": 12,
      "doubling": 0,
      "remark": "♥A♣7♣J♦3♠7 牛8"
    }, {
      "name": "444",
      "id": "",
      "face": 0,
      "balance": 0,
      "gender": 0,
      "qz_times": 0,
      "xz_times": 1,
      "pkps": ["04d", "04c", "06b", "11d", "13b"],
      "pkp_type": 4,
      "result": 3,
      "doubling": 0,
      "remark": "♠4♥4♣6♠J♣K 牛4"
    }],
    "qzhuang_players": null,
    "play_zhuang": 3,
    "zhuang_win_lose": 0
  },
  "time": 1552528295,
  "gmt": "CST",
  "offset": 28800
}

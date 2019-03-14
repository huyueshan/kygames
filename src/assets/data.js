// 房间 数据
room_name = {
  name: "体验房", // 房间名称
  id: "001", // 房间ID
  dizhu: 1, // 房间底注
  player_numb: 0 // 房间人数
}


// 牛牛游戏中数据字段
game_data = {
  players: {
    '0': {
      name: "", // 玩家昵称
      id: "", // 玩家ID 如“0000”
      face: 0, // 显示玩家的头像,目前定义0~9  10张用户头像
      balance: 0, // 玩家余额
      gender: 1, // 玩家性别 0：女 1：男
      qz_times: -1, // 抢庄倍数 初始-1
      xz_times: -1, // 下注倍数 初始-1
      pkps: [], //玩家拿到的牌 如：["01a", "01b", "01c", "01d", "02a"]
      pkp_type: 0, // 拿到的牌型 0：没牛， 1~9：牛1~9，10：普通牛牛， 11：五小牛， 12：四花牛，13：五花牛，14：四炸
      result: 0, // 本局结算输赢
      doubling: 1 // 当前游戏玩家的倍率
    },
    '1': {
      name: "",
      id: "",
      face: 0,
      balance: 0,
      gender: 0,
      qz_times: -1,
      xz_times: -1,
      pkps: [],
      pkp_type: 0,
      result: 0,
      doubling: 1
    },
    '2': {
      name: "",
      id: "",
      face: 0,
      balance: 0,
      gender: 0,
      qz_times: -1,
      xz_times: -1,
      pkps: [],
      pkp_type: 0,
      result: 0,
      doubling: 1
    },
    '3': {
      name: "",
      id: "",
      face: 0,
      balance: 0,
      gender: 1,
      qz_times: -1,
      xz_times: -1,
      pkps: [],
      pkp_type: 0,
      result: 0,
      doubling: 1
    },
  },
  qzhuang_palyers: [], // 当前抢庄倍率最高的玩家集合 由players对象 键名 组成的数组
  play_zhuang: '', // 本轮游戏庄家 由players对象 键名 '0'~'3'
  zhuang_win_lose: 0, // 当前游戏庄家通杀通赢状态:0：默认无状态 1：庄家通输， 2：庄家通赢
};


pkp_data = ["01a", "01b", "01c", "01d", "02a", "02b", "02c", "02d", "03a", "03b", "03c", "03d", "04a", "04b", "04c", "04d", "05a", "05b", "05c", "05d", "06a", "06b", "06c", "06d", "07a", "07b", "07c", "07d", "08a", "08b", "08c", "08d", "09a", "09b", "09c", "09d", "10a", "10b", "10c", "10d", "11a", "11b", "11c", "11d", "12a", "12b", "12c", "12d", "13a", "13b", "13c", "13d", "16a", "16b", "back"]

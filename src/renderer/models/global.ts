export default {
  namespace:'global',
  state: { //todo 拆分成多个model
    sessionList: [
      {
        name: '用户用户用户用户用户用户用户',
        msg: '这是消息这是消息这是消息这是消息这是消息',
        time: '05:00',
        img: require('@/assets/default_user_img.png'),
        id: 0,
      }, {
        name: '用户',
        msg: '这是消息',
        time: '05:00',
        img: '',
        id: 1,
      }, {
        name: '用户',
        msg: '这是消息',
        time: '05:00',
        img: '',
        id: 2,
      }, {
        name: '用户',
        msg: '这是消息',
        time: '05:00',
        img: '',
        id: 3,
      },
    ],
    recentList: [
      {
        name: '快优易店铺',
        users: [
          {
            name: '用户用户用户用户用户用户用户',
            msg: '这是消息这是消息这是消息这是消息这是消息',
            time: '05:00',
            img: require('@/assets/default_user_img.png'),
            id:4
          }, {
            name: '用户',
            msg: '这是消息',
            time: '05:00',
            img: '',
            id:5
          }
        ],
      }, {
        name: '快优易店铺1',
        users: [
          {
            name: '用户用户用户用户用户用户用户',
            msg: '这是消息这是消息这是消息这是消息这是消息',
            time: '05:00',
            img: require('@/assets/default_user_img.png'),
            id:6
          }, {
            name: '用户',
            msg: '这是消息',
            time: '05:00',
            img: '',
            id:7
          }
        ],
      }
    ],
    selectedIndex: '0-0',
  },
  reducers: {
    changeIndex(state, { payload: index }) {
      return {
        ...state,selectedIndex: index
      }
    },
  },
};

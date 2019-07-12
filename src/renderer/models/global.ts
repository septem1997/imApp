export default {
  namespace:'global',
  state: {
    selectedUserIndex: '', //所选中的索引，如：1-0-0代表最近联系人中第一个店铺第一个人，0-1代表会话中第一个人
    currentUser:null,
    
  },
  reducers: {
    updateUserIndex(state, { payload: index }) {
      return {
        ...state,selectedUserIndex: index
      }
    },
    updateCurrentUser(state, { payload: user }) {
      return {
        ...state,currentUser: user
      }
    },
  },
};

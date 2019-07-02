export default {
  namespace:'currentUser',
  state:{},
  reducers: {
    update(state, { payload: user }) {
      return {...state,...user}
    },
  },
}

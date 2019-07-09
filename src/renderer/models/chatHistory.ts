export default {
  namespace:'chatHistory',  //key为用户id
  state:{
    "0":[
      {
        type:'msg',
        content:'这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的消息',
        time:1561939200,
        avatar:'',
        isMine:true
      },{
        type:'msg',
        content:'这是消息asdasdsd',
        time:1561939200,
        avatar:'',
        isMine:true
      },{
        type:'tips',
        content:'上次聊到这',
        time:new Date().getTime()/1000
      },{
        type:'msg',
        content:'这是消息asdasdsd',
        time:new Date().getTime()/1000,
        avatar:'',
        isMine:false
      },{
        type:'msg',
        content:'这是消息asdasdsd',
        time:new Date().getTime()/1000,
        avatar:'',
        isMine:true
      },{
        type:'msg',
        content:'这是消息asdasdsd',
        time:new Date().getTime()/1000,
        avatar:'',
        isMine:true
      },{
        type:'msg',
        content:'这是消息asdasdsd',
        time:new Date().getTime()/1000,
        avatar:'',
        isMine:true
      },{
        type:'msg',
        content:'这是消息asdasdsd',
        time:new Date().getTime()/1000,
        avatar:'',
        isMine:true
      },{
        type:'msg',
        content:'这是消息asdasdsd',
        time:new Date().getTime()/1000,
        avatar:'',
        isMine:true
      },
    ],
    "1":[
      {
        type:'msg',
        content:'这不是消息asdasdsd',
        time:new Date().getTime()/1000,
        avatar:'',
        isMine:true
      },{
        type:'msg',
        content:'这不是消息asdasdsd',
        time:new Date().getTime()/1000,
        avatar:'',
        isMine:false
      },{
        type:'msg',
        content:'这不是消息asdasdsd',
        time:new Date().getTime()/1000,
        avatar:'',
        isMine:false
      },{
        type:'msg',
        content:'这是消息asdasdsd',
        time:new Date().getTime()/1000,
        avatar:'',
        isMine:true
      },
      {
        type:'evaluation',
        time:new Date().getTime()/1000,
      }
    ],
    "2":[
      {
        type:'evaluation',
        time:new Date().getTime()/1000,
      }
    ]
  },
  reducers: {
    update(state, { payload: {id,msgItem} }) {
      let list = state[id]||[]
      let res = list.concat(msgItem)
      return {
        ...state,[id]:res
      }
    }
  },
}

export type MsgItem = {
  avatar:string,
  content:string,
  time:number,
  type:'msg'|'tips'|'evaluation',
  isMine:boolean
}

export type CurrentUser = {
  id:string,
  avatar:string,
  userName:string,
  account:string,
  email:string,
  companies:[],
  remark:string
}

export type Emotion = {
  src: any,
  name: string,
  title: string,
}

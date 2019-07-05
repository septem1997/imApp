export type MsgItem = {
  avatar:string,
  content:string,
  time:number,
  type:'msg'|'tips',
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

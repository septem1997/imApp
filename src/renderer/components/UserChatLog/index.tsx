import React from 'react';
import sty from './index.sass';
import moment from 'moment';
import { Radio } from 'antd';
import { connect } from 'dva';
import { CurrentUser, MsgItem } from '@/types';

function mapStateToProps(state) {
  return {
    currentUser: state.global.currentUser,
    chatHistory: state.chatHistory,
  };
}

type Props = {
  currentUser?: CurrentUser,
  chatHistory?: Array<any>
}

@connect(mapStateToProps)
export default class extends React.Component<Props> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    let chatHistory = [];

    if (this.props.currentUser) {
      if (this.props.chatHistory[this.props.currentUser.id]) {
        chatHistory = this.props.chatHistory[this.props.currentUser.id]
      }
    }else {
      return <div className={sty.userChatLog} />
    }

    let logList = []
    let currentDate = null
    chatHistory.forEach((item:MsgItem)=>{
      if (item.type!=='msg'){
        return
      }
      if (moment.unix(item.time).format("YYYY-MM-DD")!==currentDate){
        currentDate = moment.unix(item.time).format("YYYY-MM-DD")
        logList.push(<div className={sty.logDate}>——&nbsp;{currentDate}&nbsp;——</div>)
      }
      logList.push(
        <div className={sty.msgItem}>
          <div className={sty.title} style={{color:item.isMine?'#349CFC':'#FF9800'}}>{item.isMine?'我':this.props.currentUser.userName}&nbsp;{moment.unix(item.time).format("HH:mm:ss")}</div>
          <div className={sty.content}>{item.content}</div>
        </div>
      )
    })

    return <div className={sty.userChatLog}>
      <div className={sty.head}>
        <Radio.Group defaultValue="a" buttonStyle="solid" className={sty.group}>
          <Radio.Button value="a" className={sty.btn}>全部</Radio.Button>
          <Radio.Button value="f" className={sty.btn}>文件</Radio.Button>
        </Radio.Group>
        <input placeholder={'请输入关键词'} className={sty.search}/>
      </div>
      <div className={sty.logList}>
        {logList}
      </div>
    </div>;
  }
}

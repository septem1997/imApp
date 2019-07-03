import React from 'react';
import sty from './index.sass';
import { connect } from 'dva';
import MsgItem from '../MsgItem';


type Props = {
  currentUser: any,
  chatHistory: Array<any>
}

function mapStateToProps(state) {
  return {
    currentUser: state.global.currentUser,
    chatHistory: state.chatHistory,
  };
}

export default connect(mapStateToProps)(class extends React.Component<Props> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    let userInfo = null;
    let chatHistory = [];

    if (this.props.currentUser) {
      userInfo = <div className={sty.headInfo}>
        <div className={sty.username}>{this.props.currentUser.name}</div>
        <div>店铺名称：</div>
      </div>;

      if (this.props.chatHistory[this.props.currentUser.id]) {
        chatHistory = this.props.chatHistory[this.props.currentUser.id]
      }
    }
    return (
      <div className={sty.msgBox}>
        <div className={sty.head}>
          {userInfo}
        </div>
        <div className={sty.content}>
          {chatHistory.map((item) => (
            <MsgItem msg={item}/>
          ))}
        </div>
      </div>
    );
  }
});

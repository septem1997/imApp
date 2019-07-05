import React from 'react';
import sty from './index.sass';
import { connect } from 'dva';

type Props = {
  info: any,
  index: string,
  selectedUserIndex: string,
  dispatch:Function
}

function mapStateToProps(state) {
  const { selectedUserIndex } = state.global;
  return {
    selectedUserIndex: selectedUserIndex,
  };
}

export default connect(mapStateToProps)(class extends React.Component<Props> {

  changeIndex = ()=>{
    this.props.dispatch({
      type: 'global/updateUserIndex',
      payload: this.props.index
    })
    this.props.dispatch({
      type: 'global/updateCurrentUser',
      payload: this.props.info
    })
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const {
      userName, msg, avatar, time,
    } = this.props.info;
    const {
      selectedUserIndex, index,
    } = this.props;

    return (
      <div className={sty.CItem}
           onClick={this.changeIndex}
           style={{ backgroundColor: selectedUserIndex === index ? '#F2F2F2' : 'white' }}>
        <div className={sty.avatar}>
          <img src={avatar}/>
        </div>
        <div className={sty.content}>
          <div className={sty.name}>{userName}</div>
          <div className={sty.msg}>{msg}</div>
        </div>
        <div className={sty.time}>
          {time}
        </div>
      </div>);
  }
});

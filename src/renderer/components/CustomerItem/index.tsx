import React from 'react';
import sty from './index.sass';
import { connect } from 'dva';

type Props = {
  info: any,
  index: string,
  selectedIndex: string,
  dispatch:Function
}

function mapStateToProps(state) {
  const { selectedIndex } = state.global;
  return {
    selectedIndex,
  };
}

export default connect(mapStateToProps)(class extends React.Component<Props> {

  changeIndex = ()=>{
    this.props.dispatch({
      type: 'global/changeIndex',
      payload: this.props.index
    })
    this.props.dispatch({
      type: 'currentUser/update',
      payload: this.props.info
    })
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const {
      name, msg, img, time,
    } = this.props.info;
    const {
      selectedIndex, index,
    } = this.props;

    return (
      <div className={sty.CItem}
           onClick={this.changeIndex}
           style={{ backgroundColor: selectedIndex === index ? '#F2F2F2' : 'white' }}>
        <div className={sty.avatar}>
          <img src={img}/>
        </div>
        <div className={sty.content}>
          <div className={sty.name}>{name}</div>
          <div className={sty.msg}>{msg}</div>
        </div>
        <div className={sty.time}>
          {time}
        </div>
      </div>);
  }
});

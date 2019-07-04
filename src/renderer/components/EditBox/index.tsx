import React from 'react';
import sty from './index.sass';
import { connect } from 'dva';
import { Button, Icon } from 'antd';
// @ts-ignore
const { clipboard } = window.require('electron');

type Props = {
  currentUser: any,
  dispatch:Function
}

function mapStateToProps(state) {
  return { currentUser: state.global.currentUser };
}

export default connect(mapStateToProps)(class extends React.Component<Props> {


  state={
    isEmotionPanelOpen:false
  }
  onPaste = (e) => {
    e.preventDefault();
    let text = clipboard.readText();
    this.textarea.current.innerHTML += text;
    let range = getSelection();
    range.selectAllChildren(this.textarea.current);
    range.collapseToEnd();
  };

  openEmotionPanel = ()=>{
    this.setState({
      isEmotionPanelOpen:true
    })
  }

  componentDidMount(): void {
    document.querySelector("#root").addEventListener('click',()=>{
      this.setState({
        isEmotionPanelOpen:false
      })
    })
  }

  sendMsg = ()=>{
    let text = this.textarea.current.innerText
    this.props.dispatch({
      type:'chatHistory/update',
      payload:{
        id:this.props.currentUser.id.toString(),
        msgItem:{
          type:'msg',
          content:text,
          time:new Date().getTime()/1000,
          avatar:'',
          isMine:true
        }
      }
    })
    this.textarea.current.innerText = ''
  }

  textarea = React.createRef<HTMLDivElement>();

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className={sty.editBox}>
        <div className={sty.emotionPanel} style={{display:this.state.isEmotionPanelOpen?'block':'none'}}/>
        <div className={sty.toolbar}>
          <Icon type="smile" onClick={this.openEmotionPanel}/>
          <Icon type="picture"/>
          <Icon type="folder"/>
          <Icon type="star"/>
        </div>
        <div ref={this.textarea} className={sty.textarea} onPaste={this.onPaste} contentEditable={true}/>
        <div className={sty.btn}>
          <Button className={sty.send} onClick={this.sendMsg}>发送</Button>
          <Button className={sty.close}>结束</Button>
        </div>
      </div>
    );
  }
});

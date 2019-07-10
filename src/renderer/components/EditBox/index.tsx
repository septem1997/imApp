import React from 'react';
import sty from './index.sass';
import { connect } from 'dva';
import { Button, Icon, Tooltip, Modal,Upload } from 'antd';
import { Emotion } from '@/types';
// @ts-ignore
const { clipboard } = window.require('electron');

type Props = {
  currentUser: any,
  dispatch: Function,
  emotions?:Array<Emotion>
}

function mapStateToProps(state) {
  return {
    currentUser: state.global.currentUser,
    emotions: state.emotions,
  };
}

export default connect(mapStateToProps)(class extends React.Component<Props> {


  state = {
    isEmotionPanelOpen: false,
    isSendContentEmpty: false
  };

  appendEmotion = (name)=>{
    this.appendTextToEditBox(`[${name}]`)
  }

  appendTextToEditBox = (text)=>{
    this.textarea.current.innerHTML += text;
    let range = getSelection();
    range.selectAllChildren(this.textarea.current);
    range.collapseToEnd();
  }

  onPaste = (e) => {
    e.preventDefault();
    this.appendTextToEditBox(clipboard.readText())
  };

  openEmotionPanel = () => {
    this.setState({
      isEmotionPanelOpen: true,
    });
  };

  componentDidMount(): void {
    document.querySelector('#root').addEventListener('click', () => {
      this.setState({
        isEmotionPanelOpen: false,
      });
    });
  }

  emptyTipSetTimeout = null;

  sendEvaluation = () => {
    this.props.dispatch({
      type: 'chatHistory/update',
      payload: {
        id: this.props.currentUser.id.toString(),
        msgItem: {
          type: 'evaluation',
          time: new Date().getTime() / 1000,
          avatar: '',
          isMine: true,
        },
      },
    });
  };

  sendMsg = () => {
    let text = this.textarea.current.innerHTML;
    if (!text) {
      clearTimeout(this.emptyTipSetTimeout);
      this.setState({
        isSendContentEmpty: true,
      });
      this.emptyTipSetTimeout = setTimeout(() => {
        this.setState({
          isSendContentEmpty: false,
        });
      }, 1000);
      return;
    }
    text=text.replace('</div>','')
    text=text.replace('<div>','[newline]')
    this.props.dispatch({
      type: 'chatHistory/update',
      payload: {
        id: this.props.currentUser.id.toString(),
        msgItem: {
          type: 'msg',
          content: text,
          time: new Date().getTime() / 1000,
          avatar: '',
          isMine: true,
        },
      },
    });
    this.textarea.current.innerText = '';
  };

  textarea = React.createRef<HTMLDivElement>();

  endSession = () => {
    Modal.confirm({
      title: '确认结束该对话吗？',
      content: '结束后可在最近联系人重新发起对话。',
      okText: '确认',
      cancelText: '取消',
      mask: false,
      centered: true,
    });
  };

  onKeyDown = (e)=>{
    if (e.keyCode===13){
      e.preventDefault()
      if (e.ctrlKey){
        this.appendTextToEditBox('<div><br></div>')
      }else{
        this.sendMsg()
      }
    }
  }

  openQuickReplyPanel = ()=>{

  }



  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    if (!this.props.currentUser) {
      return <div className={sty.editBox}/>;
    }


    return (
      <div className={sty.editBox}>
        <div className={sty.emotionPanel} style={{ display: this.state.isEmotionPanelOpen ? 'flex' : 'none' }}>
          {this.props.emotions&&this.props.emotions.map((item)=><img className={sty.emotion} onClick={()=>{this.appendEmotion(item.name)}} title={item.title} alt={item.title} src={item.src} />)}
        </div>
        <div className={sty.toolbar}>
          <Icon type="smile" onClick={this.openEmotionPanel}/>
          <Upload accept={'image/*'}><Icon type="picture"/></Upload>
          <Upload><Icon type="folder"/></Upload>
          <Icon type="star" onClick={this.sendEvaluation}/>
          <div onClick={this.openQuickReplyPanel} className={sty.quickReply}>快捷回复</div>
        </div>
        <div onKeyDown={this.onKeyDown} ref={this.textarea} className={sty.textarea} onPaste={this.onPaste} contentEditable={true}/>
        <div className={sty.btn}>
          <Tooltip title="发送内容不能为空" visible={this.state.isSendContentEmpty}>
            <Button className={sty.send} onClick={this.sendMsg}>发送</Button>
          </Tooltip>
          <Button className={sty.close} onClick={this.endSession}>结束</Button>
        </div>
      </div>
    );
  }
});

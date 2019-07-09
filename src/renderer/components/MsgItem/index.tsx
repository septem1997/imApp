import React from 'react';
import sty from './index.sass';
import { Emotion, MsgItem } from '@/types';
import moment from 'moment';
import { Rate,Icon } from 'antd';
import {connect} from 'dva'

type Props = {
  msg: MsgItem,
  emotions?:Array<Emotion>
}

function mapStateToProps(state) {
  return {
    emotions: state.emotions,
  };
}

@connect(mapStateToProps)
export default class extends React.Component<Props> {


  parseMsg = (text:string)=>{
    // @ts-ignore
    return text.replace(/\[[a-z]*\]/g,(char)=>{
      if (char==='[newline]'){
        return '<br>'
      }
      const emotion:Emotion = this.props.emotions.find(item=> `[${item.name}]`===char)
      if (emotion){
        return `<img style="width: 24px;height: 24px" src='${emotion.src}'/>`
      }else {
        return char
      }
    })
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const { type, avatar, time, content, isMine } = this.props.msg;
    let msg = null;
    if (type === 'msg') {
      msg = (<div className={sty.msgItem} style={{ flexDirection: isMine ? 'row-reverse' : 'row' }}>
        <div className={sty.avatar}>
          <img src={avatar}/>
        </div>
        <div className={sty.msg}>
          <div className={sty.time}
               style={{ right: isMine ? '0' : 'auto' }}>{moment.unix(time).format('YYYY-MM-DD HH:mm:ss')}</div>
          <div className={sty.text} dangerouslySetInnerHTML={{__html:this.parseMsg(content)}} style={{ backgroundColor: isMine ? '#E5EFFF' : 'white' }}/>
        </div>
        <div className={sty.blank}/>
      </div>);
    }
    if (type === 'tips') {
      msg = (
        <div className={sty.tips}>
          <div>{moment.unix(time).format('YYYY-MM-DD HH:mm:ss')}</div>
          <div>{content}</div>
        </div>
      );
    }
    if (type === 'evaluation') {
      msg = (
        <div className={sty.msgItem} style={{ flexDirection: 'row-reverse' }}>
          <div className={sty.avatar}>
            <img src={avatar}/>
          </div>
          <div className={sty.msg}>
            <div className={sty.time}
                 style={{ right:'0'}}>{moment.unix(time).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div className={sty.text} style={{paddingRight:'90px',display:'block',userSelect:'none'}}>
              您对本次服务是否满意？
              <br/>
              <Rate disabled defaultValue={0} character={<Icon type="star" />}/>
            </div>
          </div>
        </div>
      )
    }
    return msg;
  }
}

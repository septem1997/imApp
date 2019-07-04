import React from 'react';
import sty from './index.sass';
import { MsgItem } from '@/types';
import moment from 'moment';

type Props = {
  msg: MsgItem
}

export default class extends React.Component<Props> {
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
          <div className={sty.text} style={{backgroundColor:isMine?'#E5EFFF':'white'}}>{content}</div>
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
    return msg;
  }
}

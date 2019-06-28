import React from 'react';
import sty from './index.sass'

type Props = {
  info:any
}

export default class extends React.Component<Props> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const {
      name,msg,img,time
    } = this.props.info


    return (<div className={sty.CItem}>
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
}

import React from 'react';
import sty from './index.sass';
import moment from 'moment';
import { Radio } from 'antd';

export default class extends React.Component {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return <div className={sty.userChatLog}>
      <div className={sty.head}>
        <Radio.Group defaultValue="a" buttonStyle="solid" className={sty.group}>
          <Radio.Button value="a" className={sty.btn}>全部</Radio.Button>
          <Radio.Button value="f" className={sty.btn}>文件</Radio.Button>
        </Radio.Group>
        <input placeholder={'请输入关键词'} className={sty.search}/>
      </div>
      <div className={sty.logList}>
      </div>
    </div>;
  }
}

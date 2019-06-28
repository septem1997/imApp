import React from 'react';
import sty from './index.sass'
import {Input,Tabs} from 'antd'
import SessionList from '../SessionList'

const {TabPane} = Tabs

export default class extends React.Component {


  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {


    return (<div className={sty.root} style={{height:'100%'}}>
      <input className={sty.search} placeholder={"搜索最近联系人、消息记录"}/>

      <Tabs defaultActiveKey="1" className={"myTabs"}>
        <TabPane tab="会话" key="1" style={{height:'100%'}}>
          <SessionList />
        </TabPane>
        <TabPane tab="最近" key="2" style={{height:'100%'}}>
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>);
  }
}

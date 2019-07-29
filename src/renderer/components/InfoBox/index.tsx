import React from 'react';
import sty from './index.sass'
import {Tabs} from 'antd';
import UserDetail from '../UserDetail';
import UserOrders from '../UserOrders';
import UserChatLog from '../UserChatLog';
const {TabPane} = Tabs

export default class extends React.Component {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return <div className={sty.infoBox} >
      <Tabs defaultActiveKey="1" className={"myTabs threePane"}>
        <TabPane tab="资料" key="1" style={{height:'100%'}}>
          <UserDetail />
        </TabPane>
        <TabPane tab="订单" key="2" style={{height:'100%'}}>
          <UserOrders />
        </TabPane>
        <TabPane tab="消息" key="3" style={{height:'100%'}}>
          <UserChatLog />
        </TabPane>
      </Tabs>
    </div>;
  }
}

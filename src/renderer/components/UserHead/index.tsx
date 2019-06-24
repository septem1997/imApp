import React from 'react';
import styl from './index.styl'
import { Menu, Dropdown, Icon } from 'antd';

export default class Login extends React.Component {

  state={
    avatar:require("@/assets/default_user_img.png")
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const menu = (
      <Menu>
        <Menu.Item key="0">在线</Menu.Item>
        <Menu.Item key="1">挂起</Menu.Item>
        <Menu.Item key="3">离线</Menu.Item>
      </Menu>
    );


    return (
      <div className={styl.head}>
        <img src={this.state.avatar}/>
        <div className={styl.status}>
          <div>客服名称</div>
          <Dropdown overlay={menu} trigger={['click']}>
            <div>
              在线 <Icon type="down" />
            </div>
          </Dropdown>
        </div>
      </div>
    );
  }
}

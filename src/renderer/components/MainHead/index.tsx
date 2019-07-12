import React from 'react';
import styl from './index.styl'
import { Menu, Dropdown, Icon } from 'antd';

export default class extends React.Component {

  state={
    avatar:require("@/assets/default_user_img.png"),
    statusCode:0,
    userName:''
  }

  componentDidMount(): void {
    let csStr = localStorage.getItem("loginCS")
    if (csStr){
      let cs = JSON.parse(csStr)
      this.setState({
        avatar:cs.member_avatar,
        userName:cs.member_name
      })
    }
  }


  status = [
    {
      color:'#88FC60',
      name:'在线'
    },{
      color:'#FEE03D',
      name:'挂起'
    },{
      color:'#CCCCCC',
      name:'离线'
    }
  ]

  onStatusClick =({ item, key, keyPath, domEvent })=>{
      this.setState({
        statusCode:key
      })
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const menu = (
      <Menu onClick={this.onStatusClick}>
        {this.status.map((item,index)=>{
          return (<Menu.Item key={index}><span style={{backgroundColor:item.color}} className={styl.circle}/>&nbsp;{item.name}</Menu.Item>)
        })}
      </Menu>
    );


    return (
      <div className={styl.head}>
        <div className={styl.img}><span className={styl.circle} style={{backgroundColor:this.status[this.state.statusCode].color}}/><img src={this.state.avatar}/></div>
        <div className={styl.status}>
          <div className={styl.name}>{this.state.userName}</div>
          <Dropdown overlay={menu} trigger={['click']} className={styl.dropdown}>
            <div>
              {this.status[this.state.statusCode].name} <Icon type="down" />
            </div>
          </Dropdown>
        </div>
      </div>
    );
  }
}

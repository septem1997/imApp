import React from 'react';
import sty from './index.sass'
import CustomerItem from '../CustomerItem'
import {Dropdown,Menu} from 'antd'


export default class extends React.Component {

  sortMap=[
    {
      name:'按等待时长',
      icon:"icon ion-md-list"
    },{
      name:'按最新消息',
      icon:"icon ion-md-list"
    }
  ]


  onStatusClick =({ item, key, keyPath, domEvent })=>{
    this.setState({
      sortStatus:key
    })
  }

  state={
    sortStatus:0,
    list:[
      {
        name:'用户用户用户用户用户用户用户',
        msg:'这是消息这是消息这是消息这是消息这是消息',
        time:'05:00',
        img:require("@/assets/default_user_img.png")
      },{
        name:'用户',
        msg:'这是消息',
        time:'05:00',
        img:''
      },{
        name:'用户',
        msg:'这是消息',
        time:'05:00',
        img:''
      },{
        name:'用户',
        msg:'这是消息',
        time:'05:00',
        img:''
      },{
        name:'用户',
        msg:'这是消息',
        time:'05:00',
        img:''
      },{
        name:'用户',
        msg:'这是消息',
        time:'05:00',
        img:''
      },{
        name:'用户',
        msg:'这是消息',
        time:'05:00',
        img:''
      },{
        name:'用户',
        msg:'这是消息',
        time:'05:00',
        img:''
      },{
        name:'用户',
        msg:'这是消息',
        time:'05:00',
        img:''
      },{
        name:'用户',
        msg:'这是消息',
        time:'05:00',
        img:''
      },{
        name:'用户',
        msg:'这是消息',
        time:'05:00',
        img:''
      },{
        name:'用户',
        msg:'这是消息',
        time:'05:00',
        img:''
      }
    ]
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const menu = (
      <Menu onClick={this.onStatusClick}>
        {this.sortMap.map((item,index)=>{
          return (<Menu.Item  key={index}>{item.name}</Menu.Item>)
        })}
      </Menu>
    );


    return <div className={sty.root}>
      <Dropdown overlay={menu} trigger={['click']} className={sty.sort}>
        <div>
          {this.sortMap[this.state.sortStatus].name} <i className={this.sortMap[this.state.sortStatus].icon}/>
        </div>
      </Dropdown>

      <div className={sty.listBox}>
        {this.state.list.map((item)=> <CustomerItem info={item} />)}
      </div>
    </div>
  }
}

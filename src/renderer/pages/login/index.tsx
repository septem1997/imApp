import React from 'react';
import WindowCtrlBar from '../../components/WindowControlBar';
import styles from './index.styl';
import {Input,Button,AutoComplete,Checkbox} from 'antd'
import WS from '@/Util/webSocket';
const {Option} = AutoComplete
// @ts-ignore
const {ipcRenderer} = window.require('electron')


function renderOption(item) {
  return (
    <Option key={item} value={item}>
      <div>
        {item}
      </div>
    </Option>
  );
}


export default class Login extends React.Component {

  state={
    avatar:require("@/assets/default_user_img.png"),
    username:localStorage.getItem("lastLoginUser")||'',
    options: ["123","456","12"],
    rememberPassword:localStorage.getItem("rememberPassword"),
    autoLogin:localStorage.getItem("autoLogin"),
    openSuggestion:false,
    loginText:'登录',
    opacity:1
  };

  selectUsername = (val)=>{
    this.setState({
      username:val,
      openSuggestion:false
    })
  }

  onRememberPasswordChange = (e)=>{
    let value = e.target.checked
    localStorage.setItem("rememberPassword",value)
    this.setState({
      rememberPassword:value
    })
  }

  componentDidMount(): void {

  }

  onAutoLoginChange = (e)=>{
    let value = e.target.checked
    localStorage.setItem("autoLogin",value)
    this.setState({
      autoLogin:value
    })
  }

  login = async () => {
    this.setState({
      loginText:'正在登录中...'
    })
    let res = await new Promise((resolve) => {
      setTimeout(()=>{
        resolve(this.state.username)
      },300)
    })
    if (res) {
      localStorage.setItem("lastLoginUser", this.state.username)
      this.setState({
        opacity:0
      })
      setTimeout(()=>{
        ipcRenderer.send("login")
      },500)
    }else {
      this.setState({
        loginText:'登录'
      })
    }
  }


  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className={'root withShadow' + ' ' + styles.content } style={{opacity:this.state.opacity}}>
        <WindowCtrlBar login={true} />

        <div className={styles.bg}><img src={require('@/assets/login_bg.png')}/></div>
        <div className={styles.loginBox}>
          <img className={styles.avatar} src={this.state.avatar}/>
          <div className={styles.input}>
            <img src={require("@/assets/login_icon_user_nor.png")}/>
            <AutoComplete
              defaultOpen={false}
              open={this.state.openSuggestion}
              value={this.state.username}
              onChange={this.selectUsername}
              style={{width:'100%'}}
              optionLabelProp={"value"}
              dataSource={this.state.options.map(renderOption)}
            >
              <Input suffix={<i className={"icon ion-ios-arrow-down"} style={{color:'#aaaaaa'}} onClick={()=>{this.setState({openSuggestion:!this.state.openSuggestion})}} />} />
            </AutoComplete>
          </div>
          <div className={styles.input}>
            <div><img src={require("@/assets/login_icon_password_nor.png")}/></div>
            <Input type={"password"}/>
          </div>
          <Button type="primary" onClick={this.login} className={styles.loginBtn}>{this.state.loginText}</Button>
          <div className={styles.toolBar}>
            <Checkbox onChange={this.onRememberPasswordChange} value={this.state.rememberPassword}>记住密码</Checkbox>
            <Checkbox onChange={this.onAutoLoginChange} value={this.state.autoLogin}>自动登录</Checkbox>
            <a href={"#"}>忘记密码</a>
          </div>
        </div>
      </div>
    );
  }
}

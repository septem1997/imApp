import React from 'react';
import WindowCtrlBar from '../../components/WindowControlBar';
import styles from './index.styl';
import {Input,Button,AutoComplete,Checkbox,Icon} from 'antd'
const {Option} = AutoComplete

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
    avatar:require('@/assets/login_bg.png'),
    username:localStorage.getItem("lastLoginUser")||'',
    options: ["123","456","12"],
    rememberPassword:localStorage.getItem("rememberPassword"),
    autoLogin:localStorage.getItem("autoLogin"),
    openSuggestion:false
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

  onAutoLoginChange = (e)=>{
    let value = e.target.checked
    localStorage.setItem("autoLogin",value)
    this.setState({
      autoLogin:value
    })
  }

  login = ()=>{

  }


  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className={'root' + ' ' + styles.content }>
        <WindowCtrlBar className={styles.ctrl} login={false} />

        <div className={styles.bg}><img src={this.state.avatar}/></div>
        <div className={styles.loginBox}>
          <img className={styles.avatar} src={require("@/assets/default_user_img.png")}/>
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
          <Button type="primary" onClick={this.login} className={styles.loginBtn}>登录</Button>
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

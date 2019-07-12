import React from 'react';
import WindowCtrlBar from '../../components/WindowControlBar';
import styles from './index.styl';
import { Input, Button, AutoComplete, Checkbox, message } from 'antd';
import WS from '@/Util/webSocket';

const { Option } = AutoComplete;
// @ts-ignore
const { ipcRenderer } = window.require('electron');


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

  state = {
    avatar: require('@/assets/default_user_img.png'),
    username: localStorage.getItem('lastLoginCS') || '',
    options: [],
    rememberPassword:localStorage.getItem("rememberPassword")==='true',
    autoLogin:localStorage.getItem("autoLogin")==='true',
    openSuggestion: false,
    loginText: '登录',
    opacity: 0,
    password: localStorage.getItem("rememberPassword")==='true'?localStorage.getItem("lastLoginPWD"):'',
  };

  getAvatarTimeoutId = null;
  selectUsername = (val) => {
    this.setState({
      username: val,
      openSuggestion: false,
    });

    if (this.getAvatarTimeoutId) {
      clearTimeout(this.getAvatarTimeoutId);
    }
    this.getAvatarTimeoutId = setTimeout(async () => {
      let res = await WS.send({
        action: 'chat::getUserImg',
        data: {
          user_name: this.state.username,
        },
      });
      if (res) {
        this.setState({
          avatar: res.member_avatar,
        });
      }
    }, 1000);
  };

  onRememberPasswordChange = (e) => {
    let value = e.target.checked;
    localStorage.setItem('rememberPassword', value);
    this.setState({
      rememberPassword: value,
    });
  };

  componentDidMount(): void {
    let listStr = localStorage.getItem('CSUsernameList');
    if (listStr) {
      let list: Array<string> = JSON.parse(listStr);
      this.setState({
        options:list
      })
    }
    ipcRenderer.send("win-show")
    setTimeout(()=>{
      this.setState({
        opacity:1
      })
    },0)
    if (this.state.autoLogin){
      this.login()
    }
  }

  onAutoLoginChange = (e) => {
    let value = e.target.checked;
    localStorage.setItem('autoLogin', value);
    this.setState({
      autoLogin: value,
    });
  };

  lockLogin = false

  login = async () => {
    if (this.lockLogin){
      return
    }
    this.lockLogin = true
    this.setState({
      loginText: '正在登录中...',
    });
    try {
      if (!this.state.username){
        throw new Error('请输入帐号');
      }
      if (!this.state.password){
        throw new Error('请输入密码');
      }
      let res = await WS.send({
        action: 'chat::loginIm',
        data: {
          user_name: this.state.username,
          password: this.state.password,
        },
      });
      if (res.msg) {
        throw new Error(res.msg);
      }
      localStorage.setItem('loginCS', JSON.stringify(res));
      localStorage.setItem('lastLoginCS', this.state.username);
      localStorage.setItem('lastLoginPWD', this.state.password);
      if (!this.state.options.includes(this.state.username)){
        localStorage.setItem('CSUsernameList',JSON.stringify(this.state.options.concat(this.state.username)));
      }
      this.setState({
        opacity: 0,
      });
      setTimeout(() => {
        ipcRenderer.send('login');
      }, 500);

    } catch (e) {
      this.setState({
        loginText: '登录',
      });
      message.error(e.message)
      this.lockLogin = false
    }
  };

  onKeyUp=(e)=>{
    if (e.keyCode===13){
      this.login()
    }
  }


  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className={'root withShadow' + ' ' + styles.content} onKeyUp={this.onKeyUp} style={{ opacity: this.state.opacity }}>
        <WindowCtrlBar login={true}/>

        <div className={styles.bg}><img src={require('@/assets/login_bg.png')}/></div>
        <div className={styles.loginBox}>
          <img className={styles.avatar} src={this.state.avatar}/>
          <div className={styles.input}>
            <img src={require('@/assets/login_icon_user_nor.png')}/>
            <AutoComplete
              defaultOpen={false}
              open={this.state.openSuggestion}
              value={this.state.username}
              onChange={this.selectUsername}
              style={{ width: '100%' }}
              optionLabelProp={'value'}
              dataSource={this.state.options.map(renderOption)}
            >
              <Input suffix={<i className={'icon ion-ios-arrow-down'} style={{ color: '#aaaaaa' }} onClick={() => {
                this.setState({ openSuggestion: !this.state.openSuggestion });
              }}/>}/>
            </AutoComplete>
          </div>
          <div className={styles.input}>
            <div><img src={require('@/assets/login_icon_password_nor.png')}/></div>
            <Input type={'password'} value={this.state.password} onChange={(e) => {
              this.setState({ password: e.target.value });
            }}/>
          </div>
          <Button type="primary" onClick={this.login} className={styles.loginBtn}>{this.state.loginText}</Button>
          <div className={styles.toolBar}>
            <Checkbox onChange={this.onRememberPasswordChange}  checked={this.state.rememberPassword}>记住密码</Checkbox>
            <Checkbox onChange={this.onAutoLoginChange} checked={this.state.autoLogin}>自动登录</Checkbox>
            <a href={'#'}>忘记密码</a>
          </div>
        </div>
      </div>
    );
  }
}

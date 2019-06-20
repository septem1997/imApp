import React from 'react';
import WindowCtrlBar from '../../components/WindowControlBar';
import styles from './index.styl';

export default class Login extends React.Component {

  state={
    avatar:require('@/assets/login_bg.png')
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className={'root' + ' ' + styles.content }>
        <WindowCtrlBar className={styles.ctrl} login={false} />

        <div className={styles.bg}><img src={this.state.avatar}/></div>
        <div className={styles.loginBox}>
          <img className={styles.avatar} src={require("@/assets/default_user_img.png")}/>
          <div className={styles.input}>
            <div><img src={require("@/assets/login_icon_user_nor.png")}/></div>

          </div>
        </div>
      </div>
    );
  }
}

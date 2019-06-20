import React from 'react';
import WindowCtrlBar from '../../components/WindowControlBar';
import styles from './index.less';

export default class Login extends React.Component {

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className={'root' + ' ' + styles.content }>
        <WindowCtrlBar className={styles.ctrl} login={false} />

        <div className={styles.bg}><img src={require('@/assets/login_bg.png')}/></div>
        <div className={styles.loginBox}>

        </div>
      </div>
    );
  }
}

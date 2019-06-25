import React from 'react';
import WindowCtrlBar from '../../components/WindowControlBar';
import UserHead from '../../components/UserHead';
import InfoBox from '../../components/InfoBox';
import ChatBox from '../../components/ChatBox';
import CustomerList from '../../components/CustomerList';

import styles from './index.sass';
// @ts-ignore
const {ipcRenderer} = window.require('electron')



export default class Login extends React.Component {


  componentDidMount(): void {
    ipcRenderer.send("win-show")
    setTimeout(()=>{
      this.setState({
        opacity:1
      })
    },0)
  }

  state={
    opacity:0
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className={"root" + ' ' + styles.root} style={{opacity:this.state.opacity}} >
        <WindowCtrlBar login={false}/>
        <UserHead />
        <div className={styles.mainLayout}>
          <CustomerList />
          <ChatBox />
          <InfoBox />
        </div>
      </div>);
  }
}

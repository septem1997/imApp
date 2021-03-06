import React from 'react';
import WindowCtrlBar from '../../components/WindowControlBar';
import MainHead from '../../components/MainHead';
import InfoBox from '../../components/InfoBox';
import ChatBox from '../../components/ChatBox';
import CustomerList from '../../components/CustomerList';
import styles from './index.sass';
import WS from '../../Util/webSocket';

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

    ipcRenderer.on("win-fade",(e,turnOffAutoLogin)=>{
      this.setState({
        opacity:0
      })
      if (turnOffAutoLogin){
        localStorage.removeItem("rememberPassword")
        localStorage.removeItem("autoLogin")
      }
    })

    WS.heartBeat()
  }

  state={
    opacity:0
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className={"root withShadow" + ' ' + styles.root} style={{opacity:this.state.opacity}} >
        <WindowCtrlBar login={false}/>
        <MainHead />
        <div className={styles.mainLayout}>
          <CustomerList />
          <ChatBox />
          <InfoBox />
        </div>
      </div>);
  }
}

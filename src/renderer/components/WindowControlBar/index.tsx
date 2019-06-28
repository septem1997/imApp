import React from 'react';
import styles from './index.less';

// @ts-ignore
const {ipcRenderer} = window.require('electron')

type Props = {
  login: boolean
}

export default class extends React.Component<Props> {

  sendMsg = (msg:string)=>{
    ipcRenderer.send(msg);
  }

  isFullScreen:boolean = false

  componentDidMount(): void {
    const root = document.getElementsByClassName("root");
    const classList = root.item(0).classList;
    ipcRenderer.on("win-un-max",()=>{
      this.isFullScreen = false
    })
    ipcRenderer.on("win-max",()=>{
      this.isFullScreen = true
    })
    //todo 待完善
    window.addEventListener("resize",()=>{
      let screen = window.screen
      if (document.body.clientWidth===window.innerWidth&&document.body.clientHeight===window.innerHeight){
        classList.remove("withoutShadow")
        classList.add("withShadow")
      }else{
        classList.remove("withShadow")
        classList.add("withoutShadow")
      }
    })
  }


  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className={(this.props.login?styles.loginWindow:styles.mainWindow)+' '+styles.windowCtrl}>
        <div className={styles.ctrlItem} onClick={()=>{this.sendMsg('win-logout')}} style={{display:this.props.login?'none':'block'}}>
          <i className="icon ion-md-exit" />
        </div>
        <div className={styles.ctrlItem} onClick={()=>{this.sendMsg('win-hide')}}>
          <i className="icon ion-md-remove"/>
        </div>
        <div className={styles.ctrlItem} style={{display:this.props.login?'none':'block'}} onClick={()=>{this.sendMsg(this.isFullScreen?'win-un-max':'win-max')}}>
          <i className="icon ion-ios-square-outline"/>
        </div>
        <div className={styles.ctrlItem} onClick={()=>{this.sendMsg('win-close')}}>
          <i className="icon ion-md-close"/>
        </div>
      </div>
    )
  }

}

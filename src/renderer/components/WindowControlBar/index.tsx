import React from 'react';
import styles from './index.less';

// @ts-ignore
const {ipcRenderer} = window.require('electron')

type Props = {
  login: boolean
}

export default function(props:Props) {
  function sendMsg(msg:string) {
    ipcRenderer.send(msg);
  }

  return (
    <div className={(props.login?styles.loginWindow:styles.mainWindow)+' '+styles.windowCtrl}>
      <div className={styles.ctrlItem} onClick={()=>{sendMsg('win-logout')}} style={{display:props.login?'none':'block'}}>
        <i className="icon ion-md-exit" />
      </div>
      <div className={styles.ctrlItem} onClick={()=>{sendMsg('win-hide')}}>
        <i className="icon ion-md-remove"/>
      </div>
      <div className={styles.ctrlItem} style={{display:props.login?'none':'block'}} onClick={()=>{sendMsg('win-max')}}>
        <i className="icon ion-ios-square-outline"/>
      </div>
      <div className={styles.ctrlItem} onClick={()=>{sendMsg('win-close')}}>
        <i className="icon ion-md-close"/>
      </div>
    </div>
  );
}

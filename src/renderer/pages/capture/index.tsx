import React from 'react';
// @ts-ignore
const {ipcRenderer} = window.require('electron')



export default class extends React.Component {


  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className={"root" }  >
      </div>
    );
  }
}

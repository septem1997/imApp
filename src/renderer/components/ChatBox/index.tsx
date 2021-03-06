import React from 'react';
import sty from './index.sass'
import MsgBox from '../MsgBox';
import EditBox from '../EditBox';

export default class extends React.Component {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return <div className={sty.chatBox}>
      <MsgBox />
      <EditBox />
    </div>;
  }
}

import React from 'react';
import sty from './index.sass'
import {connect} from 'dva'


type Props={
  currentUser:any
}

@connect((state)=>{
  console.log(state.currentUser);
  return state.currentUser;
})
export default class extends React.Component<Props> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    console.log(this.props.currentUser);
    return <div >{this.props.currentUser?this.props.currentUser.name:''}</div>;
  }
}

import React from 'react';
import sty from './index.sass';
import { connect } from 'dva';

type Props = {
  msg:any
}

function mapStateToProps(state) {
  const { selectedUserIndex } = state.global;
  return {

    selectedUserIndex: selectedUserIndex,
  };
}

export default connect(mapStateToProps)(class extends React.Component<Props> {
render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
  return (
    <div className={sty.msgItem}>
      {this.props.msg}
    </div>
  );
}
})

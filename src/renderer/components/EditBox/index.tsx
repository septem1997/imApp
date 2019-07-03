import React from 'react';
import sty from './index.sass';
import { connect } from 'dva';

type Props = {
  currentUser: any
}

function mapStateToProps(state) {
  return { currentUser: state.global.currentUser };
}

export default connect(mapStateToProps)(class extends React.Component<Props> {
render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
  return (
    <div className={sty.editBox}>

    </div>
  )
}
})

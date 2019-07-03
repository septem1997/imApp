import React from 'react';
import sty from './index.sass';
import CustomerItem from '../CustomerItem';
import { Collapse } from 'antd';
import { connect } from 'dva';

const { Panel } = Collapse;

function mapStateToProps(state) {
  const { selectedUserIndex } = state.global;
  const recentList = state.recentList
  return {
    recentList,
    selectedUserIndex: selectedUserIndex,
  };
}

type Props = {
  recentList: [],
  selectedUserIndex: string
}

export default connect(mapStateToProps)(class extends React.Component<Props> {

  state = {};

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return <div className={sty.recentList}>
      <div className={sty.listBox}>
        <Collapse className={sty.collapse} bordered={false}>
          {this.props.recentList.map((store: any, storeIndex) =>
            <Panel header={store.name + ` (${store.users.length})`} key={store.name}>
              {store.users.map((user, userIndex) =>
                <CustomerItem key={user.id} index={`1-${storeIndex}-${userIndex}`} info={user}/>)}
            </Panel>,
          )}
        </Collapse>
      </div>
    </div>;
  }
});

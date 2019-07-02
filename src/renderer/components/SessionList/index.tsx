import React from 'react';
import sty from './index.sass';
import CustomerItem from '../CustomerItem';
import { Dropdown, Menu } from 'antd';
import { connect } from 'dva';

function mapStateToProps(state) {
  const { sessionList, selectedIndex } = state.global;
  return {
    sessionList,
    selectedIndex,
  };
}

type Props = {
  sessionList: [],
  selectedIndex: string
}

export default connect(mapStateToProps)(class extends React.Component<Props> {

    sortMap = [
      {
        name: '按等待时长',
        icon: 'icon ion-md-list',
      }, {
        name: '按最新消息',
        icon: 'icon ion-md-list',
      },
    ];


    onStatusClick = ({ item, key, keyPath, domEvent }) => {
      this.setState({
        sortStatus: key,
      });
    };

    state = {
      sortStatus: 0,
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

      const menu = (
        <Menu onClick={this.onStatusClick}>
          {this.sortMap.map((item, index) => {
            return (<Menu.Item key={index}>{item.name}</Menu.Item>);
          })}
        </Menu>
      );

      let activeIndex = null;
      let indexes = this.props.selectedIndex.split('-');
      if (indexes[0] === '0') {
        activeIndex = Number(indexes[1]);
      }


      return <div className={sty.root}>
        <Dropdown overlay={menu} trigger={['click']} className={sty.sort}>
          <div>
            {this.sortMap[this.state.sortStatus].name} <i className={this.sortMap[this.state.sortStatus].icon}/>
          </div>
        </Dropdown>

        <div className={sty.listBox}>
          {this.props.sessionList.map((item: any, index) =>
            <CustomerItem key={item.id} index={`0-${index}`} info={item}/>)}
        </div>
      </div>;
    }
  },
);

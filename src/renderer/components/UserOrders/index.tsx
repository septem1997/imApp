import React from 'react';
import sty from './index.sass';
import moment from 'moment';

export default class extends React.Component {

  state = {
    orderList: [
      {
        orderNo: '123456',
        status: 0,
        company: '阿里',
        time: new Date().getTime() / 1000,
      },
      {
        orderNo: '123456',
        status: 0,
        company: '腾讯',
        time: new Date().getTime() / 1000,
      },
    ],
  };

  statusMap = [
    '待付款',
  ];

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return <div className={sty.userOrders}>
      <div className={sty.head}>
        <input placeholder={'请输入订单号'} className={sty.search}/>
      </div>
      <div className={sty.orderList}>
        {this.state.orderList.map((order) =>
          <div className={sty.orderItem}>
            <div className={sty.head}>
              <span>订单编号：{order.orderNo}</span>
              <span className={sty.status}>{this.statusMap[order.status]}</span>
            </div>
            <div>采购企业：{order.company}</div>
            <div>创建时间：{moment.unix(order.time).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        )}
      </div>
    </div>;
  }
}

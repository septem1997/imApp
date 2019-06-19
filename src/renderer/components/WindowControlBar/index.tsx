import React from 'react';
import styles from './index.less';

export default function() {
  return (
    <div className={styles.windowCtrl}>
      <div className="window-control-item" >
        <i className="el-icon-minus"/>
      </div>
      <div className="window-control-item" >
        <i className="el-icon-minus"/>
      </div>
      <div className="window-control-item" >
        <i className="el-icon-minus"/>
      </div>
      <div className="window-control-item close-item" >
        <i className="el-icon-close"/>
      </div>
    </div>
  );
}

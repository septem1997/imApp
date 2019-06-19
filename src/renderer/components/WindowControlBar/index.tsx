import React from 'react';
import styles from './index.less';

type Props = {
  className:string
}

export default function(props:Props) {
  return (
    <div className={props.className+' '+styles.windowCtrl}>
      <div className={styles.ctrlItem} >
        <i className="fa fa-sign-out" aria-hidden="true"/>
      </div>
      <div className={styles.ctrlItem} >
        <i className="fa fa-minus"/>
      </div>
      <div className={styles.ctrlItem} >
        <i className="fa fa-square-o" aria-hidden="true"/>
      </div>
      <div className={styles.ctrlItem} >
        <i className="fa fa-close"/>
      </div>
    </div>
  );
}

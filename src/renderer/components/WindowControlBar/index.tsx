import React from 'react';
import styles from './index.less';

export default function() {
  return (
    <div className={styles.windowCtrl}>
      <div className="window-control-item" v-on:click="miniWindow">
        <Icon type="md-remove"/>
      </div>
      <div className="window-control-item" v-on:click="maxWindow" v-if="showMax && !isMax">
        <Icon type="md-square-outline"/>
      </div>
      <div className="window-control-item" v-on:click="restoreWindow" v-if="showMax && isMax">
        <Icon type="ios-photos-outline"/>
      </div>
      <div className="window-control-item close-item" v-on:click="closeWindow">
        <Icon type="md-close"/>
      </div>
    </div>
  );
}

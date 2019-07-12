class WS extends WebSocket {
  static get currentRequestId(): number {
    this._currentRequestId++;
    if (this._currentRequestId > 10000) {
      this._currentRequestId = 0;
    }
    return this._currentRequestId;
  }

  private static instance: WS;

  private constructor(url: string) {
    super(url);
  }

  private static _currentRequestId = 0;
  private static defaultTimeOut = 1000;
  private static requestPool = {};


  private static connect() {
    return new Promise((resolve) => {
      if (this.instance&&this.instance.readyState===WebSocket.CONNECTING){

      }else {
        let url:string = process.env.WS_URL||''
        this.instance = new WS(url);
      }
      this.instance.onopen = () => {
        resolve();
      };
      this.instance.onmessage = function(evt) {
        var data = JSON.parse(evt.data);
        if (data.request_id == -1) {
          // 收到聊天信息
          // Vue.prototype.$bus.$emit('UpNewList', data.data);
        } else if (data.request_id == -2) {
          // Vue.prototype.$bus.$emit('storeRead', data.data);
          // Vue.prototype.$ipcRenderer.send('icon-flash-end');
        } else if (WS.requestPool.hasOwnProperty(data.request_id)) {
          clearTimeout(WS.requestPool[data.request_id].timer);
          WS.requestPool[data.request_id].resolve(data.data);
          delete WS.requestPool[data.request_id];
        } else {
          //callfunc(data.callback, data.data);
        }

      };
    });
  }

  private static heartbeatIntervalId
  public static heartBeat() {
    if (WS) clearInterval(WS.heartbeatIntervalId);
    WS.heartbeatIntervalId = setInterval(() => {
      let csStr = localStorage.getItem('loginCS')
      if (!csStr) return
      let cs = JSON.parse(csStr)
      let input = {
        member_id: cs.member_id,
      };
      WS.send({action:'heartbeat',data:input}).then((data) => {
        console.log('heardbeat', data);
      }, (error) => {
        console.log('heardbeat error', error);
      });
    }, 5000);
  }

  public static send({ action, data }) {
    return new Promise<any>(async (resolve, reject) => {
      let requestId = WS.currentRequestId;
      if (this.instance&&this.instance.readyState === WebSocket.OPEN) {
        const input = {
          action: action,
          data: data,
          request_id: requestId,
        };
        WS.requestPool[requestId] = {
          timer: setTimeout(() => {
            reject('请求超时');
            delete resolve[requestId];
          }, WS.defaultTimeOut),
          resolve: resolve,
          action: action,
        };
        this.instance.send(JSON.stringify(input));
      } else {
        await WS.connect();
        let res = await WS.send({ action, data });
        resolve(res);
      }
    });
  }
}

export default WS;

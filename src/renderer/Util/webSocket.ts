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
      if (this.instance.readyState === 1) {
        return resolve();
      }
      this.instance = new WS(process.env.WS_URL);
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

  public static heartBeat() {

  }

  public static send({ action, data }) {
    return new Promise(async (resolve, reject) => {
      let requestId = WS.currentRequestId;
      if (this.instance.readyState === 1) {
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
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
        await WS.connect();
        let res = await WS.send({ action, data });
        resolve(res);
      }
    });
  }
}

export default WS;

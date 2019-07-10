class WS extends WebSocket {
  private static instance: WS;

  private constructor(url: string, protocols: string | string[]) {
    super(url, protocols);
  }

  public static getInstance() {
    if (!WS.instance) {
      WS.instance = new WS();
    }

    return WS.instance;
  }

  someMethod() {}
}

export default WS

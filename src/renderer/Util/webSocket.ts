class WS extends WebSocket {
  private static instance: WS;

  private constructor(url: string, protocols: string | string[]) {
    super(url, protocols);
  }

  public static getInstance() {
    if (!WS.instance) {
      const [protocol,url] = process.env.WS_URL.split("://")
      WS.instance = new WS(url,protocol);
    }

    return WS.instance;
  }

  someMethod() {}
}

export default WS

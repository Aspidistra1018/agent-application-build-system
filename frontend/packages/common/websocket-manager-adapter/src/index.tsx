/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ConnectionOptions {
  // The business parameters of the call, corresponding to headers in the message structure ['X-Coze-Biz']
  biz: string;
  // The ID of the service sent to
  service?: number;
  // Whether to accept all messages. Default false, onMessage will only emit biz related messages
  acceptAllBizMessages?: boolean;
  // The accepted biz message, the default is the incoming biz.
  acceptBiz?: string[];
  // FWS initialization parameter
  fwsOptions?: any;
}

export interface FrontierEventMap {
  error: any;
  message: any;
  open: any;
  close: any;
  ack: any;
}

export class Connection {
  readonly service?: number;

  constructor(props: ConnectionOptions, channel: any) {}

  /**
   * Get connection parameters
   */
  getInitConfig() {}

  getLaunchConfig() {}

  /**
   * Monitor fws
   */
  addEventListener(event: string, listener: (data: any) => void) {}

  /**
   * Remove fws listening
   */
  removeEventListener<T extends keyof Record<string, any>>(
    event: T,
    listener: (data: Record<string, any>[T]) => void,
  ) {}

  send(data: any, options: any = {}) {}

  reconnect() {}

  pingOnce() {}

  // To close the connection, you need to notify the manager, and it will decide whether to really close the channel
  close() {}

  destroy() {}
}

export class WebSocketManager {
  deviceId = '';

  channel: any = null;

  /**
   * Create a connection instance
   */
  createConnection(options: ConnectionOptions): Connection {
    return new Connection(options, this.channel);
  }

  /**
   * Create a new WS channel without reusing the existing channel
   */
  createChannel(options: ConnectionOptions) {}
}

export default new WebSocketManager();

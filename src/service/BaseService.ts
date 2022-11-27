import {EventEmitter} from "events";

class BaseService {
  static uuid: number = 0
  static emitter = new EventEmitter()

  private uuid = BaseService.uuid ++

  private getChannel(channel: string) {
    return `[${this.uuid}]${channel}`
  }

  public next(channel: string, ...params) {
    return BaseService.emitter.emit(this.getChannel(channel), ...params)
  }

  public on(channel: string, listener: (...params: any[]) => void) {
    return BaseService.emitter.on(this.getChannel(channel), listener)
  }

  public once(channel: string, listener: (...params: any[]) => void) {
    return BaseService.emitter.once(this.getChannel(channel), listener)
  }

  public off(channel: string, listener: (...params: any[]) => void) {
    return BaseService.emitter.off(this.getChannel(channel), listener)
  }
}

export default BaseService
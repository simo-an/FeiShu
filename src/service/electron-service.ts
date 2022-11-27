import {Service} from "typedi";
import {ipcRenderer} from "electron";

@Service()
class ElectronService {
  public minimizeWindow() {
    ipcRenderer.send('main:minimize')
  }

  public maximizeWindow() {
    ipcRenderer.send('main:maximize')
  }

  public closeWindow() {
    ipcRenderer.send('main:close')
  }
}

export default ElectronService
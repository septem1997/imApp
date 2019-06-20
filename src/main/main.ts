import { app, BrowserWindow,ipcMain,Tray,Menu} from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: BrowserWindow;
let appTray:Electron.Tray;

let __static:string;
if (process.env.NODE_ENV !== 'development') {
  __static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}else{
  __static = require('path').join(__dirname, '../../static').replace(/\\/g, '\\\\')
}


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 370,
    center: true,
    resizable: false,
    movable: true,
    minimizable: true,
    maximizable: false,
    closable: true,
    frame: false,
    transparent: true,
    show: true,
    title: '快优易 - IM系统',
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8000/#/');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, './dist/renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  mainWindow.on('closed', () => {
    appTray.destroy()
  });
  initAppTray()
}

function initAppTray() {
  if (process.platform !== 'darwin') {
    appTray = new Tray(__static + '/img/icon/kyy_no_tr.ico')
  }else{
    //苹果系统
    appTray = new Tray(__static + '/img/icon/icon.png')
  }
  appTray.setToolTip('快优易IM系统');
  appTray.on("click",function(){
    mainWindow.show();
  });
  let trayMenuTemplate = [
    {
      label: '打开快优易IM',
      click: function () {
        mainWindow.show();
      }
    },
    {
      label: '退出快优易IM',
      click: function() {
        //清除登陆状态
        app.quit()
      }
    }
    /*{
      label: '账号注销',
      click: function () {
        mainWindow.webContents.send('closeLocal');
        mainWindow.webContents.send('closeSocket');
        if(iconFlash){
          clearInterval(iconFlash);
        }
        resetAppTray()
        switchToLogin(true)
      }
    },
    {
      label: '重新登陆',
      click: function () {
        if(iconFlash){
          clearInterval(iconFlash);
        }
        resetAppTray()
        mainWindow.webContents.send('closeSocket');
        switchToLogin()
      }
    },
    {
      label: '退出快优易IM',
      click: function () {
        //清除登陆状态
        closeWindow();
      }
    }*/
  ];
  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("win-hide",()=>{
  mainWindow.minimize();
})
ipcMain.on("win-close",()=>{
  mainWindow.hide();
})


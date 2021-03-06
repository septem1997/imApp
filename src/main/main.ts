import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: BrowserWindow;
let appTray: Electron.Tray;

let __static: string;
if (process.env.NODE_ENV !== 'development') {
  __static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
} else {
  __static = require('path').join(__dirname, '../../static').replace(/\\/g, '\\\\');
}

let winUrl: string = '';

const iconFlash = false

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
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    winUrl = 'http://localhost:8000';
    mainWindow.loadURL(winUrl);
    mainWindow.webContents.openDevTools();
  } else {
    winUrl = path.join(__dirname, './dist/renderer/index.html');
    mainWindow.loadURL(
      url.format({
        pathname: winUrl,
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  mainWindow.on('closed', () => {
    appTray.destroy();
  });


  mainWindow.on('resize', ()=>{
    if (mainWindow.isMaximized()){
      mainWindow.webContents.send('win-max');
    }else{
      mainWindow.webContents.send('win-un-max');
    }
  })

  initAppTray(true);
}


function switchToLogin(resetLoginData?) {
  mainWindow.webContents.send("win-fade",resetLoginData)
  setTimeout(()=>{
    mainWindow.hide()
    mainWindow.setMinimumSize(600,370)
    mainWindow.setSize(600,370)
    mainWindow.setResizable(false)
    mainWindow.setMaximizable(false)
    mainWindow.center()
    mainWindow.loadURL(winUrl + "#/login")
    initAppTray(true)
  },500)
}


function initAppTray(hideOption?) {
  if (appTray){
    appTray.destroy()
  }
  if (process.platform !== 'darwin') {
    appTray = new Tray(__static + '/img/icon/kyy_no_tr.ico');
  } else {
    //苹果系统
    appTray = new Tray(__static + '/img/icon/icon.png');
  }
  appTray.setToolTip('快优易IM系统');
  appTray.on('click', function() {
    mainWindow.show();
  });
  let trayMenuTemplate = hideOption?[
    {
      label: '打开快优易IM',
      click: function() {
        mainWindow.show();
      },
    },
    {
      label: '退出快优易IM',
      click: function() {
        //清除登陆状态
        app.quit();
      },
    },
  ]:[
    {
      label: '打开快优易IM',
      click: function() {
        mainWindow.show();
      },
    },
    {
      label: '账号注销',
      click: function () {
        if(iconFlash){
          clearInterval(iconFlash);
        }
        initAppTray(hideOption)
        switchToLogin(true)
      }
    },
    {
      label: '重新登陆',
      click: function () {
        if(iconFlash){
          clearInterval(iconFlash);
        }
        initAppTray(hideOption)
        switchToLogin()
      }
    },
    {
      label: '退出快优易IM',
      click: function() {
        //清除登陆状态
        app.quit();
      },
    },
  ]
  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
}

function login() {
  mainWindow.hide();
  setTimeout(() => {
    mainWindow.setMinimumSize(1100, 640);
  }, 0); //此处为electron的bug，需要延时设置，当前版本为5.0.5，若后续版本已修复该问题可移除掉该定时器
  mainWindow.setSize(1200, 640);
  mainWindow.setResizable(true);
  mainWindow.setMaximizable(true);
  mainWindow.center();
  mainWindow.loadURL(winUrl + '#/main');
  initAppTray()
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


ipcMain.on('win-hide', () => {
  mainWindow.minimize();
});
ipcMain.on('win-close', () => {
  mainWindow.hide();
});
ipcMain.on('win-show', () => {
  mainWindow.show();
});
ipcMain.on('win-max', () => {
  mainWindow.maximize();
  mainWindow.webContents.send('win-max');

});

ipcMain.on('win-un-max', () => {
  mainWindow.unmaximize();
  mainWindow.webContents.send('win-un-max');

});

ipcMain.on('login', () => {
  login();
});


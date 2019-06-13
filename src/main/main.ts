import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 640,
    height: 410,
    center: true,
    //改变大小
    resizable: false,
    //是否可以移动
    movable: true,
    //窗口是否可以最小化
    minimizable: true,
    //是否可以最大化
    maximizable: false,
    //窗口是否可以关闭
    closable: true,
    //无边框窗体
    frame: false,
    transparent: true,
    //mac下有效，代替frame为false
    //titleBarStyle: 'hidden',
    show: false,
    title: '快优易 - IM系统',
    // 窗口总是在前
    alwaysOnTop: false,
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8000/#/login');
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
    mainWindow = null;
  });
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


/*jshint esnext: true */ //you should set this option so JSHint doesn't raise unnecessary warnings


const electron = require('electron');
const {ipcMain} = require('electron');
const app = electron.app; // Module to control application life.
const BrowserWindow = electron.BrowserWindow; // Module to create native browser window.
const path = require('path');
const url = require('url');

var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

ipcMain.on('iframe_body_html_retrieved', function (event, value) {
  saveFile('result.html', value)
  .then(value => {
  });
});

ipcMain.on('print_console_event', function(event, value) {
  console.log(value);
});

function createWindow () {
  // Create the browser window.
  // webSecurity:false - to disable the same-origin policy. We need to retrieve iframe html from another domain.
  // for more info see this answer http://stackoverflow.com/a/7836671/759685
  mainWindow = new BrowserWindow({width: 1600, height: 800, webPreferences:{webSecurity:false}});

  // and load the index.html of the app.
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  mainWindow.webContents.on('dom-ready', function () {
    console.log('dom ready');

  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('did-finish-load');
    showVideo();
    // retrieveMovieIframeInnerHTML();
  });
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  mainWindow.loadURL('http://gidonline.club/2011/05/vlastelin-kolec-bratstvo-kolca/');
  // mainWindow.loadURL('http://gidonline.club/2011/05/vlastelin-kolec-bratstvo-kolca/');

    // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function retrieveMovieIframeInnerHTML () {
  readFile('scripts/get_movie_iframe_html.js')
  .then(scriptData => {
    return retrieveMovieIframeFromWebContentExecutingJavaScript(scriptData);
  }) .catch(error => {
    console.log("error" + err);
  });
}

function readFile(filepath) {
  console.log('will read file');
  return new Promise(function(resolve, reject) {
    fs.readFile(filepath, 'utf-8', function (err, data) {
      if(err) {
        reject(err);
      } else {
        console.log('did read file');
        resolve(data);
      }
    });
  });
}

function saveFile(filepath, content) {
  console.log('will save file');
  return new Promise(function(resolve, reject) {
    fs.writeFile(filepath, content, function (err) {
      if(err) {
        reject(err);
      } else {
        console.log('did save file');
        resolve();
      }
    });
  });
}

function retrieveMovieIframeFromWebContentExecutingJavaScript(scriptData) {
    console.log('will execute java script');
    mainWindow.webContents.executeJavaScript(scriptData);
    console.log('did execute java script');
}
//-----------------------------
function showVideo() {
  readFile('scripts/showVideo.js')
  .then(scriptData => {
    mainWindow.webContents.executeJavaScript(scriptData);
  }).catch(error => {
    console.log("error" + err);
  });
}

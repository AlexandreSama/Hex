const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');

let mainWindow;
let mainPath = app.getPath('appData') + '\\Hex'
let paramPath = mainPath + '\\settings.json'
let javaPath = mainPath + '\\java\\'
let modsPath = mainPath + '\\mods\\'

function createWindow () {

  mainWindow = new BrowserWindow({width: 1800, height: 1200}); // on définit une taille pour notre fenêtre

  mainWindow.loadURL(`file://${__dirname}/assets/views/main.html`); // on doit charger un chemin absolu

  if(!fs.existsSync(mainPath)){
    fs.mkdirSync(mainPath)
    fs.mkdirSync(javaPath)
    fs.mkdirSync(modsPath)
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
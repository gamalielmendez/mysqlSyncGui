require('electron-reload')(__dirname);
const { app, BrowserWindow, screen } = require('electron');
const initDb = require('./src/database/initdb')

const createWindow = async () => {
    
    initDb()

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    
    window = new BrowserWindow({
        width: width / 1.25,
        height: height / 1.25,
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js'
        }
    });

    window.loadFile('public/index.html');
};

let window = null;

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit());
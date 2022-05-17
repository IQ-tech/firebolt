const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webSecurity: false,
    allowRunningInsecureContent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:3000/");

  win.webContents.openDevTools();

  // waint until vite load, and reload page
  setTimeout(() => {
    win.reload();
  }, [1000]);

  win.on("closed", function () {
    mainWindow = null;
  });
};


app.whenReady().then(() => {
  createWindow();
});

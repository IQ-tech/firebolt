const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webSecurity: false,
    allowRunningInsecureContent: true
  });

  win.loadURL("http://127.0.0.1:3000/");
  win.on("closed", function () {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();
});

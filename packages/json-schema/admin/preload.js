// middleware between ui and native
const { contextBridge } = require('electron')
const fs = require("fs")

contextBridge.exposeInMainWorld('electron', {
  batata: (data) => {
    const files = fs.readdirSync(__dirname)
    return files
  }
})
import { app, BrowserWindow, ipcMain } from "electron"
import started from "electron-squirrel-startup"
import fs from "fs"
import path from "node:path"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      allowRunningInsecureContent: false,
      // webSecurity: false, // Disable web security for development purposes
    },
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow
      .loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
      .catch((error: unknown) => {
        console.error("Failed to load main window:", error)
      })
  } else {
    mainWindow
      .loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      )
      .catch((error: unknown) => {
        console.error("Failed to load main window:", error)
      })
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

ipcMain.handle(
  "read-file",
  async (_event, filePath: string): Promise<string> => {
    try {
      const data = await fs.promises.readFile(filePath, "utf-8")
      return data
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error) {
        if (error.code === "ENOENT") {
          // File not found
          return "ENOENT"
        }
      }
      // Other errors
      return error instanceof Error ? error.message : String(error)
    }
  },
)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

import { readText } from '@tauri-apps/plugin-clipboard-manager'
import { getClipboardHistory, saveClipboard } from './service'

let monitorInterval: ReturnType<typeof setInterval> | null = null

export const startMonitorClipboard = async () => {
  if (monitorInterval) return

  monitorInterval = setInterval(async () => {
    try {
      const clipboard = await readText()
      const latestClip = await getClipboardHistory(1).then((clips) => clips[0])
      const prev = latestClip ? latestClip.content : null
      if (clipboard === prev) return

      await saveClipboard(clipboard)
    } catch (error) {
      console.error('Clipboard monitoring error:', error)
    }
  }, 1000)
}

export const stopMonitorClipboard = () => {
  if (monitorInterval) {
    clearInterval(monitorInterval)
    monitorInterval = null
  }
}

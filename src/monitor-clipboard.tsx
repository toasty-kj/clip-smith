import { readText } from '@tauri-apps/plugin-clipboard-manager'
import { getClipboardHistory, saveClipboard } from './service'
import { ClipboardHistory } from './interface'
import { Dispatch } from 'react'

let monitorInterval: ReturnType<typeof setInterval> | null = null

export const startMonitorClipboard = async (
  setClipList: Dispatch<React.SetStateAction<ClipboardHistory[]>>
) => {
  if (monitorInterval) return

  monitorInterval = setInterval(async () => {
    try {
      const clipboard = await readText()
      const latestClip = await getClipboardHistory(1).then((clips) => clips[0])
      const previousClip = latestClip ? latestClip.content : null
      if (clipboard === previousClip) return

      await saveClipboard(clipboard)
      const newClip = await getClipboardHistory(10)
      setClipList(newClip)
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

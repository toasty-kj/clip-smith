import { isRegistered, register } from '@tauri-apps/plugin-global-shortcut'
import { startMonitorClipboard } from '../monitor-clipboard'
import { Window } from '@tauri-apps/api/window'

export const initialize = async (getClipboard: () => Promise<void>) => {
  try {
    startMonitorClipboard()
    await getClipboard()

    const window = Window.getCurrent()
    const isRegist = await isRegistered('CommandOrControl+Shift+v')
    if (isRegist) return

    await register('CommandOrControl+Shift+v', async () => {
      await window.show()
      await window.setFocus()
    })
  } catch (error) {
    console.error('Initialization error:', error)
  }
}

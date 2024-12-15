import './App.css'
import { ClipboardHistory } from './interface'
import {
  clearHistory as _clearHistory,
  getClipboardHistory,
  simulatePaste
} from './service'
import {
  startMonitorClipboard,
  stopMonitorClipboard
} from './monitor-clipboard'
import { useState, useEffect } from 'react'
import ClipBoardList from './components/clip-board-list'
import { Window } from '@tauri-apps/api/window'
import {
  isRegistered,
  register,
  unregister
} from '@tauri-apps/plugin-global-shortcut'

function App() {
  const [clipList, setClipList] = useState<ClipboardHistory[]>([])

  useEffect(() => {
    const initialize = async () => {
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

    initialize()

    return () => {
      unregister('CommandOrControl+Shift+V')
      stopMonitorClipboard()
    }
  }, [])

  const getClipboard = async () => {
    const recentClips: ClipboardHistory[] = await getClipboardHistory(10)
    setClipList(recentClips)
  }

  const clearHistory = async () => {
    await _clearHistory()
    setClipList([])
  }

  const onSelect = async (content: string) => {
    await navigator.clipboard.writeText(content)
    const window = Window.getCurrent()
    await window.hide()
    await simulatePaste()
  }

  return (
    <>
      <main>
        <ClipBoardList clipBoardList={clipList} onSelect={onSelect} />
      </main>
    </>
  )
}

export default App

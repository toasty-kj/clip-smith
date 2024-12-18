import './App.css'
import { ClipboardHistory } from './interface'
import {
  clearHistory as _clearHistory,
  getClipboardHistory,
  simulatePaste
} from './service'
import { stopMonitorClipboard } from './monitor-clipboard'
import { useState, useEffect } from 'react'
import ClipBoardList from './components/clip-board-list'
import { Window } from '@tauri-apps/api/window'
import { unregister } from '@tauri-apps/plugin-global-shortcut'
import { handleKeyDown, initialize } from './actions'
import { HStack } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { SearchForm } from './components/search-form'

function App() {
  const [clipList, setClipList] = useState<ClipboardHistory[]>([])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    initialize(getClipboard, setClipList)

    return () => {
      unregister('CommandOrControl+Shift+V')
      stopMonitorClipboard()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const getClipboard = async () => {
    const recentClips = await getClipboardHistory(15)
    setClipList(recentClips)
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
        <SearchForm />
        <ClipBoardList clipBoardList={clipList} onSelect={onSelect} />
      </main>
    </>
  )
}

export default App

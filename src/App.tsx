import './App.css'
import { ClipboardHistory } from './interface'
import {
  clearHistory as _clearHistory,
  getClipboardHistory,
  simulatePaste
} from './service'
import { stopMonitorClipboard } from './monitor-clipboard'
import { useState, useEffect, useRef } from 'react'
import ClipBoardList from './components/clip-board-list'
import { Window } from '@tauri-apps/api/window'
import { unregister } from '@tauri-apps/plugin-global-shortcut'
import { handleKeyDown, initialize } from './actions'
import { SearchForm } from './components/search-form'

function App() {
  const [clipList, setClipList] = useState<ClipboardHistory[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.addEventListener('keydown', (event) =>
      handleKeyDown(event, searchInputRef)
    )
    initialize(getClipboard, setClipList)

    return () => {
      unregister('CommandOrControl+Shift+V')
      stopMonitorClipboard()
      window.removeEventListener('keydown', (event) =>
        handleKeyDown(event, searchInputRef)
      )
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
        <SearchForm ref={searchInputRef} />
        <ClipBoardList clipBoardList={clipList} onSelect={onSelect} />
      </main>
    </>
  )
}

export default App

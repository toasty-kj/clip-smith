import './App.css'
import { ClipboardHistory } from './interface'
import { clearHistory as _clearHistory, getClipboardHistory } from './service'
import {
  startMonitorClipboard,
  stopMonitorClipboard
} from './monitor-clipboard'
import { useState, useEffect } from 'react'
import ClipBoardList from './components/clip-board-list'

function App() {
  const [clipList, setClipList] = useState<ClipboardHistory[]>([])

  useEffect(() => {
    startMonitorClipboard()
    getClipboard()
    return () => stopMonitorClipboard()
  }, [])

  const getClipboard = async () => {
    const recentClips: ClipboardHistory[] = await getClipboardHistory(10)
    setClipList(recentClips)
  }

  const clearHistory = async () => {
    await _clearHistory()
    setClipList([])
  }

  const onSelect = (content: string) => {
    navigator.clipboard.writeText(content)
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

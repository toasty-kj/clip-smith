import "./App.css";
import { ClipboardHistory } from "./interface";
import { clearHistory as _clearHistory, getClipboardHistory } from "./clipboar.service";
import {  startMonitorClipboard, stopMonitorClipboard } from "./monitor-clipboard";
import { useState, useEffect } from "react";

function App() {
  const [clipList, setClipList] = useState<ClipboardHistory[]>([]);

  useEffect(() => {
    startMonitorClipboard();
    getClipboard();
    return () => stopMonitorClipboard();
  }, []);

  const getClipboard = async () => {
    const recentClips: ClipboardHistory[] = await getClipboardHistory(10);
    setClipList(recentClips);
  };

  const clearHistory = async () => {
    await _clearHistory();
    setClipList([]);
  };

  return (
    <main className="container">
        <button type="submit" onClick={getClipboard}>
          Get Clipboard
        </button>
        <button type="submit" onClick={clearHistory}>
          clear history
        </button>
      <ul>
        {clipList.map((clip) => (
          <li key={clip.id}>{clip.content}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;

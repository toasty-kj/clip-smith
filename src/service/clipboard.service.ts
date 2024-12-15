import { invoke } from '@tauri-apps/api/core'
import { ClipboardHistory } from '../interface'

export const getClipboardHistory = async (
  limit: number
): Promise<ClipboardHistory[]> => {
  const clipboardHistory = await invoke('get_clips', { limit })
  return clipboardHistory as ClipboardHistory[]
}

export const saveClipboard = async (content: string): Promise<void> => {
  await invoke('save_clipboard', { content })
}

export const clearHistory = async (): Promise<void> => {
  await invoke('clear_history', {})
}

export const consoleLog = async (content: string): Promise<void> => {
  await invoke('console_log', { content })
}

export const simulatePaste = async (): Promise<void> => {
  await invoke('simulate_paste', {})
}

/** get clipboard history for one week */
export const getRecentClips = async (): Promise<ClipboardHistory[]> => {
  const recentClips = await invoke('get_recent_clips', {})
  return recentClips as ClipboardHistory[]
}

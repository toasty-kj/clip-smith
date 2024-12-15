import { Window } from '@tauri-apps/api/window'

export const handleKeyDown = async (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    const window = Window.getCurrent()
    const isVisible = await window.isVisible()
    if (!isVisible) return
    await window.hide()
  }
}

import { Window } from '@tauri-apps/api/window'

export const handleKeyDown = async (
  event: KeyboardEvent,
  searchInputRef: React.RefObject<HTMLInputElement>
) => {
  // KeyList to ignore
  const ignoredKeys = [
    'ArrowUp',
    'ArrowDown',
    'Enter',
    'Escape',
    'Tab',
    'Control',
    'Alt',
    'Shift',
    'Meta'
  ]

  if (
    !ignoredKeys.includes(event.key) &&
    document.activeElement !== searchInputRef.current
  ) {
    searchInputRef.current?.focus()
    return
  }

  if (event.key === 'Escape') {
    if (document.activeElement === searchInputRef.current) {
      searchInputRef.current?.blur()
      return
    }

    const window = Window.getCurrent()
    const isVisible = await window.isVisible()
    if (!isVisible) return
    await window.hide()
  }
}

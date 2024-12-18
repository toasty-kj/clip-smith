import { useEffect, useState } from 'react'
import { FuzzyFilterResult } from '../interface'
import { Highlight } from '@nozbe/microfuzz/react'

interface Props {
  clipBoardList: FuzzyFilterResult[]
  onSelect: (content: string) => void
}

export default function ClipBoardList({ clipBoardList, onSelect }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : clipBoardList.length - 1
          )
          break
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex((prev) =>
            prev < clipBoardList.length - 1 ? prev + 1 : 0
          )
          break
        case 'Enter':
          event.preventDefault()
          if (clipBoardList[selectedIndex]) {
            onSelect(clipBoardList[selectedIndex].item.content)
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [clipBoardList, selectedIndex, onSelect])

  return (
    <ul>
      {clipBoardList.map(({ item, highlightRanges }, index) => (
        <li
          key={item.id}
          className={`
            p-2.5 border-b border-gray-200 cursor-pointer
            hover:bg-blue-200 dark:hover:bg-gray-500 transition-colors
            ${index === selectedIndex ? 'bg-blue-200 dark:bg-gray-500' : ''}
          `}
          onClick={() => {
            setSelectedIndex(index)
            onSelect(item.content)
          }}
        >
          <Highlight
            className="truncate text-sm"
            text={item.content}
            ranges={highlightRanges}
          />
          <div className="text-xs text-gray-500">
            {new Date(item.timestamp).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  )
}

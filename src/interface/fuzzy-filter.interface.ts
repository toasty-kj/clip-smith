import { HighlightRanges } from '@nozbe/microfuzz'
import { ClipboardHistory } from './clib-board-history.interface'

export interface FuzzyFilterResult {
  item: ClipboardHistory
  highlightRanges: HighlightRanges | null
}

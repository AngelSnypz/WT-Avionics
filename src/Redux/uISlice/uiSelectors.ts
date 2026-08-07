import { memoize } from "proxy-memoize"
import type { uiSliceType } from "./uiSlice"

export const selectPlaceholder = memoize((state: uiSliceType) => {
  return state.placeholder
})

import { useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'

export default function useScroll(callback: () => void) {
  const prevY = useRef(0)
  const prevX = useRef(0)
  useEffect(() => {
    const $scroll = fromEvent(window.document, 'scroll')
    const scrollSub = $scroll.subscribe((event) => {
      const { scrollY, scrollX } = window
      prevY.current = scrollY
      prevX.current = scrollX

      callback()
    })
    return () => scrollSub.unsubscribe()
  }, [])

  return { prevY, prevX }
}

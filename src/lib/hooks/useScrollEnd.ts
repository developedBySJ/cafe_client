// custom hook that will be used as a callback for scrollEnd

import { useEffect } from 'react'

export const useScrollEnd = (func: () => void, offset = 100): void => {
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - offset) {
        func()
      }
    })
    return () => {
      window.removeEventListener('scroll', func)
    }
  }, [])
}

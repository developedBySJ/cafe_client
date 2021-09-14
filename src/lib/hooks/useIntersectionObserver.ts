import React from 'react'

interface UseIntersectionObserverArgs<T, K> {
  root?: React.MutableRefObject<K>
  target?: any
  onIntersect: Function
  threshold?: number | number[]
  rootMargin?: string
  enabled?: boolean
  update?: any
}

type UseIntersectionObserver<T = any, K = any> = (args: UseIntersectionObserverArgs<T, K>) => void

export const useIntersectionObserver: UseIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '100px',
  enabled = true,
  update,
}) => {
  React.useEffect(() => {
    // console.log({ enabled })
    if (!enabled) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      },
    )

    const el = target && target.current

    if (!el) {
      return
    }

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [target, target?.current, enabled, update])
}

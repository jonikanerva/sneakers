import React, { useEffect, useState, createContext, useContext } from 'react'

const VisibilityContext = createContext({ isVisible: false, entries: [] })

interface Props extends IntersectionObserverInit {
  children: React.ReactNode
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

const TrackVisibility: React.FC<Props> = ({
  children,
  root = null,
  rootMargin = '50px 50px 50px 50px',
  threshold = 0
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [entries, setEntries] = useState()
  const ref = React.createRef() as React.RefObject<HTMLDivElement>

  const observerOptions = { root, rootMargin, threshold }
  const observerCallback: IntersectionObserverCallback = observerEntries => {
    const visible =
      observerEntries.filter(obj => obj.isIntersecting === true).length > 0

    setEntries(observerEntries)
    setIsVisible(visible)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={ref}>
      <VisibilityContext.Provider value={{ isVisible, entries }}>
        {children}
      </VisibilityContext.Provider>
    </div>
  )
}

const useTrackVisibility = () => {
  const { isVisible, entries } = useContext(VisibilityContext)

  return {
    isVisible,
    entries: entries as IntersectionObserverEntry[]
  }
}

export { TrackVisibility, useTrackVisibility }
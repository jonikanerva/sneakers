import React, { useEffect, useState, createContext, useContext } from 'react'

const VisibilityContext = createContext({ isVisible: false })

interface Props {
  children: React.ReactNode
  root?: Element | null
  rootMargin?: string
  threshold?: number
}

const TrackVisibility: React.FC<Props> = ({
  children,
  root = null,
  rootMargin = '50px 50px 50px 50px',
  threshold = 0
}) => {
  const [visible, setVisible] = useState(false)
  const ref = React.createRef() as React.RefObject<HTMLDivElement>
  const observerOptions = { root, rootMargin, threshold }
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    const isVisible =
      entries.filter(obj => obj.isIntersecting === true).length > 0

    if (isVisible === true) {
      setVisible(true)
    }
  }
  const observer = new IntersectionObserver(observerCallback, observerOptions)

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref])

  return (
    <div ref={ref}>
      <VisibilityContext.Provider value={{ isVisible: visible }}>
        {children}
      </VisibilityContext.Provider>
    </div>
  )
}

const useTrackVisibilityContext = () => {
  const { isVisible } = useContext(VisibilityContext)

  return isVisible
}

export { TrackVisibility, useTrackVisibilityContext }

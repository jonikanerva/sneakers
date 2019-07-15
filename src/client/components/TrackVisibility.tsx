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

    setVisible(isVisible)
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
      <VisibilityContext.Provider value={{ isVisible: visible }}>
        {children}
      </VisibilityContext.Provider>
    </div>
  )
}

const useTrackVisibility = () => {
  const { isVisible } = useContext(VisibilityContext)

  return isVisible
}

export { TrackVisibility, useTrackVisibility }

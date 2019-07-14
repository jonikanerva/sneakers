import React, { useEffect, useState, createContext, useContext } from 'react'
import * as R from 'ramda'

const VisibilityContext = createContext({ isVisible: false })

const useTrackVisibilityContext = () => {
  const { isVisible } = useContext(VisibilityContext)

  return isVisible
}

type divRef = React.RefObject<HTMLDivElement>
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
  const ref = React.createRef() as divRef
  const observerOptions = { root, rootMargin, threshold }
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    const isVisible = R.any(R.propEq('isIntersecting', true), entries)

    if (isVisible) {
      setVisible(isVisible)
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

export { TrackVisibility, useTrackVisibilityContext }

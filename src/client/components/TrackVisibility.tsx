import React, { useEffect, useState, createContext, useContext } from 'react'
import { throttle } from 'lodash'

export const isElementVisible = (
  element: Element | null,
  offset: number
): boolean => {
  if (element === null) {
    return false
  }

  const { innerHeight, innerWidth } = window
  const { clientHeight, clientWidth } = document.documentElement
  const { top, left, bottom, right } = element.getBoundingClientRect()

  const width = innerWidth || clientWidth
  const height = innerHeight || clientHeight

  const topThreshold = 0 - offset
  const leftThreshold = 0 - offset
  const rightTreshhold = width + offset
  const bottomThreshold = height + offset

  return (
    top >= topThreshold &&
    bottom <= bottomThreshold &&
    left >= leftThreshold &&
    right <= rightTreshhold
  )
}

const attachListener = (visibilityListener: (args: any) => void): void => {
  window.addEventListener('scroll', visibilityListener)
  window.addEventListener('resize', visibilityListener)
}

const removeListener = (visibilityListener: (args: any) => void): void => {
  window.removeEventListener('scroll', visibilityListener)
  window.removeEventListener('resize', visibilityListener)
}

const VisibilityContext = createContext({ isVisible: false })

const useTrackVisibilityContext = () => {
  const { isVisible } = useContext(VisibilityContext)

  return isVisible
}

type divRef = React.RefObject<HTMLDivElement>
interface Props {
  children: React.ReactNode
  throttleWait?: number
  visibilityOffset?: number
}

const TrackVisibility: React.FC<Props> = ({
  children,
  throttleWait = 300,
  visibilityOffset = 500
}) => {
  const [visible, setVisible] = useState(false)
  const ref = React.createRef() as divRef

  const checkVisibility = throttle(
    () => setVisible(isElementVisible(ref.current, visibilityOffset)),
    throttleWait
  )

  useEffect(() => {
    attachListener(checkVisibility)
    setVisible(isElementVisible(ref.current, visibilityOffset))

    return () => removeListener(checkVisibility)
  }, [ref])

  useEffect(() => {
    if (visible === true) {
      removeListener(checkVisibility)
    }
  }, [visible])

  return (
    <div ref={ref}>
      <VisibilityContext.Provider value={{ isVisible: visible }}>
        {children}
      </VisibilityContext.Provider>
    </div>
  )
}

export { TrackVisibility, useTrackVisibilityContext }

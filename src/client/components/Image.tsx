import React, { useEffect, useState } from 'react'
import TrackVisibility from 'react-on-screen'
import * as R from 'ramda'
import './Image.css'

interface Props {
  id: number
  published: string
  url: string
  title: string
  content: string
  image: string
}

const removeSmallImage = (id: string): void => {
  const element = window.document.getElementById(id)
  const height: number = R.propOr(0, 'naturalHeight', element)
  const width: number = R.propOr(0, 'naturalWidth', element)
  const parent: HTMLElement | undefined = R.path(
    ['parentElement', 'parentElement'],
    element
  )

  if ((width < 100 || height < 100) && parent) {
    parent.style.display = 'none'
  }
}

const Image: React.FC<Props> = ({ url, title, image, id }) => {
  const imageId = String(id)
  const [visible, setVisible] = useState(false)

  useEffect(() => removeSmallImage(imageId), [id, visible])

  return (
    <TrackVisibility once={true} offset={1000} className="image--tile">
      {({ isVisible }) => {
        setVisible(isVisible)

        return (
          isVisible && (
            <a href={url}>
              <img
                id={imageId}
                className="image--img"
                title={title}
                alt={title}
                src={image}
              />
            </a>
          )
        )
      }}
    </TrackVisibility>
  )
}

export default Image

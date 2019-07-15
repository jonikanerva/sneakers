import React from 'react'
import * as R from 'ramda'
import { useVisibilityObserver } from 'react-visibility-observer'
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
  const { isVisible } = useVisibilityObserver()

  return (
    <div className="image--tile">
      <a href={url}>
        <img
          alt={title}
          className="image--img"
          id={imageId}
          onLoad={() => removeSmallImage(imageId)}
          src={isVisible ? image : ''}
          title={title}
        />
      </a>
    </div>
  )
}

export default Image

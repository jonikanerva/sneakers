import React, { useEffect } from 'react'
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

  useEffect(() => removeSmallImage(imageId), [id])

  return (
    <div className="image--tile">
      <a href={url}>
        <img
          id={imageId}
          className="image--img"
          title={title}
          alt={title}
          src={image}
        />
      </a>
    </div>
  )
}

export default Image

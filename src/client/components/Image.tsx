import React from 'react'
import './Image.css'

interface Props {
  id: number
  published: string
  url: string
  title: string
  content: string
  image: string
}

const Image: React.FC<Props> = ({ url, title, image }) => (
  <div className="image--tile">
    <a href={url}>
      <img className="image--img" title={title} alt={title} src={image} />
    </a>
  </div>
)

export default Image

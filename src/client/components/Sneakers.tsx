import React, { useState, useEffect } from 'react'

import Image from './Image'
import './Sneakers.css'

interface Props {
  brand: 'nike' | 'jordan' | 'adidas'
}

const Sneakers: React.FC<Props> = ({ brand }) => {
  const [feed, setFeed] = useState([])

  useEffect(() => {
    fetch(`/feed/${brand}`)
      .then(res => res.json())
      .then(setFeed)
  }, [brand])

  return (
    <div className="sneakers">
      {feed.map((sneaker, i) => (
        <Image key={i} {...sneaker} />
      ))}
    </div>
  )
}

export default Sneakers

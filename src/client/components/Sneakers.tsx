import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import Date from './Date'
import Image from './Image'
import './Sneakers.css'

interface Props {
  brand: 'nike' | 'jordan' | 'adidas'
}

const formatDate = (date: string): string =>
  DateTime.fromISO(date).toLocaleString({
    weekday: 'long',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  })

const Sneakers: React.FC<Props> = ({ brand }) => {
  let lastDay = ''
  const [feed, setFeed] = useState([])

  useEffect(() => {
    fetch(`/feed/${brand}`)
      .then(res => res.json())
      .then(setFeed)
  }, [brand])

  return (
    <div className="sneakers">
      {feed.map((sneaker, i) => {
        const { published } = sneaker
        const day = formatDate(published)
        const dateChanged = lastDay !== day
        lastDay = day

        return (
          <React.Fragment key={i}>
            {dateChanged && <Date date={day} />}
            <Image {...sneaker} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Sneakers
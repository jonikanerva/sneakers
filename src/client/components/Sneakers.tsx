import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import Date from './Date'
import Image from './Image'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import VisibilityObserver from 'react-visibility-observer'

import './Sneakers.css'

interface Props {
  brand: 'nike' | 'jordan' | 'adidas' | 'newbalance'
}

const formatDate = (date: string): string =>
  DateTime.fromISO(date).toLocaleString({
    weekday: 'long',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }) || ''

const Sneakers: React.FC<Props> = ({ brand }) => {
  let lastDay = ''
  const [feed, setFeed] = useState([])

  useEffect(() => {
    fetch(`/feed/${brand}`)
      .then((res) => res.json())
      .then(setFeed)
  }, [brand])

  return (
    <div className="sneakers">
      <ScrollToTopOnMount />
      {feed.map((sneaker, i) => {
        const { published } = sneaker
        const day = formatDate(published)
        const dateChanged = lastDay !== day
        const { image } = sneaker
        lastDay = day

        return (
          <React.Fragment key={`${i}-${image}`}>
            {dateChanged && <Date date={day} />}
            <VisibilityObserver
              className="sneakers--tile"
              rootMargin="200px 200px 200px 200px"
              triggerOnce={true}
            >
              <Image {...sneaker} />
            </VisibilityObserver>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Sneakers

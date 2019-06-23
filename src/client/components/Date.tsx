import React from 'react'
import './Date.css'

interface Props {
  date: string
}

const Date: React.FC<Props> = ({ date }) => <div className="date">{date}</div>

export default Date

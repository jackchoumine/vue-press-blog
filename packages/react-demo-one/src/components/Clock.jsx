import React from 'react'
import format from 'date-fns/format'

export function Clock({ time }) {
  return <p className='clock'>{format(time, 'hh:mm:ss a')}</p>
}

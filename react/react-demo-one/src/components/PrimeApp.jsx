import React from 'react'
import { getHours } from 'date-fns'
import { PrimeCalculator, Clock } from './index'
const PurePrimeCalculator = React.memo(PrimeCalculator)
export function PrimeApp() {
  // We hold the user's selected number in state.
  // We calculate all of the prime numbers between 0 and the
  // user's chosen number, `selectedNum`:

  // const allPrimes = []
  // for (let counter = 2; counter < selectedNum; counter++) {
  //   if (isPrime(counter)) {
  //     allPrimes.push(counter)
  //   }
  // }

  // const allPrimes = React.useMemo(() => {
  //   const result = []

  //   for (let counter = 2; counter < selectedNum; counter++) {
  //     if (isPrime(counter)) {
  //       result.push(counter)
  //     }
  //   }

  //   return result
  // }, [selectedNum])
  // console.log(format(time, 'hh:mm:ss'))
  const time = useTime()

  // Come up with a suitable background color,
  // based on the time of day:
  const backgroundColor = getBackgroundColorFromTime(time)
  // BUG 为何渲染两次
  // console.log(time)
  return (
    <div style={{ backgroundColor }}>
      <Clock time={time} />
      <PurePrimeCalculator />
    </div>
  )
}
const getBackgroundColorFromTime = time => {
  const hours = getHours(time)

  if (hours < 12) {
    // A light yellow for mornings
    return 'hsl(50deg 100% 90%)'
  } else if (hours < 18) {
    // Dull blue in the afternoon
    return 'hsl(220deg 60% 92%)'
  } else {
    // Deeper blue at night
    return 'hsl(220deg 100% 80%)'
  }
}

function useTime() {
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return time
}

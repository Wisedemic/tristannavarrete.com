import hrtime from 'browser-process-hrtime'

const convertHrtimeToMs = function(time) {
  return time[0] * 1000 + time[1] / 1000000
}

const hrtimeMs = function(prevTime) {
  const now = hrtime()
  if (prevTime) return convertHrtimeToMs(now) - prevTime
  else return convertHrtimeToMs(now)
}

export default hrtimeMs

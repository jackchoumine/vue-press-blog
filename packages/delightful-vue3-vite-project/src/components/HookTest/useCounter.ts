export default function useCounter(initCount: number = 0) {
  const count = ref(initCount)
  function add(step = 1) {
    count.value += step
  }
  function reduce(step = 1) {
    count.value -= step
  }
  return {
    count,
    add,
    reduce,
  }
}

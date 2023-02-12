export function createContext<T>(name = '') {
  // name 哪儿来的
  const contextName = Symbol(`${name}Context`)

  function Provider(payload: T) {
    provide(contextName, payload)
  }

  function useContext() {
    return inject(contextName)
  }
  return [Provider, useContext]
}

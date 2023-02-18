import './components/index.scss'

export function setupVue3({ app }) {
  app.provide('test', 'hello')
  // app.use(...)
}

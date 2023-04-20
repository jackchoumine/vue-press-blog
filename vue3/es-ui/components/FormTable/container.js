export default {
  name: 'Container',
  functional: true,
  render(h, { props }) {
    return props.renderContainer(h, props.data)
  }
}

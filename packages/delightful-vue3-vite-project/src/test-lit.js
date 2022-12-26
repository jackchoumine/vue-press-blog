import { css as p, LitElement as f, html as d } from 'lit'
import { property as c, customElement as h } from 'lit/decorators.js'
const u = Object.defineProperty
const m = Object.getOwnPropertyDescriptor
const n = (r, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? m(e, s) : e, a = r.length - 1, l; a >= 0; a--)
    (l = r[a]) && (o = (i ? l(e, s, o) : l(o)) || o)
  return i && o && u(e, s, o), o
}
let t = class extends f {
  constructor() {
    super(...arguments),
      (this.docsHint = 'Click on the Vite and Lit logos to learn more'),
      (this.array = [0, 2]),
      (this.count = 0)
  }

  render() {
    return d`
      <div>
        <ul>
          ${(this.array ?? []).map(r => d`<li>${r}</li>`)}
        </ul>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">count is ${this.count}</button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
    `
  }

  _onClick() {
    this.count++
  }
}
t.styles = p`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `
n([c()], t.prototype, 'docsHint', 2)
n([c({ type: Array })], t.prototype, 'array', 2)
n([c({ type: Number })], t.prototype, 'count', 2)
t = n([h('my-element')], t)
export { t as MyElement }

class Dom {
  constructor() {
    this._ = document
  }

  getNode(node) {
    return this._.querySelector(node)
  }

  getAllNode(node) {
    return this._.querySelectorAll(node)
  }

  getNodeById(id) {
    return this._.getElementById(id)
  }

  appendChild(child) {
    this._.body.appendChild(child)
  }

  on(event, ele, fn, option = false) {
    ele.addEventListener(event, fn, option)
  }

  createTNode(str) {
    return this._.createTextNode(str)
  }

  createTag(props) {
    if (typeof props === 'string') {
      return this.createTNode(props)
    }

    const { tagName, attrs = {}, children = [] } = props
    const ele = this._.createElement(tagName)
    for (const [k, v] of Object.entries(attrs)) {
      ele.setAttribute(k, v)
    }

    for (const child of children) {
      let cEle
      if (typeof child === 'object') {
        cEle = this.createTag(child)
      } else {
        cEle = this.createTNode(child)
      }
      ele.appendChild(cEle)
    }

    return ele
  }
}

export default new Dom()

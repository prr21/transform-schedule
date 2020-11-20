class BakerieSchedule {
  constructor(selector, options = {}) {
    this.$root = document.querySelector(selector)
    this.apiArr = options.api
    this.data = []
  }

  async init() {
    this.data = await this.getData(this.apiArr)
    this.data = this.data.flat() // [a, [b,c]] => [a,b,c]

    this.render()
  }

  async getData(urls) {
    const promises = urls.map((url) => connect(url)) // connect form data-services.js
    return await Promise.all(promises)
  }

  render() {
    this.data.forEach((bakeryData) => {
      const bakery = new Bakery(bakeryData)
      this.toHTML(bakery)
    })
  }

  toHTML(bakery) {
    this.$root.appendChild(bakery.render())
  }
}

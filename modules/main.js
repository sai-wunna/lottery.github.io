;(async () => {
  const _ = (await import('./dom.js')).default
  const body = _.getNode('body')
  const data_provider = _.getNodeById('data_provider')

  _.on('click', body, handleMoneyFly())

  function handleMoneyFly() {
    let currentMethod = 0
    const flyingMethods = {
      1: 'scale(1.3) translate(0%, -400%)',
      2: 'scale(1.3) translate(400%, -200%)',
      3: 'scale(1.3) translate(400%, 0%)',
      4: 'scale(1.3) translate(200%, 200%)',
      5: 'scale(1.3) translate(0%, 400%)',
      6: 'scale(1.3) translate(-200%, 200%)',
      7: 'scale(1.3) translate(-400%, 0%)',
      8: 'scale(1.3) translate(-200%, -200%)',
    }

    function locatePointer(ele, e) {
      const x = e.pageX
      const y = e.pageY
      ele.style.top = `${y}px`
      ele.style.left = `${x}px`
    }

    function createMoney() {
      return _.createTag({
        tagName: 'span',
        attrs: { class: 'money' },
        children: ['$'],
      })
    }

    return (e) => {
      currentMethod = currentMethod > 7 ? 1 : ++currentMethod
      const money = createMoney()
      locatePointer(money, e)
      let flyTimer = setTimeout(() => {
        money.style.transform = flyingMethods[currentMethod]
        clearTimeout(flyTimer)
      })
      let clearTimer = setTimeout(() => {
        money.remove()
        clearTimeout(clearTimer)
      }, 1100)
      _.appendChild(money)
    }
  }

  ;(function showingData() {
    let encounter = false
    setInterval(() => {
      data_provider.textContent = encounter ? '2D' : '3D'
      encounter = !encounter
    }, 3000)
  })()
})()

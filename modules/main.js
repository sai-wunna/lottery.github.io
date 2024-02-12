;(async () => {
  const _ = (await import('./dom.js')).default
  const body = _.getNode('body')
  const data_provider = _.getNodeById('data_provider')
  const download_counter = _.getNodeById('download_counter')

  _.getNode('h1').style.color = 'transparent'

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

  ;(() => {
    let turn = false
    data_provider.style.animation = 'fadeInOut 5s infinite'
    setInterval(() => {
      data_provider.textContent = turn ? '2D' : '3D'
      turn = !turn
    }, 5000)
  })()
  ;(() => {
    let counter = 0
    let interval = setInterval(() => {
      if (counter > 10000) {
        clearInterval(interval)
        return
      }
      download_counter.textContent = calValue(counter)
    })
    function calValue(num) {
      if (num > 999) {
        counter += 100
        return `${num.toString().slice(0, num.toString().length - 3)}k+`
      } else {
        counter++
        return num
      }
    }
  })()
})()

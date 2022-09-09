import gsap from 'gsap'

export function circleAnimation () {
    let tl1 = gsap.timeline({
      repeat: 0,
    })
    tl1.to('#number-0', { duration: 1.2, borderColor: 'gold', ease: 'power1.inOut', })
    tl1.to('#pick-0 div', {duration: 1.2, backgroundColor: 'gold', color: 'black', delay: -1.2, ease: 'power1.inOut', onStart: () => { bubble() }})
    tl1.to('#number-1', {  duration: 1, borderColor: 'gold', ease: 'power1.inOut', })
    tl1.to('#pick-1 div', { duration: 1, backgroundColor: 'gold', color: 'black', delay: -1, ease: 'power1.inOut', onStart: () => { bubble() }, })
    // rotate and fire animation
    tl1.to('#fireball div span', { duration: 1, rotate: 135, ease: 'elastic.inOut' })
    tl1.to('#fireball div span', { duration: 1, rotate: 0, delay: .5, ease: 'elastic.inOut' })
  
    tl1.to('#fireball', { duration: 1, x: 120, y: 184.5,rotate: 0, delay: -.5, ease: 'elastic.out' })
    tl1.to('#fireball', { duration: 1, borderColor: 'gold', ease: 'power1.inOut' })
    tl1.to('#pick-2 div', { duration: 1, backgroundColor: 'gold', color: 'black',  delay: -1, ease: 'power1.inOut', onStart: () => { bubble() }})
  }

  const bubble = () => {
    let bubble = new Audio('../audio/sprite/bubble-pop.mp3')
    bubble.play()
  }
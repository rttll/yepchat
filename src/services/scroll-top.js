let el, start, duration, dist;

const easing = {
  quad: function(timeFraction) {
    return Math.pow(timeFraction, 2)
  }
}

const draw = (progress) => {
  let percent = dist * progress;
  let l = percent * 100 + el.scrollTop
  el.scrollTop = l
}

function animate() {
  let frac = (performance.now() - start) / duration;
  if (frac > 1) frac = 1;
  let progress = easing.quad(frac)
  draw(progress)
  if (frac < 1) requestAnimationFrame(animate)
}

export default (target) => {
  el = target
  dist = el.scrollHeight - el.scrollTop;

  start = performance.now()
  duration = 1000
  
  animate()
}
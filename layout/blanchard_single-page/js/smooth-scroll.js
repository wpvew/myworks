document.addEventListener('DOMContentLoaded', () => {
  const link = document.querySelectorAll('a');
  link.forEach(function(eventClick) {
    eventClick.addEventListener('click', (event) => {
      eventScroll(event);
    })
  })

  function eventScroll (event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href') != "" ? event.currentTarget.getAttribute('href') : "header";
    const targetPosition = document.querySelector(targetId).offsetTop;
    const currentPosition = window.pageYOffset;
    const distance = targetPosition - currentPosition;
    const duration = 1000;
    let start = null;

    requestAnimationFrame(step);

    function step(timestamp) {
      console.log("start = " + timestamp);
      if (!start) start = timestamp;

      const progress = timestamp - start;
      window.scrollTo(0, easeInOutCubic(progress, currentPosition, distance, duration));
      if (progress < duration) window.requestAnimationFrame(step);
    }
  }

  function easeInOutCubic(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  };

})

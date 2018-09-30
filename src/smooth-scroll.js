class Smoothscroll {
  constructor({ duration = 1000, offsettop, easing = "linear" }) {
    this.duration = duration;
    this.navbarHeight = document.querySelector(offsettop)
      ? document.querySelector(offsettop).getBoundingClientRect().height
      : 0;
    this.easing = easing;

    this.getSection();
  }

  getSection() {
    document.addEventListener("click", e => {
      e.preventDefault();
      if (e.target.hasAttribute(["data-smooth-scroll"])) {
        this.section = document.querySelector(e.target.hash);
        this.getPosition(this.section);
      }
    });
  }

  getRealPosition(section) {
    return Math.trunc(
      Math.max(
        0,
        section.getBoundingClientRect().top + window.scrollY - this.navbarHeight
      )
    );
  }

  getPosition(section) {
    this.initialPosition = window.scrollY;
    this.finalPosition = this.getRealPosition(section);
    this.windowH = Math.round(
      document.body.getBoundingClientRect().height - window.innerHeight
    );

    this.start = performance.now();

    Smoothscroll.animateScroll(
      this.initialPosition,
      this.finalPosition,
      this.duration,
      this.windowH,
      this.easing,
      this.delay,
      this.start
    );
  }

  static animateScroll(
    initialPosition,
    finalPosition,
    duration,
    windowH,
    easing,
    delay,
    start
  ) {
    const now = performance.now();
    const percent = Math.min(1,(now - start) / duration);
    const time = Timingfunction.getTimeFunctions()[easing](percent);
    window.scroll(
      0,
      percent * (finalPosition - initialPosition) + initialPosition
    );

    if (window.scrollY === finalPosition || window.scrollY === windowH) return;

    window.requestAnimationFrame(
      Smoothscroll.animateScroll.bind(
        null,
        initialPosition,
        finalPosition,
        duration,
        windowH,
        easing,
        delay,
        start
      )
    );
  }
}

class Timingfunction {
  static getTimeFunctions() {
    return {
      linear(t) {
        return t;
      },
      easeInQuad(t) {
        return t * t;
      },
      easeOutQuad(t) {
        return t * (2 - t);
      },
      easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic(t) {
        return t * t * t;
      },
      easeOutCubic(t) {
        return --t * t * t + 1;
      },
      easeInOutCubic(t) {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart(t) {
        return t * t * t * t;
      },
      easeOutQuart(t) {
        return 1 - --t * t * t * t;
      },
      easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      },
      easeInQuint(t) {
        return t * t * t * t * t;
      },
      easeOutQuint(t) {
        return 1 + --t * t * t * t * t;
      },
      easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
      }
    };
  }
}





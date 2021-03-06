class EasySwipeMenu {
	static #startX
	static #startY
	static #startTransform
	static #swipeFromEdge 
	static #swipeIsActive
	static #closed

	constructor(options) {
		/* Public class fields */
		this.menu = options.menu
		this.menuButton = options.menuButton
		this.menuId = options.menu.id
		this.menuButtonId = options.menuButton.id
		this.menuWidth = options.menuWidth || '80%'
		this.maxMenuWidth = options.maxMenuWidth || '300px'
		this.timingFunction = options.timingFunction || 'ease'
		this.transitionDuration = options.transitionDuration || 300
		this.transitionProperty = options.transitionProperty || 'transform'

		/* Setting initial style of the menu element */
		this.menu.style =
		`
			position: fixed;
			height: 100%;
			width: ${this.menuWidth};
			max-width: ${this.maxMenuWidth};
			transform: translateX(-101%);
			transition-timing-function: ${this.timingFunction};
			transition-property: ${this.transitionProperty};
		`
		setTimeout(() => this.menu.style.transitionDuration = `${this.transitionDuration}ms`)

		/* Adding event listeners on mobile */
		document.addEventListener('touchstart', EasySwipeMenu.swipestart.bind(this), false)
		document.addEventListener('touchmove', EasySwipeMenu.swipemove.bind(this), false)
		document.addEventListener('touchend', EasySwipeMenu.swipeend.bind(this), false)
		/* Adding event listeners on desktop */
		document.addEventListener('mousedown', EasySwipeMenu.swipestart.bind(this), false)
		document.addEventListener('mousemove', EasySwipeMenu.swipemove.bind(this), false)
		document.addEventListener('mouseup', EasySwipeMenu.swipeend.bind(this), false)

		/* Open menu with button */
		this.menuButton.addEventListener('click', function() {
			if (this.enableIfTrue() && EasySwipeMenu.#closed) {
				this.menu.style.transitionDuration = `${this.transitionDuration}ms`
				this.menu.style.transform = 'translateX(0%)'

				this.onOpened()
			}
		}.bind(this), false)
	}

	enableIfTrue(event) {
		return true
	}
	onSwipeStart() {
		return true
	}
	onSwipeEnd() {
		return true
	}
	onOpened() {
		return true
	}
	onClosed() {
		return true
	}

	static swipestart(e) {
		EasySwipeMenu.#startX = EasySwipeMenu.#startY = EasySwipeMenu.#startTransform = undefined
		EasySwipeMenu.#swipeFromEdge = EasySwipeMenu.#swipeIsActive = false
		EasySwipeMenu.#closed = this.menu.style.transform == 'translateX(-101%)'
		if (this.enableIfTrue(e)) {
			if (e.buttons != 1 && e.buttons !== undefined) return
			let obj = (e.type === "mousedown") ? e : e.changedTouches[0]
			EasySwipeMenu.#startX = obj.pageX
			EasySwipeMenu.#startY = obj.pageY
			EasySwipeMenu.#startTransform = Number(this.menu.style.transform.replace(/[^0-9\.-]+/g, ''))
			EasySwipeMenu.#swipeFromEdge = Number((obj.pageX / window.innerWidth * 100).toFixed(2)) <= 20
		}
	}

	static swipemove(e) {
		if (EasySwipeMenu.#startX && EasySwipeMenu.#startY && EasySwipeMenu.#startTransform !== undefined) {
			if (e.buttons != 1 && e.buttons !== undefined) return
			let obj = (e.type === "mousemove") ? e : e.changedTouches[0]
			let transformShift = Number(((obj.pageX - EasySwipeMenu.#startX) / window.innerWidth * 100).toFixed(2)),
				heightShift = Number(((obj.pageY - EasySwipeMenu.#startY) / window.innerHeight * 100).toFixed(2))

			if (!EasySwipeMenu.#swipeIsActive) {
				if (EasySwipeMenu.#swipeFromEdge && heightShift >= 5) {
					return
				}
				
				if ((((EasySwipeMenu.#startTransform == -101) && EasySwipeMenu.#swipeFromEdge)
				|| (EasySwipeMenu.#startTransform != -101))
				&& (transformShift >= 3 || transformShift <= -3)) {
					this.onSwipeStart()
					EasySwipeMenu.#swipeIsActive = true
					this.menu.style.transitionDuration = ''
				}
			} else {
				let offset = EasySwipeMenu.#startTransform + transformShift
				if (offset < -101) offset = -101
				if (offset > 0) offset = 0
				this.menu.style.transform = `translateX(${offset}%)`
			}
		}
	}

	static swipeend(e) {
		let transform = Number(this.menu.style.transform.replace(/[^0-9\.-]+/g, ''))
		let shift = transform / -101

		if (EasySwipeMenu.#swipeIsActive) {
			this.onSwipeEnd()
		} else {
			/* Close menu on click outside of menu */
			if (!EasySwipeMenu.#closed
				&& e.target.closest(`#${this.menuId}`) === null
				&& e.target.closest(`#${this.menuButtonId}`) === null) {
				this.menu.style.transitionDuration = `${this.transitionDuration}ms`
				this.menu.style.transform = 'translateX(-101%)'
				this.onClosed()
			}
		}

		if (transform !== EasySwipeMenu.#startTransform && EasySwipeMenu.#startTransform !== undefined) {
			if (shift > 0.9) {
				this.menu.style.transitionDuration = `${Math.ceil(this.transitionDuration * (1 - shift))}ms`
				this.menu.style.transform = 'translateX(-101%)'
				this.onClosed()
			} else if (shift < 0.1) {
				this.menu.style.transitionDuration = `${Math.ceil(this.transitionDuration * shift)}ms`
				this.menu.style.transform = 'translateX(0%)'
				this.onOpened()
			} else if (EasySwipeMenu.#startTransform <= -50) {
				this.menu.style.transitionDuration = `${Math.ceil(this.transitionDuration * shift)}ms`
				this.menu.style.transform = 'translateX(0%)'
				this.onOpened()
			} else {
				this.menu.style.transitionDuration = `${Math.ceil(this.transitionDuration * (1 - shift))}ms`
				this.menu.style.transform = 'translateX(-101%)'
				this.onClosed()
			}
		}
	}
}

class Cropper {
	constructor(data) {
		this.element = data.element
		this._data = data
		this.minHeight = 200
		this.minWidth = 375
		this.positions = {
			x: 0,
			y: 0,
			w: this.minWidth,
			h: this.minHeight
		}
		this.container = null
		this.canvas = data.element.querySelector("canvas") || data.element.querySelector("img")

		this.init()
	}

	init() {
		this.container = window.document.createElement("div")
		this.container.id = "crop-positioner"
		this.container.innerHTML = this.createHtml()
		this.element.appendChild(this.container)

		var initCropper = () => {
			var stats = this._data.instance.stats
			this.canvas = this._data.element.querySelector("canvas") || this._data.element.querySelector("img")

			if (this.canvas && stats.ready) {

				this.container.classList.add("active")

				var buttons = this.container.parentNode.querySelector(".buttonWrapper")
				if (buttons) {
					buttons.style.display = "none"
				}

				this.setPositions((this.canvas.getBoundingClientRect().width - 375) / 2, (this.canvas.getBoundingClientRect().height - 200) / 2)

				this.setListeners()
			} else {
				window.requestAnimationFrame(() => {
					initCropper()
				})
			}
		}

		initCropper()
	}

	setListeners() {
		var isMobile = /iPad|iPhone|iPod|Android/.test(window.navigator.userAgent)
		var methodDown = isMobile ? `touchstart` : `mousedown`
		var methodEnd = isMobile ? `touchend` : `mouseup`
		var methodLeave = isMobile ? `touchleave` : `mouseleave`
		var dragging = false
		var self = this


		var mouseDown = (e) => {
			e.preventDefault()
			e.stopPropagation()

			if (dragging) { return }

			dragging = true

			var box = self.container.getBoundingClientRect()
			var maskBox = window.document.getElementById(`maskUpper`).getBoundingClientRect()
			var scrollTop = window.pageYOffset || window.document.documentElement.scrollTop
			var scrollLeft = window.pageXOffset || window.document.documentElement.scrollLeft
			var mode = ``

			var startX = e.pageX
			var startY = e.pageY

			if (startX === undefined) {
				startX = e.changedTouches[0].clientX
			}

			if (startY === undefined) {
				startY = e.changedTouches[0].clientY
			}

			var lastX = startX
			var lastY = startY

			if (Math.abs((maskBox.left + scrollLeft) - startX) < 15) {
				mode = `w`
			} else if (Math.abs((maskBox.left + maskBox.width + scrollLeft) - startX) < 15) {
				mode = `e`
			}

			if (Math.abs((maskBox.top + scrollTop) - startY) < 15) {
				mode = `${mode}n`
			} else if (Math.abs((maskBox.top + maskBox.height + scrollTop) - startY) < 15) {
				mode = `${mode}s`
			}

			if (mode === ``) {
				mode = `z`
			}

			var move = (e) => {
				e.preventDefault()
				e.stopPropagation()

				if (!dragging) { return }

				var x = e.pageX
				var y = e.pageY

				if (x === undefined) {
					x = e.changedTouches[0].clientX
				}

				if (y === undefined) {
					y = e.changedTouches[0].clientY
				}

				var X, Y, W, H

				if (mode.indexOf(`n`) > -1) {
					Y = y - (box.top + scrollTop)
					H = (self.positions.y - Y) + self.positions.h
				}

				if (mode.indexOf(`s`) > -1) {
					H = y - (box.top + scrollTop + self.positions.y)
				}

				if (mode.indexOf(`w`) > -1) {
					X = x - (box.left + scrollLeft)
					W = (self.positions.x - X) + self.positions.w
				}

				if (mode.indexOf(`e`) > -1) {
					W = x - (box.left + scrollLeft + self.positions.x)
				}

				if (mode.indexOf(`z`) > -1) {
					// W = self.positions.w + (x - startX)
					X = self.positions.x - (lastX - x)
					// H = self.positions.h + (y - startY)
					Y = self.positions.y - (lastY - y)

					lastX = x
					lastY = y
				}

				self.setPositions(X, Y, W, H)
			}

			var clearMove = () => {
				dragging = false

				if (isMobile) {
					self.container.ontouchmove = () => { return false; }
				} else {
					self.container.parentNode.removeEventListener('mousemove', move)
					self.container.parentNode.removeEventListener('mouseleave', clearMove)
					window.document.removeEventListener('mouseup', clearMove)
					window.document.removeEventListener('mouseleave', clearMove)
				}
			}

			if (isMobile) {
				self.container.ontouchmove = move
			} else {
				self.container.parentNode.addEventListener('mousemove', move)
				self.container.parentNode.addEventListener('mouseleave', clearMove)
				window.document.addEventListener('mouseup', clearMove)
				window.document.addEventListener('mouseleave', clearMove)
			}
		}

		window.addEventListener(`resize`, () => {
			self.setPositions(null, null, null, null, true)
		})

		window.document.getElementById(`maskUpper`).addEventListener(methodDown, (e) => {
			mouseDown(e)
		})

		window.document.addEventListener(methodEnd, () => {
			dragging = false
			self.container.ontouchmove = () => { return false; }
		})
		window.document.addEventListener(methodLeave, () => {
			dragging = false
			self.container.ontouchmove = () => { return false; }
		})
	}

	setPositions(x, y, w, h, force) {
		var box = {
			width: this.container.offsetWidth,
			height: this.container.offsetHeight
		}

		if (!x) {
			x = this.positions.x
		}

		if (!y) {
			y = this.positions.y
		}

		if (!w) {
			w = this.positions.w
		}

		if (!h) {
			h = this.positions.h
		}


		if (x < 0) {
			x = 0
		}

		if (w + x > box.width) {
			w = box.width - x
		}

		if (w < this.minWidth) {
			w = this.minWidth
			x = this.positions.x
		}




		if (y < 0) {
			y = 0
		}

		if (h + y > box.height) {
			h = box.height - y
		}

		if (h < this.minHeight) {
			h = this.minHeight
			y = this.positions.y
		}

		if (force) {
			if (w + x > box.width) {
				x = box.width - this.minWidth
			}

			if (h + y > box.height) {
				y = box.height - this.minHeight
			}
		}


		this.positions.x = x
		this.positions.y = y
		this.positions.w = w
		this.positions.h = h


		var mask = window.document.getElementById(`maskInner`)
		mask.setAttribute(`x`, x)
		mask.setAttribute(`y`, y)
		mask.setAttribute(`width`, w)
		mask.setAttribute(`height`, h)

		var maskUpper = window.document.getElementById(`maskUpper`)
		maskUpper.setAttribute(`x`, x)
		maskUpper.setAttribute(`y`, y)
		maskUpper.setAttribute(`width`, w)
		maskUpper.setAttribute(`height`, h)
	}

	createHtml() {
		return require("./cropper.html")
	}
}

module.exports = Cropper

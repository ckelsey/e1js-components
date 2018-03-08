const E1 = window.E1

class E1Show {
    constructor(el) {
        this.el = el
        this.el["e1-show-onUpdate"] = this.update
        this.throttle = null
        this.update()
    }

    check(cb) {
        var val = this.el.getAttribute("e1-show")
        var notBoundOrEmpty = val && val[0] !== "@" && val !== "null" && val !== "undefined" && val !== "false"

        E1.isTruthy(this.el.getAttribute("e1-show"), (truthy) => {
            cb(truthy || notBoundOrEmpty)
        })
    }

    update() {
        clearTimeout(this.throttle)

        this.throttle = setTimeout(() => {
            this.check((truthy) => {
                if (truthy) {
                    this.el.style.removeProperty("display")
                } else {
                    this.el.style.display = "none"
                }
            })
        }, 10)
    }
}

E1.registerAttribute("e1-show", E1Show)
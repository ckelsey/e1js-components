const E1 = window.E1

class E1If {
    constructor(el) {
        this.el = el
        this.el["e1-if-onUpdate"] = this.update
        this.parentNode = this.el.parentNode
        this.index = Array.prototype.indexOf.call(this.el.parentNode.children, this.el)
        this.comment = window.document.createComment(this.el.getAttribute("component-id"))
        this.parentNode.insertBefore(this.comment, this.el);

        this.check((check) => {
            if (!check && this.parentNode.contains(this.el)) {
                this.parentNode.removeChild(this.el)
            }
        })

        this.throttle = null
    }

    check(cb) {
        var val = this.el.getAttribute("e1-if")
        var notBoundOrEmpty = val && val[0] !== "@" && val !== "null" && val !== "undefined" && val !== "false"

        E1.isTruthy(this.el.getAttribute("e1-if"), function (truthy) {
            cb(truthy || notBoundOrEmpty)
        })
    }

    update() {
        clearTimeout(this.throttle)

        this.throttle = setTimeout(() => {
            this.check((check) => {
                if (check && !this.el.parentNode) {
                    this.parentNode.insertBefore(this.el, this.comment);
                } else if (!check && this.parentNode.contains(this.el)) {
                    this.parentNode.removeChild(this.el)
                }
            })
        }, 10)
    }
}

E1.registerAttribute("e1-if", E1If)
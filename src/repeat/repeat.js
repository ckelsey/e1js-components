const E1 = window.E1

class E1Repeat {
    constructor(el) {
        this.el = el
        this.template = this.el.innerHTML
        this.el["e1-repeat-onUpdate"] = this.update
        this.update()
    }

    update() {
        var model = E1.getModel(this.el, "e1-repeat")

        this.el.innerHTML = ""

        if (model && model.length) {
            model.forEach((item, key) => {
                var html = this.template.split(this.el.getAttribute("delimiter")).join(key).split(this.el.getAttribute("repeater-value")).join(item)
                this.el.innerHTML += html
            })
        }
    }
}

E1.registerAttribute("e1-repeat", E1Repeat)
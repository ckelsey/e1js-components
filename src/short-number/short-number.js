const E1 = window.E1

class E1ShortNumber {
    constructor(el) {
        this.el = el
        this.el["e1-short-number-onUpdate"] = this.update
        this.update()
    }

    getString(num) {

        if (isNaN(num) || num === 0) {
            return 0
        }

        var sizes = ['', 'K', 'M', 'B', 'G']
        var i = parseInt(Math.floor(Math.log(num) / Math.log(1000)))
        var str = (num / Math.pow(1000, i)) + sizes[i]

        var splits = str.split(".")

        if (splits.length > 1) {
            str = `${splits[0].splits[1][0]}`
        }

        return str
    }

    update() {
        var num = parseInt(E1.getModel(this.el, "number"))
        this.el.textContent = this.getString(num)
    }
}

E1.registerAttribute("e1-short-number", E1ShortNumber)
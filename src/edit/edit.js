const E1 = window.E1

class Edit {
    constructor(el) {
        this.el = el
        this.update = this.update
        this.editor = {
            name: this.el.getAttribute("component-id"),
            editing: false,
            value: this.stripHtml(E1.getModel(this.el, "content")),
            save: E1.getModel(this.el, "save"),
            saveProp: this.el.save
        }

        E1.setModel(null, `@E1EditService.editors.${this.editor.name}`, this.editor)

        var html = require("./edit.html").split(`{{editor}}`).join(this.editor.name)

        this.el.appendChild(E1.cleanHtml(html))

        var method = "click"

        if (/iPad|iPhone|iPod|Android/.test(window.navigator.userAgent)) {
            method = "touchend"
        }

        this.el.querySelector(".edit-content").addEventListener("input", () => {
            var txt = this.el.querySelector(".edit-content")
            var range = window.document.createRange()
            var sel = window.getSelection()
            var start = sel.anchorOffset

            txt.textContent = txt.textContent

            range = window.document.createRange()
            sel = window.getSelection()
            range.setStart(txt.childNodes[0], start)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
        })

        var save = ()=>{
            var value = this.el.querySelector(".edit-content").textContent
            value = value ? value.trim().replace(/[^\x20-\x7E]+/g, '') : ``

            E1.setModel(null, `@E1EditService.editors.${this.editor.name}.editing`, false)
            E1.setModel(this.el, "content", value)
            this.el.querySelector(".edit-content").removeAttribute("contenteditable")

            if (typeof this.editor.save === "function") {
                this.editor.save(value)
            }

            if (typeof this.editor.saveProp === "function") {
                this.editor.saveProp(value)
            }
        }

        this.el.querySelector(".edit-content").addEventListener("keypress", (e) => {
            if (e.key && e.key.toLowerCase() === "enter") {
                save()
            }
        })

        this.el.querySelector('e1-icon[type="edit"]').addEventListener(method, () => {
            E1.setModel(null, `@E1EditService.editors.${this.editor.name}.editing`, true)
            this.el.querySelector(".edit-content").setAttribute("contenteditable", true)
        })

        this.el.querySelector('e1-icon[type="check"]').addEventListener(method, () => {
            save()
        })

        this.el.querySelector('e1-icon[type="close"]').addEventListener(method, () => {
            E1.setModel(null, `@E1EditService.editors.${this.editor.name}.value`, E1.getModel(this.el, "content"))
            E1.setModel(null, `@E1EditService.editors.${this.editor.name}.editing`, false)
            this.el.querySelector(".edit-content").removeAttribute("contenteditable")
        })
    }

    stripHtml(str) {
        var txt = window.document.createElement("div")
        txt.appendChild(E1.cleanHtml(`<div>${str}</div>`))
        return txt.textContent
    }

    update() {
        E1.setModel(null, `@E1EditService.editors.${this.editor.name}.value`, this.stripHtml(E1.getModel(this.el, "content")))
    }
}

E1.registerComponent("e1-edit", Edit)
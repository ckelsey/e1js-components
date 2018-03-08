const E1 = window.E1
const ImageRenderer = require("./renderer")
const vm = require('vm');

class E1ImageViewer {
    constructor(el) {
        this.el = el
        this.update = this.update
        this.data = {}
        this.el.appendChild(E1.cleanHtml(`<span class="image-renderer loading"></span>`))
        this.update()
    }

    update() {

        var data = {
            url: E1.getModel(this.el, "url"),
            preview: E1.getModel(this.el, "preview"),
            type: E1.getModel(this.el, "type"),
            crop: E1.getModel(this.el, "crop"),
            element: this.el.querySelector(".image-renderer")
        }

        if (data.url === this.data.url &&
            data.preview === this.data.preview &&
            data.type === this.data.type &&
            data.crop === this.data.crop
        ) {
            console.log("aawww");
            return
        }

        if (!data.url) {
            return
        }

        this.data = data

        if (this.el.renderer) {
            this.el.renderer.destroy()
        }

        this.el.renderer = new ImageRenderer(data)

        this.el.takeScreenshot = () => {
            return this.el.renderer.data.cropper.takeScreenshot()
        }

        this.el.downloadScreenshot = () => {
            return this.el.renderer.data.cropper.downloadScreenshot()
        }

        this.el.download = () => {
            return this.el.renderer.download()
        }

        var hasScanned = false

        this.el.renderer.subscribe("statsUpdate", (stats) => {
            if (stats.ready && !hasScanned) {

                if (this.el.onready && typeof this.el.onready === "function") {
                    this.el.onready()
                }

                if (!this.el.imageready && this.el.getAttribute("imageready")) {
                    vm.createContext()

                    try {
                        return vm.runInNewContext(this.el.getAttribute("imageready"))
                    } catch (e) { }
                }

                hasScanned = true

                var iOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)

                if (iOS) {
                    var canvasWrapper = this.el.querySelector("canvas").parentNode

                    if (canvasWrapper) {
                        canvasWrapper.requestFullscreen = () => {
                            this.el.classList.add("fake-fullscreen")
                        }

                        var exit = window.document.webkitExitFullscreen

                        window.document.exitFullscreen = () => {
                            this.el.classList.remove("fake-fullscreen")

                            if (exit && typeof exit === "function") {
                                exit()
                            }
                        }
                    }
                }
            }
        })
    }
}

E1.registerComponent("e1-image-viewer", E1ImageViewer)
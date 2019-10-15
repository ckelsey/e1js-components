const E1 = window.E1

class ProgressService {
	constructor() {
		this.progress = 0
	}
}

E1.registerService("ProgressService", new ProgressService())



class ImageUtils {
	constructor() {
		this.loadImage = this.loadImage

		var ctx = window.document.createElement(`canvas`).getContext(`webgl`)

		if (!ctx) {
			ctx = window.document.createElement(`canvas`).getContext(`experimental-webgl`)
		}

		this.maxSize = Math.min(6000, ctx.getParameter(ctx.MAX_TEXTURE_SIZE))
	}

	maxedOutScale(w, h) {
		var _w = w

		if (w * h * 4 > this.maxSize * this.maxSize * 4) {
			var scale = Math.min(1, (this.maxSize * this.maxSize * 4) / (w * h * 4))

			w = w * scale
			h = h * scale
		}

		if (w > this.maxSize) {
			h = h * (this.maxSize / w)
			w = this.maxSize
		}

		if (h > this.maxSize) {
			w = w * (this.maxSize / h)
			h = this.maxSize
		}

		return Math.min(1, w / _w)
	}

	initImages(data, mainCB, prevCB, errCB) {
		// var progressBarWrapper = window.document.createElement("div")
		// progressBarWrapper.classList.add(`progress-wrapper`)

		// var progressBar = window.document.createElement("e1-progress");
		// progressBar.setAttribute(`type`, `circle`)
		// progressBar.setAttribute(`progress`, `@ProgressService.progress`)
		// progressBarWrapper.appendChild(progressBar)
		// data.element.appendChild(progressBarWrapper);

		var loadMain = () => {
			this.loadImage(data.url,
				(mainimg) => {
					// progressBar.style.opacity = 0;

					mainCB(mainimg)

					if (!data.preview && data.instance.previewReady && typeof data.instance.previewReady === `function`) {
						data.instance.previewReady()
					}
				},
				(prog) => {
					data.instance.stats.previewProgress = prog
					E1.setModel(null, `@ProgressService.progress`, prog)
					data.instance.trigger("statsUpdate", data.instance.stats)
				},
				(err) => {
					// progressBar.style.opacity = 0;

					if (errCB) {
						errCB(err)
					}

					if (!data.preview && data.instance.previewReady && typeof data.instance.previewReady === `function`) {
						data.instance.previewReady()
					}
				}
			);
		}

		var loadPreview = () => {
			this.loadImage(data.preview, (previmg) => {
				prevCB(previmg)
				data.instance.stats.previewProgress = 100
				loadMain()
				if (data.instance.previewReady && typeof data.instance.previewReady === `function`) {
					data.instance.previewReady()
				}
			}, (prog) => {
				data.instance.stats.previewProgress = prog
				data.instance.trigger("statsUpdate", data.instance.stats)
			}, () => {
				if (data.instance.previewReady && typeof data.instance.previewReady === `function`) {
					data.instance.previewReady()
				}
				loadMain()
			});
		}

		if (data.preview) {
			loadPreview();
		} else {
			loadMain();
		}
	}

	canDoVr() {
		return new Promise((resolve) => {
			if (window.navigator.getVRDisplays) {
				try {
					window.navigator.getVRDisplays().then(function (displays) {
						if (displays.length > 0) {
							var vrDisplay = displays[0]
							return resolve(vrDisplay.capabilities.canPresent ? vrDisplay : false)
						}

						resolve(false)
					})
				} catch (e) {
					resolve(false)
				}
			} else {
				resolve(false)
			}
		})
	}

	loadImage(url, endCB, progressCB, errorCB) {

		var checkLoaded = (_img) => {

			if (_img.width) {
				endCB(_img);
			} else {
				((i) => {
					setTimeout(() => {
						checkLoaded(i)
					}, 100)
				})(_img)
			}
		}

		var xmlHTTP = new window.XMLHttpRequest();
		xmlHTTP.open("GET", url, true);
		xmlHTTP.responseType = "arraybuffer";
		xmlHTTP.onload = (e) => {

			if (e.target.status === 200 && e.target.response.byteLength) {
				var blob = new window.Blob([e.target.response]);
				var uri = window.URL.createObjectURL(blob);
				var img = new window.Image();

				img.onload = (e) => {
					checkLoaded(e.target)
				};

				img.src = uri;
			} else if (errorCB) {
				errorCB(e.target.status);
			}
		};
		xmlHTTP.onerror = (e) => {
			if (errorCB) { errorCB(e.target.status); }
		};

		xmlHTTP.onprogress = (e) => {
			if (progressCB) {
				progressCB(parseInt((e.loaded / e.total) * 100), () => {
					xmlHTTP.abort();
				});
			}
		};

		xmlHTTP.send();
	}
}

module.exports = new ImageUtils()

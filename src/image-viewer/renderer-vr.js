
import Utils from "./utils"

class RendererVR {

	constructor(data) {
		var self = this

		var resize = () => {
			self.positionCanvas(self)
		}

		this.destroy()

		this.data = data
		this.canDoVR = false
		this.is3D = data.type.toLowerCase().indexOf("stereo") > -1
		this.canvasWrapper = data.element

		this.vrDisplay = null;
		this.frameData = null;
		this.projectionMat = window.mat4.create();
		this.poseMat = window.mat4.create();
		this.viewMat = window.mat4.create();
		this.vrPresentButton = null;
		this.gl = null;
		this.panorama = null;
		this.panorama2 = null

		this.webglCanvas = window.document.createElement("canvas");
		this.webglCanvas.addEventListener('webglcontextlost', this.onContextLost.bind(this), false);
		this.webglCanvas.addEventListener('webglcontextrestored', this.onContextRestored.bind(this), false);
		this.canvasWrapper.appendChild(this.webglCanvas)
		this.webglCanvas.setAttribute("type", "vr")

		this.img1 = null
		this.img2 = null
		this.originalImage = null
		this.ctxTop = window.document.createElement("canvas").getContext("2d")
		this.ctxBottom = window.document.createElement("canvas").getContext("2d")

		this.isPresenting = false
		this.normalSceneFrame = null

		this.resize = resize

		this.hasLoadedControls = false

		if (window.navigator.getVRDisplays) {
			this.frameData = new window.VRFrameData();

			window.navigator.getVRDisplays().then((displays) => {
				if (displays.length > 0) {
					this.vrDisplay = displays[displays.length - 1];
					this.vrDisplay.depthNear = 0.1;
					this.vrDisplay.depthFar = 1024.0;

					this.run()

					window.addEventListener('vrdisplaypresentchange', this.onVRPresentChange.bind(this), false);
					// window.addEventListener('vrdisplayactivate', onVRRequestPresent, false);
					// window.addEventListener('vrdisplaydeactivate', onVRExitPresent, false);
				}
			});
		}
	}

	destroy() { }

	run() {
		if (this.img1) {
			this.originalImage = this.img1
			this.hasLoadedControls = true
			this.ready = true

			if (this.data.instance.onready && typeof this.data.instance.onready === `function`) {
				this.data.instance.onready()
			}
			return
		}

		this.img1 = new window.Image();
		this.img2 = new window.Image();

		Utils.initImages(this.data, (_img) => {
			this.originalImage = _img
			this.setImages(_img);

			this.canvasWrapper.parentNode.style.display = "block";
			this.canvasWrapper.parentNode.style.height = "0px";
			this.canvasWrapper.parentNode.style.width = "100%";
			this.canvasWrapper.parentNode.style.paddingTop = ((9 / 16) * 100) + "%";

			this.init()

			if (!this.hasLoadedControls) {
				this.data.instance.createControls({
					fullscreen: this.fullscreen,
					vr: this.present,
					self: this
				})

				this.hasLoadedControls = true
			}

			this.ready = true

			if (this.data.instance.onready && typeof this.data.instance.onready === `function`) {
				this.data.instance.onready()
			}
		}, (_img) => {
			this.canvasWrapper.parentNode.style.display = "block";
			this.canvasWrapper.parentNode.style.height = "0px";
			this.canvasWrapper.parentNode.style.width = "100%";
			this.canvasWrapper.parentNode.style.paddingTop = ((9 / 16) * 100) + "%";

			this.setImages(_img);

			this.data.instance.createControls({
				fullscreen: this.fullscreen,
				vr: this.present,
				self: this
			})

			this.hasLoadedControls = true

			this.init()

		}, this.reject)
	}

	setImages(img) {
		this.ctxTop.canvas.width = this.ctxBottom.canvas.width = 4096;
		this.ctxTop.canvas.height = this.ctxBottom.canvas.height = 2048;

		if (img.width > 4096) {
			var height = (img.height * (4096 / img.width))
			var pCtx = window.document.createElement("canvas").getContext("2d")
			pCtx.canvas.width = 4096
			pCtx.canvas.height = height
			pCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 4096, height)
			img = pCtx.canvas
		}

		if (this.is3D || img.width === img.height) {
			this.ctxTop.drawImage(img, 0, 0, img.width, img.height / 2, 0, 0, this.ctxTop.canvas.width, this.ctxTop.canvas.height);
			this.ctxBottom.drawImage(img, 0, img.height / 2, img.width, img.height / 2, 0, 0, this.ctxBottom.canvas.width, this.ctxBottom.canvas.height);
			this.img1 = this.ctxTop.canvas
			this.img2 = this.ctxBottom.canvas
		} else {
			this.ctxTop.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.ctxTop.canvas.width, this.ctxTop.canvas.height);
			this.img1 = this.ctxTop.canvas
			this.img2 = this.ctxTop.canvas
		}
	}

	onContextLost(event) {
		event.preventDefault();
		this.gl = null;
		this.panorama = null;
	}

	onContextRestored() {
		this.init();
	}

	init() {
		var glAttribs = {
			alpha: false,
			antialias: false,
			preserveDrawingBuffer: true
		};

		this.gl = this.webglCanvas.getContext("webgl", glAttribs);
		if (!this.gl) {
			this.gl = this.webglCanvas.getContext("experimental-webgl", glAttribs);
			if (!this.gl) {
				return;
			}
		}
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);

		this.panorama = new window.VRPanorama(this.gl);
		this.panorama.useImage(this.img1);

		this.panorama2 = new window.VRPanorama(this.gl);
		this.panorama2.useImage(this.img2);

		this.positionCanvas(this)

		window.requestAnimationFrame(() => {
			this.onAnimationFrame()
		});
	}

	present(self) {
		self.vrDisplay.requestPresent([{ source: self.webglCanvas }]).then(() => {
			self.onPresent();
		});
	}

	onPresent() {
		var btnWrapper = window.document.querySelector(".buttonWrapper")

		if (btnWrapper) {
			btnWrapper.style.display = `none`
		}

		this.canvasWrapper.parentNode.classList.add("fullscreen")

		setTimeout(() => {
			this.isPresenting = true;

			this.positionCanvas(this);
		}, 500);
	}

	fullscreen(e) {
		this.data.instance.toggleFullscreen(e)
		

		window.setTimeout(() => {
			window.requestAnimationFrame(() => {
				this.positionCanvas(this);
				window.setTimeout(() => {
					window.requestAnimationFrame(() => {
						this.positionCanvas(this);
						window.setTimeout(() => {
							window.requestAnimationFrame(() => {
								this.positionCanvas(this);
								window.setTimeout(() => {
									window.requestAnimationFrame(() => {
										this.positionCanvas(this);
										window.setTimeout(() => {
											window.requestAnimationFrame(() => {
												this.positionCanvas(this);

											})
										}, 100)
									})
								}, 100)
							})
						}, 100)
					})
				}, 100)
			})
		}, 100)
	}


	onAnimationFrame() {
		// do not attempt to render if there is no available WebGL context
		if (!this.gl || !this.panorama) {
			return;
		}

		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		if (this.vrDisplay) {
			this.vrDisplay.requestAnimationFrame(() => {
				this.onAnimationFrame()
			});

			this.vrDisplay.getFrameData(this.frameData);

			// FYI: When rendering a panorama do NOT use view matricies directly!
			// That will make the viewer feel like their head is trapped in a tiny
			// ball, which is usually not the desired effect. Instead, render both
			// eyes from a single viewpoint.
			this.getPoseMatrix(this.viewMat, this.frameData.pose);

			if (this.vrDisplay.isPresenting) {
				this.gl.viewport(0, 0, this.webglCanvas.width * 0.5, this.webglCanvas.height);
				this.panorama.render(this.frameData.leftProjectionMatrix, this.viewMat);

				this.gl.viewport(this.webglCanvas.width * 0.5, 0, this.webglCanvas.width * 0.5, this.webglCanvas.height);
				this.panorama.render(this.frameData.rightProjectionMatrix, this.viewMat);

				this.vrDisplay.submitFrame();
			} else {
				this.gl.viewport(0, 0, this.webglCanvas.width, this.webglCanvas.height);
				window.mat4.perspective(this.projectionMat, Math.PI * 0.4, this.webglCanvas.width / this.webglCanvas.height, 0.1, 1024.0);
				this.panorama.render(this.projectionMat, this.viewMat);
			}
		}
	}

	getPoseMatrix(out, pose) {
		// When rendering a panorama ignore the pose position. You want the
		// users head to stay centered at all times. This would be terrible
		// advice for any other type of VR scene, by the way!
		var orientation = pose.orientation;
		if (!orientation) { orientation = [0, 0, 0, 1]; }
		window.mat4.fromQuat(out, orientation);
		window.mat4.invert(out, out);
	}

	positionCanvas(self) {

		if (self.vrDisplay.isPresenting) {
			var leftEye = self.vrDisplay.getEyeParameters("left");
			var rightEye = self.vrDisplay.getEyeParameters("right");
			self.webglCanvas.width = (Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2);
			self.webglCanvas.height = (Math.max(leftEye.renderHeight, rightEye.renderHeight));
			self.webglCanvas.style.width = "100%";
			self.webglCanvas.style.height = "100%";
			self.webglCanvas.style.top = "0px";
			self.webglCanvas.style.left = "0px";
		} else {
			self.webglCanvas.style.position = "relative";
			self.webglCanvas.width = Math.max(self.canvasWrapper.offsetWidth, self.canvasWrapper.offsetHeight) * window.devicePixelRatio;
			self.webglCanvas.height = Math.max(self.canvasWrapper.offsetWidth, self.canvasWrapper.offsetHeight) * window.devicePixelRatio;
			self.webglCanvas.style.width = (self.webglCanvas.width / window.devicePixelRatio) + "px";
			self.webglCanvas.style.height = (self.webglCanvas.height / window.devicePixelRatio) + "px";
			self.webglCanvas.style.top = ((self.canvasWrapper.offsetHeight - (self.webglCanvas.height / window.devicePixelRatio)) / 2) + "px";
			self.webglCanvas.style.left = ((self.canvasWrapper.offsetWidth - (self.webglCanvas.width / window.devicePixelRatio)) / 2) + "px";
		}
	}

	onVRPresentChange() {

		this.positionCanvas(this)

		if (!this.vrDisplay.isPresenting) {
			this.canvasWrapper.parentNode.classList.remove("fullscreen");

			var btnWrapper = window.document.querySelector(".buttonWrapper")

			if (btnWrapper) {
				btnWrapper.style.display = `flex`
			}
		}
	}


}

module.exports = RendererVR
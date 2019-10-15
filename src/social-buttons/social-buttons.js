const E1 = window.E1

class E1SocialButtons {
    constructor(el) {
        this.el = el
        this.update = this.update

        this.update()
    }

    open() {
        this.el.classList.toggle("tooltip-active")
    }

    update() {
        this.el.innerHTML = ''
        var components = E1.getModel(this.el, "components")
        var url = encodeURIComponent(E1.getModel(this.el, "url"))
        var text = E1.getModel(this.el, "text")
        var hashtags = E1.getModel(this.el, "hashtags")
        var image = encodeURIComponent(E1.getModel(this.el, "image", ""))
        var click = this.el.getAttribute(`click`) ? this.el.getAttribute(`click`) : ``

        if (url.substring(0, url.length - 3) === `%3D` || url.substring(0, url.length - 5) === `%253D`) {
            url = url + `nd`
        }

        if (!components) {
            return
        }

        if (typeof components === "string") {
            components = components.split(",").map(function (component) { return component.trim() })
        }



        var html = '<div class="share">'

        var generate = (type, onclick) => {
            html += '<div class="share-button ' + type + '"><a class="icon-wrapper" onclick="' + onclick + '"><e1-icon type="' + type + '" onclick="' + click + '"></e1-icon></a></div>'
        }

        components.forEach((component) => {
            var elBtn

            switch (component) {

                case "stumbleupon":
                    generate("stumbleupon", `window.open('https://www.stumbleupon.com/submit?title=${text}&url=${url}', null, 'menubar=no,width=600,height=300')`)
                    break

                case "pinterest":
                    generate("pinterest", `window.open('https://www.pinterest.com/pin/create/button/?description=${text}&media=${image}&url=${url}', null, 'menubar=no,width=600,height=300')`)
                    break

                case "linkedin":
                    generate("linkedin", `window.open('https://www.linkedin.com/shareArticle?title=${text}&url=${url}', null, 'menubar=no,width=600,height=300')`)
                    break
                case "google":
                    generate("google", `window.open('https://plus.google.com/share?url=${url}', null, 'menubar=no,width=600,height=300')`)
                    break

                case "reddit":
                    generate("reddit", `window.open('https://www.reddit.com/login?dest=https%3A%2F%2Fwww.reddit.com%2Fsubmit%3Ftitle%3D${text}%26url%3D${url}', null, 'menubar=no,width=600,height=300')`)
                    break
                case "whatsapp":
                    generate("whatsapp", `window.open('https://web.whatsapp.com/send?text=${url}', null, 'menubar=no,width=600,height=300')`)
                    break

                case "meneame":
                    generate("meneame", `window.open('https://meneame.net/submit.php?url=${url}', null, 'menubar=no,width=600,height=300')`)
                    break

                case "digg":
                    generate("digg", `window.open('https://digg.com/submit?url=${url}', null, 'menubar=no,width=600,height=300')`)
                    break

                case "xing":
                    generate("xing", `window.open('https://www.xing.com/app/user?op=share&title=${text}&url=${url}', null, 'menubar=no,width=600,height=300')`)
                    break

                case "tumblr":
                    generate("tumblr", `window.open('https://www.tumblr.com/widgets/share/tool/preview?shareSource=legacy&canonicalUrl=&url=${url}&title=${text}', null, 'menubar=no,width=600,height=300')`)
                    break

                case "odnoklassniki":
                    generate("odnoklassniki", `window.open('https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${url}', null, 'menubar=no,width=600,height=300')`)
                    break

                case "vkontakte":
                    generate("vkontakte", `window.open('https://vk.com/share.php?url=${url}&display=widget', null, 'menubar=no,width=600,height=300')`)
                    break

                case "facebook":
                    generate("facebook", `window.open('https://www.facebook.com/sharer/sharer.php?u=${url}&src=sdkpreparse', null, 'menubar=no,width=600,height=300')`)
                    break

                case "twitter":
                    var params = []
                    var twitterText = ""
                    var twitterHash = ""

                    if (text) {
                        twitterText = "text=" + text
                        params.push(twitterText)
                    }

                    if (hashtags) {
                        twitterHash = "hashtags=" + hashtags
                        params.push(twitterHash)
                    }

                    if (params.length) {
                        params = params.join("&") + "&"
                    } else {
                        params = ""
                    }

                    elBtn = generate("twitter", `window.open('https://twitter.com/share?${params}via=NVIDIAGeForce&url=${url}', null, 'menubar=no,width=600,height=300')`)
                    break

                case "weibo":
                    elBtn = generate("weibo", `window.open('http://service.weibo.com/share/share.php?url=${url}&title=${text}', null, 'menubar=no,width=600,height=300')`)
                    break
            }
        })

        html += '</div>'

        this.el.appendChild(E1.cleanHtml(html))

    }
}

E1.registerComponent("e1-social-buttons", E1SocialButtons)
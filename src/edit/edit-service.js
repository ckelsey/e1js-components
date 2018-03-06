import E1 from "e1js"

class E1EditService {

    constructor() {
        this.editors = {}
    }

}

E1.registerService("E1EditService", new E1EditService())

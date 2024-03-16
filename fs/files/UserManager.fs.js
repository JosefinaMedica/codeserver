const fs = require("fs")
const crypto = require("crypto")

class UserManager {
    constructor() {
        this.path = "./fs/files/user.json"
        this.init()
    }
    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
            console.log("Archivo Creado")
        } else {
        console.log("Archivo ya existe") 
        }
    }

}

const users = new UserManager()
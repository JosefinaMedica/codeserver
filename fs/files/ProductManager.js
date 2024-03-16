
const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
    constructor() {
        this.path = "./fs/files/products.json";
        this.init();
    }

    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const stringData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, stringData);
            console.log("Archivo de productos creado");
        } else {
            console.log("Archivo de productos ya existe");
        }
    }

    async create(data) {
        try {
            const product = this.createProductObject(data);
            const productList = await this.readFromFile();
            productList.push(product);
            await this.writeToFile(productList);
            console.log("Producto creado correctamente");
        } catch (error) {
            console.error("Error al crear producto:", error);
        }
    }

    async read() {
        try {
            return await this.readFromFile();
        } catch (error) {
            console.error("Error al leer productos:", error);
            return [];
        }
    }

    async readOne(id) {
        try {
            const productList = await this.readFromFile();
            const product = productList.find(product => product.id === id);
            if (!product) throw new Error("Producto no encontrado");
            return product;
        } catch (error) {
            console.error("Error al leer producto:", error);
            return null;
        }
    }

    async destroy(id) {
        try {
            let productList = await this.readFromFile();
            const index = productList.findIndex(product => product.id === id);
            if (index === -1) throw new Error("Producto no encontrado");
            const deletedProduct = productList.splice(index, 1)[0];
            await this.writeToFile(productList);
            console.log("Producto eliminado correctamente");
            return deletedProduct;
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            return null;
        }
    }

    createProductObject(data) {
        return {
            id: this.generateId(),
            title: data.title,
            photo: data.photo || "default.jpg",
            category: data.category,
            price: data.price,
            stock: data.stock,
        };
    }

    async readFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, "utf8");
            return JSON.parse(data);
        } catch (error) {
            if (error.code === "ENOENT") {
                return [];
            } else {
                throw error;
            }
        }
    }

    async writeToFile(data) {
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2), "utf8");
    }

    generateId() {
        return crypto.randomBytes(6).toString("hex"); 
    }
}

module.exports = ProductManager;






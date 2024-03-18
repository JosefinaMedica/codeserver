const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.path = "./fs/files/products.json";
    this.init();
  }
  
  async init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("ARCHIVO CREADO");
    } else {
      console.log("ARCHIVO YA EXISTE");
    }
  }

  async create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo || "https://www.instagram.com/p/CNktfKrjO_1/",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };

      if (!data.stock || !data.title || !data.category || !data.price) {
        console.log("PRODUCTO NO CREADO");
      } else {
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        console.log("Producto Creado");
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async read() {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      if (!products) {
        throw new Error("ERROR");
      } else {
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const product = products.find((each) => each.id === id);
      if (!product) {
        throw new Error("NO EXISTE");
      }
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const filtered = products.filter((each) => each.id !== id);
      if (!id) {
        throw new Error("NO EXISTEN PRODUCTOS CON ESE ID");
      } else {
        products = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, products);
        console.log("PRODUCTO " + id + " ELIMINADO");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function test() {
  const gestorDeProductos = new ProductManager();

  await gestorDeProductos.create({
    photo: "velacubo.jpg",
  title: "vela cubo",
  category: "vela",
  price: 1500,
  stock: 10,
  });

  await gestorDeProductos.create({
    photo: "velavaso.jpg",
  title: "vela vaso",
  category: "vela",
  price: 25000,
  stock: 22,
  });

  await gestorDeProductos.create({
    photo: "angelito.jpg",
    title: "angelito",
    category: "rustico",
    price: 3000,
    stock: 15,
  });

  await gestorDeProductos.create({
    photo: "estrella.jpg",
    title: "estrella",
    category: "rustico",
    price: 2000,
    stock: 10,
  });

  await gestorDeProductos.create({
    photo: "repisero.jpg",
    title: "repisero",
    category: "tradicional",
    price: 4000,
    stock: 25,
  });

  await gestorDeProductos.create({
    photo: "cuadro.jpg",
    title: "cuadro",
    category: "cuadros",
    price: 5000,
    stock: 25,
  });

  await gestorDeProductos.create({
    photo: "cuadro2.jpg",
    title: "cuadro2",
    category: "cuadros",
    price: 5500,
    stock: 20,
  });

  await gestorDeProductos.create({
    photo: "cruzchica.jpg",
    title: "cruzchica",
    category: "tradicional",
    price: 9200,
    stock: 10,
  });

  await gestorDeProductos.create({
    photo: "cruzcuadrada.jpg",
    title: "cruz cuadrada",
    category: "tradicional",
    price: 4500,
    stock: 30,
  });

  await gestorDeProductos.create({
    photo: "cunero.jpg",
    title: "cunero",
    category: "tradicional",
    price: 3000,
    stock: 25,
  });

  console.log(await gestorDeProductos.read());
}

test();




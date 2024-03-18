const crypto = require("crypto");

class ProductManager {
  static #products = [];
  create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo:
          data.photo || "https://www.instagram.com/p/CNktfKrjO_1/",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };

      if (!data.stock || !data.title || !data.category || !data.price) {
        console.log("Producto no creado.");
      } else {
        ProductManager.#products.push(product);
        console.log("Producto Creado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      const products = ProductManager.#products;
      if (!products) {
        throw new Error("ERROR");
      } else {
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  }

  readOne(id) {
    try {
      const product = ProductManager.#products.find((each) => each.id === id);
      if (!product) {
        throw new Error("NO EXISTE EL PRODUCTO");
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  destroy(id) {
    try {
      const filtered = ProductManager.#products.filter(
        (each) => each.id !== id
      );
      if (!id) {
        throw new Error("NO EXISTE USUARIO CON ESE ID");
      } else {
        ProductManager.#products = filtered;
        console.log("USUARIO" + id + " ELIMINADO");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorDeProductos = new ProductManager();

gestorDeProductos.create({
  photo: "velacubo.jpg",
  title: "vela cubo",
  category: "vela",
  price: 1500,
  stock: 10,
});

gestorDeProductos.create({
  photo: "velavaso.jpg",
  title: "vela vaso",
  category: "vela",
  price: 25000,
  stock: 22,
});

gestorDeProductos.create({
  photo: "angelito.jpg",
  title: "angelito",
  category: "rustico",
  price: 3000,
  stock: 15,
});

gestorDeProductos.create({
  photo: "estrella.jpg",
  title: "estrella",
  category: "rustico",
  price: 2000,
  stock: 10,
});

gestorDeProductos.create({
  photo: "repisero.jpg",
  title: "repisero",
  category: "tradicional",
  price: 4000,
  stock: 25,
});

gestorDeProductos.create({
  photo: "cuadro.jpg",
  title: "cuadro",
  category: "cuadros",
  price: 5000,
  stock: 25,
});

gestorDeProductos.create({
  photo: "cuadro2.jpg",
  title: "cuadro2",
  category: "cuadros",
  price: 5500,
  stock: 20,
});

gestorDeProductos.create({
  photo: "cruzchica.jpg",
  title: "cruzchica",
  category: "tradicional",
  price: 9200,
  stock: 10,
});

gestorDeProductos.create({
  photo: "cruzcuadrada.jpg",
  title: "cruz cuadrada",
  category: "tradicional",
  price: 4500,
  stock: 30,
});

gestorDeProductos.create({
  photo: "cunero.jpg",
  title: "cunero",
  category: "tradicional",
  price: 3000,
  stock: 25,
});

console.log(gestorDeProductos.read());




class ProductManager {
    static #products = [];
    
    create(data) {
      const product = {
        id: ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
        title: data.title,
        photo: data.photo,
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      ProductManager.#products.push(product);
      console.log("producto creado");
    }
  
    read() {
      return ProductManager.#products;
    }
  }
  
  const productos = new ProductManager();
  
  productos.create({
    title: "vela cubo",
    photo: "velacubo.jpg",
    category: "velas",
    price: 1000,
    stock: 100,
  });
  
  productos.create({
    title: "vela vaso",
    photo: "velavaso.jpg",
    category: "velas",
    price: 1500,
    stock: 100,
  }); 
  
  productos.create({
    title: "cunero",
    photo: "cuneronena.jpg",
    category: "peques",
    price: 800,
    stock: 100,
  });
  
  productos.create({
    title: "angelito",
    photo: "angelito.jpg",
    category: "peques",
    price: 2000,
    stock: 100,
  });
  





import express from "express";
import userManager from "./fs/UserManager.fs.js";
import productsManager from "./fs/ProductManager";

const server = express();
const port = 8080;
const ready = () => console.log("Server ready on port: " + port + ".");
server.listen(port, ready);

server.use(express.urlencoded({ extended: true }));

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Error del Servidor"
  });
});

server.get("/", async (req, res) => {
  try {
    res.status(200).json({
      response: "Correcto",
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

server.get("/api/products", async (req, res, next) => {
  try {
    const { category } = req.query;
    const all = await productsManager.read(category);
    if (all.length !== 0) {
      res.status(200).json({
        response: all,
        codeStatus: 200,
        category,
        success: true,
      });
    } else {
      const error = new Error("Error");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

server.get("/api/products/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.readOne(pid);
    if (product) {
      res.status(200).json({
        response: product,
        success: true,
      });
    } else {
      const error = new Error("Error");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

server.get("/api/users", async (req, res, next) => {
  try {
    const { role } = req.query;
    const all = await userManager.read(role);
    if (all.length !== 0) {
      res.status(200).json({
        response: all,
        codeStatus: 200,
        role,
        success: true,
      });
    } else {
      const error = new Error("Error");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

server.get("/api/users/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await userManager.readOne(uid);
    if (user) {
      res.status(200).json({
        response: user,
        success: true,
      });
    } else {
      const error = new Error("Error");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

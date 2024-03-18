const crypto = require("crypto");

class UserManager {
  static #users = [];
  create(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo:
          data.photo ||
          "https://www.istockphoto.com/es/vector/vector-de-icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-gm1451587807-488238421?searchscope=image%2Cfilm",
        email: data.email,
        password: data.password,
        role: data.role,
      };

      if (!data.email || !data.password || !data.role) {
        console.log("Usuario no creado. Ingrese todos los datos.");
      } else {
        UserManager.#users.push(user);
        console.log("Usuario Creado.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      const users = UserManager.#users;
      if (!users) {
        throw new Error("ERROR");
      } else {
        return users;
      }
    } catch (error) {
      console.log(error);
    }
  }

  readOne(id) {
    try {
      const user = UserManager.#users.find((each) => each.id === id);
      if (!user) {
        throw new Error("NO EXISTE EL USUARIO.");
      } else {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  destroy(id) {
    try {
      const filtered = UserManager.#users.filter((each) => each.id !== id);
      if (!id) {
        throw new Error("NO EXISTEN USUARIOS CON ESE ID");
      } else {
        UserManager.#users = filtered;
        console.log("USUARIO " + id + " ELIMINADO");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorDeUsuarios = new UserManager();

gestorDeUsuarios.create({
  photo: "bocha.jpg",
  email: "bocha1312@gmail.com",
  password: "B1234",
  role: "user",
});

gestorDeUsuarios.create({
  photo: "eduardo.jpg",
  email: "eduardo@gmail.com",
  password: "E1234",
  role: "user",
});

gestorDeUsuarios.create({
  photo: "maria.jpg",
  email: "maria@gmail.com",
  password: "M1234",
  role: "admin",
});

gestorDeUsuarios.create({
  photo: "santi.jpg",
  email: "santiafo@gmail.com",
  password: "S1234",
  role: "admin",
});

console.log(gestorDeUsuarios.read());

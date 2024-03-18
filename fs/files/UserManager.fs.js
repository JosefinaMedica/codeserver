const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  constructor() {
    this.path = "./fs/files/users.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("CREADO");
    } else {
      console.log("YA EXISTE");
    }
  }

  async create(data) {
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
        console.log("USUARIO NO CREADO");
      } else {
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        console.log("Usuario Creado");
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read() {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      if (!users) {
        new Error("ERROR");
      } else {
        return users;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const user = users.find((each) => each.id === id);
      if (!user) {
        throw new Error("NO EXISTE EL USUARIO.");
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const filtered = users.filter((each) => each.id !== id);
      if (!id) {
        throw new Error("NO EXISTEN USUARIOS CON ESE ID");
      } else {
        await fs.promises.writeFile(filtered);
        console.log("USUARIO " + id + " ELIMINADO");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function test() {
  const gestorDeUsuarios = new UserManager();
  await gestorDeUsuarios.create({
  photo: "bocha.jpg",
  email: "bocha1312@gmail.com",
  password: "B1234",
  role: "user",
  });

  await gestorDeUsuarios.create({
    photo: "eduardo.jpg",
    email: "eduardo@gmail.com",
    password: "E1234",
    role: "user",
  });

  await gestorDeUsuarios.create({
    photo: "maria.jpg",
    email: "maria@gmail.com",
    password: "M1234",
    role: "admin",
  });

  await gestorDeUsuarios.create({
    photo: "santi.jpg",
    email: "santiafo@gmail.com",
    password: "S1234",
    role: "admin",
  });
  console.log(await gestorDeUsuarios.read());
}

test();
class UserManager {
  static #users = [];

  async create(data) {
    try {
      const user = this.createUserObject(data);
      this.addToUserList(user);
      console.log("Usuario creado correctamente");
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  }

  async read() {
    try {
      return this.getUserList();
    } catch (error) {
      console.error("Error al leer usuarios:", error);
      return [];
    }
  }

  async readOne(id) {
    try {
      const user = this.findUserById(id);
      if (!user) throw new Error("Usuario no encontrado");
      return user;
    } catch (error) {
      console.error("Error al leer usuario:", error);
      return null;
    }
  }

  async destroy(id) {
    try {
      const deletedUser = this.deleteUserById(id);
      console.log("Usuario eliminado correctamente");
      return deletedUser;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return null;
    }
  }

  // Métodos auxiliares

  createUserObject(data) {
    return {
      id: this.getNextUserId(),
      foto: data.foto,
      email: data.email,
      password: data.password,
      role: 0,
    };
  }

  addToUserList(user) {
    UserManager.#users.push(user);
  }

  getUserList() {
    return UserManager.#users;
  }

  findUserById(id) {
    return UserManager.#users.find(user => user.id === id);
  }

  deleteUserById(id) {
    const index = UserManager.#users.findIndex(user => user.id === id);
    if (index === -1) throw new Error("Usuario no encontrado");
    return UserManager.#users.splice(index, 1)[0];
  }

  getNextUserId() {
    return UserManager.#users.length === 0 ? 1 : UserManager.#users[UserManager.#users.length - 1].id + 1;
  }
}

const usuarios = new UserManager();

usuarios.create({
  foto: "bocha.jpg",
  email: "bocha13@gmail.com",
  password: "B1234",
});
usuarios.create({
  foto: "eduardo.jpg",
  email: "eduardo@gmail.com",
  password: "E1234",
});

console.log(await usuarios.read());
console.log(await usuarios.readOne(1));
console.log(await usuarios.destroy(1));
console.log(await usuarios.read());

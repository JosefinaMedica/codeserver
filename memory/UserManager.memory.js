class UserManager {
  static  #users = [];
  create (data) {
    const user = {
      id:
      UserManager.#users.length === 0
      ? 1
      : UserManager.#users[UserManager.#users.length - 1].id + 1,
    foto: data.foto,
    email: data.email,
    password: data.password,
    role: 0,  
  };
  UserManager.#users.push(user);
  console.log("usuario")
}
read(){
return UserManager.#users
}
}


const usuarios = new UserManager ()
usuarios.create({
  foto: "bocha.jpg",
  email : "bocha13@gmail.com",
  password : "B1234",
});
usuarios.create({
  foto: "eduardo.jpg",
  email : "eduardo@gmail.com",
  password : "E1234"
}) 


console.log(usuarios.read())
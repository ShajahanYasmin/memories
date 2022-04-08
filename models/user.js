const db = require("../util/database");

module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  save() {
    return db.execute("insert into users (name,email,password) values(?,?,?)", [
      this.name,
      this.email,
      this.password,
    ]);
  }

  static fetchAll() {
    return db.execute("select * from users");
  }
  static findByEmail(email) {
    return db.execute("select email,password from users where email=?", [
      email,
    ]);
  }
  static findPassword(email) {
    return db.execute("select password from users where email=?", [email]);
  }
};

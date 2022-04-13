const db = require("../util/database");

module.exports = class Feedback {
  constructor(email, content) {
    this.content = content;
    this.email = email;
  }

  save() {
    return db.execute("insert into feedback (email_id,content) values(?,?)", [
      this.email,
      this.content,
    ]);
  }

  static fetchAll() {
    return db.execute("select * from feedback");
  }
};

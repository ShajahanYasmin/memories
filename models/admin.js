const db = require("../util/database");
module.exports = class Admin {
  static findByAdmin(email) {
    return db.execute(
      "select admin_email,admin_password from admin where admin_email=?",
      [email]
    );
  }
};

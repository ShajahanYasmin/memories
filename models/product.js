// const fs = require("fs");
// const path = require("path");

const db = require("../util/database");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "insert into products (product_title,product_price,product_img,product_description) values(?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static fetchAll() {
    return db.execute("select * from products");
  }
  static findById(id) {
    return db.execute("select * from products where product_id=?", [id]);
  }

  static update(id, title, price, imageUrl, description) {
    return db.execute(
      "update products set product_title=? ,product_price=?,product_img=?,product_description=? where product_id=?",
      [title, price, imageUrl, description, id]
    );
  }
  static deleteOne(id) {
    return db.execute("delete from products where product_id=?", [id]);
  }
};

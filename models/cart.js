const db = require("../util/database");
const moment = require("moment");
module.exports = class Cart {
  static getCart(user_id) {
    return db.execute("select id from carts where userId=(?)", [user_id]);
  }
  static getProducts(cart_id) {
    var tokens = new Array(cart_id.length).fill("?").join(",");
    return db.execute(
      `select * from products inner join cartitems  on product_id=productId and cartId in (${tokens})`,
      cart_id
    );
  }
  static getProductsById(product_id, cart_id) {
    var tokens;

    tokens = new Array(cart_id.length).fill("?").join(",");

    return db.execute(
      `select * from products inner join cartitems  on product_id=productId and product_id=(?) and cartId in (${tokens})`,
      [product_id, ...cart_id]
    );
  }
  static addCart(user_id) {
    return db.execute("insert into carts(userId) values(?)", [user_id]);
  }
  static addProduct(
    cart_id,
    quant,
    pid,
    address,
    email,
    phno,
    name,
    eventdate,
    extra
  ) {
    // const createdAt = moment();
    return db.execute(
      "insert into cartitems(cartId,quantity,productId,address, email,phno, name, eventdate, extra) values(?,?,?,?,?,?,?,?,?)",
      [...cart_id, quant, pid, address, email,phno, name, eventdate, extra]
    );
  }
  static updateProduct(cart_id, quant, pid) {
    return db.execute(
      "update cartItems set quantity =(?) where cartId=(?) and productId=(?)",
      [quant, ...cart_id, pid]
    );
  }
  static deleteProduct(cart_id, pid) {
    return db.execute(
      "delete from cartItems where cartId=(?) and productId=(?)",
      [cart_id, pid]
    );
  }
  static setProducts(cart_id) {
    return db.execute("delete from cartItems where cartId=(?)", [...cart_id]);
  }
};

const db = require("../util/database");

module.exports = class Order {
  static getOrder(user_id) {
    return db.execute("select id from orders where userId=(?)", [user_id]);
  }
  static getOrders(order_id) {
    var tokens = new Array(order_id.length).fill("?").join(",");
    return db.execute(
      `select * from products inner join orderitems  on product_id=productId and orderId in (${tokens})`,
      order_id
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
  static addOrder(user_id) {
    return db.execute("insert into orders(userId) values(?)", [user_id]);
  }
  static addProduct(order_id, quant, pid) {
    return db.execute(
      "insert into orderitems(orderId,quantity,productId) values(?,?,?)",
      [order_id, quant, pid]
    );
  }

  static deleteProduct(cart_id, pid) {
    return db.execute(
      "delete from cartItems where cartId=(?) and productId=(?)",
      [cart_id, pid]
    );
  }
};

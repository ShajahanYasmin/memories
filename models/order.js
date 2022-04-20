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
  static getAdminOrders() {
    return db.execute(
      "select * from products inner join orderitems  on product_id=productId and status='yes' "
    );
  }
  static getEmail(orderId) {
    return db.execute("select email from orderitems  where id=(?) ", [orderId]);
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
  static addAccept(id) {
    return db.execute(
      "update orderitems set approval='approved' where id=(?)",
      [id]
    );
  }
  static addReject(id) {
    return db.execute(
      "update orderitems set approval='rejected' where id=(?)",
      [id]
    );
  }
  //
  static addProduct(
    order_id,
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
      "insert into orderitems(orderId,quantity,productId,address,email, phno, name, eventdate, extra,status) values(?,?,?,?,?,?,?,?,?,'yes')",
      [order_id, quant, pid, address, email, phno, name, eventdate, extra]
    );
  }

  static deleteProduct(cart_id, pid) {
    return db.execute(
      "delete from cartItems where cartId=(?) and productId=(?)",
      [cart_id, pid]
    );
  }
};

import { FormattedMessage } from "react-intl";
const Cart = ({ cart, removeItem }) => {
  return (
    <div className="dropdown">
      <div className="trigger group">
        <button className="cta">
          <FormattedMessage id="app.cart" defaultMessage="Cart" />
        </button>
        <span className="badge"> {cart?.length}</span>
      </div>
      <div className="content">
        <aside className="cart">
          <header className="cart-header">
            <h2>
              <FormattedMessage
                id="app.cart.title"
                defaultMessage="Your Cart"
              />
            </h2>
            <p>
              <FormattedMessage
                id="app.cart.items"
                defaultMessage={`You have {count, plural, =0 {no items} one {one item} other {# items}} in your cart`}
                values={{ count: cart.length }}
              />
            </p>
          </header>
          <ul className="items">
            {cart.map((item) => {
              return (
                <li tabIndex={0} key={item.id} className="item">
                  <div className="item-image img-cont">
                    <img src={item.thumbnail} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p className="item-price">
                      <FormattedMessage
                        id="app.item.price"
                        defaultMessage={`{price, number, ::currency/USD}`}
                        values={{ price: item.price }}
                      />
                    </p>
                    <button onClick={() => removeItem(item)} className="cta">
                      <FormattedMessage
                        id="app.cart.remove"
                        defaultMessage="Remove"
                      />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
};
export default Cart;

import { FormattedMessage } from "react-intl";
const ProductItem = ({ product, addToCart }) => {
  return (
    <li className="product">
      <div className="product-image img-cont">
        <img src={product.thumbnail} alt="" />
      </div>
      <div className="product-details">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <span className="product-price">
          <FormattedMessage
            id="app.item.price"
            defaultMessage={`{price, number, ::currency/USD}`}
            values={{ price: product.price }}
          />
        </span>
      </div>
      <div className="product-actions">
        <button
          disabled={product?.isInCart}
          onClick={() => addToCart(product)}
          className="cta"
        >
          <FormattedMessage id="app.cart.add" defaultMessage="Add to Cart" />
        </button>
      </div>
    </li>
  );
};
export default ProductItem;

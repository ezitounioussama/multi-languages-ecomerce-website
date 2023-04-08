import "./App.css";
import { useEffect, useState } from "react";
import ProductItem from "./components/ProductItem";
import Cart from "./components/Cart";
import { IntlProvider, FormattedMessage } from "react-intl";
// function to fetch products from dummyjson.com
const getProducts = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log({
      error,
    });
    return [];
  }
};
function App() {
  // set up state for locale and messages
  const [locale, setLocale] = useState("es");
  const [messages, setMessages] = useState({
    "app.name": "Tienda sencilla",
    "app.description": "Una tienda sencilla con React",
    "app.products.caption": "Explora nuestros productos",
    "app.products.text":
      "Tenemos una amplia gama de productos para elegir. Explora nuestros productos y agrégalos a tu carrito.",
    "app.cart": "Carrito",
    "app.cart.title": "Tu carrito",
    "app.cart.empty": "El carrito está vacío",
    "app.cart.items":
      "{count, plural, =0 {No tienes artículos} one {# articulo} other {# artículos }} en tu carrito",
    "app.cart.remove": "Eliminar",
    "app.cart.add": "Añadir a la cesta",
    "app.item.price": "{price, number, ::currency/EUR}",
  });
  // set up state for products and cart
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // function to add product to cart
  const handleAddToCart = (product) => {
    console.log("product", product);
    setCart((cart) => {
      return [...cart, product];
    });
    setProducts((products) => {
      return products.map((p) => {
        if (p.id === product.id) {
          return {
            ...p,
            isInCart: true,
          };
        }
        return p;
      });
    });
  };

  // function to remove product from cart
  const handleRemoveFromCart = (product) => {
    setCart((cart) => {
      return cart.filter((p) => p.id !== product.id);
    });
    setProducts((products) => {
      return products.map((p) => {
        if (p.id === product.id) {
          return {
            ...p,
            isInCart: false,
          };
        }
        return p;
      });
    });
  };
  // fetch products on component mount
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.products);
    });
  }, []);
  // function to dynamically import messages depending on locale
  useEffect(() => {
    import(`./locales/${locale}.json`)
      .then((messages) => {
        console.log({
          messages,
        });
        setMessages(messages.default); // specifying the default export
      })
      .catch((error) => {
        console.error(error);
        setMessages({});
      });
  }, [locale]);
  return (
    <IntlProvider messages={messages} key={locale} locale={locale}>
      <div className="app">
        <header className="app-header">
          <div className="wrapper">
            <div className="app-name">
              <FormattedMessage id="app.name" defaultMessage={"Simple Store"} />
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Cart cart={cart} removeItem={handleRemoveFromCart} />
              <select
                onChange={(e) => {
                  setLocale(e.target.value);
                }}
                value={locale}
                name="language-select"
                id="language-select"
                className="select-input"
              >
                <option value="es">Español</option>
                <option value="ar">لعربية</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </header>
        <main className="app-main">
          <div className="wrapper">
            <section className="products app-section">
              <div className="wrapper">
                <header className="section-header products-header">
                  <div className="wrapper">
                    <h2 className="caption">
                      <FormattedMessage
                        id="app.products.caption"
                        defaultMessage={"Browse our products"}
                      />
                    </h2>
                    <p className="text">
                      <FormattedMessage
                        id="app.products.text"
                        defaultMessage={
                          "We have a wide range of products to choose from. Browse our products and add them to your cart."
                        }
                      />
                    </p>
                  </div>
                </header>
                <ul className="products-list">
                  {products.map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      addToCart={handleAddToCart}
                    />
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </main>
      </div>
    </IntlProvider>
  );
}
export default App;

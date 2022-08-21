const products = [
  {id: 1, title: "ELLERY X M'O CAPSULE", price: 84, url: "img/index/product_1.jpg"},
  {id: 2, title: "ELLERY X M'O CAPSULE", price: 84, url: "img/index/product_2.jpg"},
  {id: 3, title: "ELLERY X M'O CAPSULE", price: 100", url: "img/index/product_3.jpg"},
  {id: 4, title: "ELLERY X M'O CAPSULE", price: 45, url: "img/index/product_4.jpg"},
  {id: 5, title: "ELLERY X M'O CAPSULE", price: 100, url: "img/index/product_5.jpg"},
  {id: 6, title: "ELLERY X M'O CAPSULE", price: 150, url: "img/index/product_6.jpg"},
];

const renderProduct = (product) => {
  return `<div class="product__box">
            <a href="#">
              <img class="product__img" src=${product.url}>
            </a>
            <div class="product__text">
              <a class="product__name" href="#">
                <h3>${product.title}</h3>
              </a>
              <p class="product__price">$${product.price}</p>
            </div>
            <div class="product__add">
              <button type="button" name="button">
                <img src="img/index/basket.png" alt="">
                Add to card
              </button>
            </div>
          </div>`;
};

const renderPage = list => {
  const productsList = list.map(item => renderProduct(item));
  document.querySelector('.product').innerHTML = productsList.join('');
}

renderPage(products);

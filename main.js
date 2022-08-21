class ProductList {
  constructor (container = '.product') {
    this.container = container;
    this.goods = [];
    this._fetchProducts();
    this.render();
    this.sumProduct();
  }

  _fetchProducts() {
    this.goods = [
      {id: 1, title: "ELLERY X M'O CAPSULE", price: 84, img: "img/index/product_1.jpg"},
      {id: 2, title: "ELLERY X M'O CAPSULE", price: 84, img: "img/index/product_2.jpg"},
      {id: 3, title: "ELLERY X M'O CAPSULE", price: 100, img: "img/index/product_3.jpg"},
      {id: 4, title: "ELLERY X M'O CAPSULE", price: 45, img: "img/index/product_4.jpg"},
      {id: 5, title: "ELLERY X M'O CAPSULE", price: 100, img: "img/index/product_5.jpg"},
      {id: 6, title: "ELLERY X M'O CAPSULE", price: 150, img: "img/index/product_6.jpg"}
    ];
  }

  render() {
    const block = document.querySelector(this.container);
    for(let product of this.goods) {
      const item = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
    }
  }

  sumProduct() {
    let productPrice = 0;
    for (let i = 0; i < this.goods.length; i++) {
      productPrice = productPrice + this.goods[i].price;
    }
    console.log(productPrice);
  }
}

class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.id = product.id;
    this.price = product.price;
    this.img = product.img;
  }
  render() {
    return `<div class="product__box">
              <a href="#">
                <img class="product__img" src=${this.img}>
              </a>
              <div class="product__text">
                <a class="product__name" href="#">
                  <h3>${this.title}</h3>
                </a>
                <p class="product__price">$${this.price}</p>
              </div>
              <div class="product__add">
                <button type="button" name="button">
                  <img src="img/index/basket.png" alt="">
                  Add to card
                </button>
              </div>
            </div>`;
  }
}

let list = new ProductList();


// const renderPage = list => {
//   const productsList = list.map(item => renderProduct(item));
//   document.querySelector('.product').innerHTML = productsList.join('');
// }
//
// renderPage(products);

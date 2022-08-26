const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
  constructor (container = '.product') {
    this.container = container;
    this.goods = [];
    this._getProducts()
      .then(data => {
        this.goods = data;
        this.render()
      });
    this.sumProduct();
  }

  _getProducts() {
      return fetch(`${API}/catalogData.json`)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
  }

  // Метод объекта, который считает стоимость всех товаров
   sumProduct() {
     let productPrice = 0;
     for (let i = 0; i < this.goods.length; i++) {
       productPrice = productPrice + this.goods[i].price;
     }
     console.log(productPrice);
   }

   render() {
      const block = document.querySelector(this.container);
      for (let product of this.goods){
          const productObj = new ProductItem(product);
          block.insertAdjacentHTML('beforeend', productObj.render());
      }
    }
}

// Для корзины
// Метод, который добавляет товары в корзину
// Метод, который удаляет товары из корзины
// Метод, который считает стоимость товаров в корзине
// Метод, который оформляет заказ
// Метод, который отрисовывает окно корзины

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150'){
       this.title = product.product_name;
       this.price = product.price;
       this.id = product.id_product;
       this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductList();
console.log(list.allProducts);

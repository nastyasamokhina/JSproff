const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
  constructor (container = '.product', url='catalogData.json') {
    this.container = container;
    this.goods = [];
    this._getProducts(url)
      .then(data => {
        this.goods = data;
        this.render();
      });
  }

  _getProducts(url) {
      return fetch(`${API}/${url}`)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
  }

  render() {
      const block = document.querySelector(this.container);
      for (let product of this.goods){
          const productObj = new ProductItem(product);
          block.insertAdjacentHTML('beforeend', productObj.render());
      }
      getBay();
  }
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150'){
      this.product_name = product.product_name;
      this.price = product.price;
      this.id = product.id_product;
      this.img = img;
    }

  render() {
      return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class Basket extends ProductList {
    render() {
        const block = document.querySelector(this.container);
        block.innerHTML = "";
        for (let product of this.goods.contents) {
            const productObj = new BasketItem(product);
            block.insertAdjacentHTML('afterbegin', productObj.render());
        }

        let totalPrice = document.querySelector('.basketTotalValue');
        totalPrice.textContent = this.sumProduct();

        callbackDefenition();

        let indexCount = document.querySelector('span.cartIconWrap > span');

        indexCount.textContent = this.productsCount();
    }

    sumProduct() {
        let productPrice = 0;
        for (let product of this.goods.contents) {
            productPrice = productPrice + product.price * product.quantity;
        }
        return productPrice;
    }

    productsCount() {
        let productsCount = 0;
        for (let product of this.goods.contents) {
            productsCount = productsCount + product.quantity;
        }
        return productsCount;
    }

    addToCart(cart) {
        let id = cart.closest('.product-item').dataset.id;
        let idFind = this.goods.contents.find((product) => {
            return product.id_product === +id;
        });

        if (idFind !== undefined) {
            idFind.quantity++;
        } else {
            let newProduct = list.goods.find((product) => {
                return product.id_product === +id
            });
            newProduct["quantity"] = 1;
            this.goods.contents.push(newProduct);
        }
        this.render();
    }

    deletItem(product) {
        let id = product.closest('.basketRow').dataset.id;
        let idFind = this.goods.contents.find((product) => {
            return product.id_product === +id;
        });
        idFind.quantity--;
        if (idFind.quantity === 0) {
            let index = this.goods.contents.indexOf(idFind);
            this.goods.contents.splice(index, 1);
        }
        this.render();
    }

}

class BasketItem extends ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        super(product, img = 'https://via.placeholder.com/200x150');
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="basketRow" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img" width="50px">
                    <div class="basketRow_grid">${this.product_name}</div>
                    <div class="basketRow_grid">${this.quantity} шт.</div>
                    <div class="basketRow_grid">${this.price} $</div>
                    <div class="basketRow_grid">${this.quantity * this.price} $</div>
                    <button class="buttonBasket basketRow_grid">X</button>
                </div>`
    }
}

let list = new ProductList();
let basket = new Basket(container = '.basketContent', url='getBasket.json');

const cartIconWrapEl = document.querySelector('.cartIconWrap');
const basketEl = document.querySelector('.basket');

cartIconWrapEl.addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

function getBay() {
    const productsEl = [...document.querySelectorAll('.product-item')];
    productsEl.forEach((item) => {
        item.addEventListener('click', event => {
            if (!event.target.classList.contains('buy-btn')) {
                return;
            } else {
                basket.addToCart(event.target);
            }
        });
    });

};

function callbackDefenition() {
    const deletButton = [...document.querySelectorAll('.buttonBasket')];
    deletButton.forEach((item) => {
        item.addEventListener('click', event => {
            basket.deletItem(event.target);
        })
    })
};
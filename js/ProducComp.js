Vue.component('products', {
    data(){
        return {
            products: [],
            filtered: [],
            fechedProducts: [
              {"id_product": 1, "product_name": "Рюкзак", "price": 110, "img": "img/product_1.jpg"},
              {"id_product": 2, "product_name": "Брюки черные", "price": 95, "img": "img/product_2.jpg"},
              {"id_product": 3, "product_name": "Толстовка", "price": 90, "img": "img/product_3.jpg"},
              {"id_product": 4, "product_name": "Брюки коричневые", "price": 87, "img": "img/product_4.jpg"},
              {"id_product": 5, "product_name": "Пиджак", "price": 120,"img": "img/product_5.jpg"},
              {"id_product": 6, "product_name": "Блуза", "price": 70,"img": "img/product_6.jpg"},
              {"id_product": 7, "product_name": "Рубашка в клетку", "price": 50,"img": "img/product_7.jpg"},
              {"id_product": 8, "product_name": "Футболка", "price": 30,"img": "img/product_8.jpg"},
              {"id_product": 9, "product_name": "Кепка", "price": 25,"img": "img/product_9.jpg"},
              {"id_product": 10, "product_name": "Рубашка белая", "price": 50,"img": "img/product_10.jpg"},
              {"id_product": 11, "product_name": "Куртка кожанная", "price": 300, "img": "img/product_11.jpg"},
              {"id_product": 12, "product_name": "Рубашка зеленая с коротким рукавом", "price": 76, "img": "img/product_12.jpg"}
            ]
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        for (let el of this.fechedProducts) {
          this.products.push(el);
          this.filtered.push(el);
        }
    },
    template: `
        <div class="products">
            <product ref="refref" v-for="item of filtered" :key="item.id_product" :img="item.img" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
      return {
          cartAPI: this.$root.$refs.cart,
      };
    },

    template: `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3 class="product_name">{{product.product_name}}</h3>
                    <p class="product_price">{{product.price}} $</p>
                    <div class="product_add">
                      <button class="buy-btn" @click="cartAPI.addProduct(product)">
                        <img src="img/basket.png" alt="">
                        Add to card
                      </button>
                    </div>
                </div>
            </div>
    `
});

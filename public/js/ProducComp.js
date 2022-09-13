Vue.component('products', {
    data(){
        return {
            products: [],
            filtered: []
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
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
          /**
           * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
           * то мы легко можем получить доступ к ним используя свойство $root.
           * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
           */
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

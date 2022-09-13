Vue.component('cart', {
    data(){
      return {
          cartItems: [],
          showCart: false,
          countOfProduct: 0,
      }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                            this.productCounting();
                        }
                    })
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson(`api/cart/${ product.id_product }/${ product.product_name }`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);
                            this.productCounting();
                        }
                    })
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                            this.productCounting();
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${ product.id_product }/${ product.product_name }`, product)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                            this.productCounting();
                        } else {
                            console.log('error');
                        }
                    })
            }
            вапруеи
        },
        productCounting() {
            let count = 0;
            this.cartItems.forEach(el => {
                count += el.quantity;
            });
            this.countOfProduct = count;
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el)
                }
            });
    },
    template: `
        <div>
            <div class="counter">
              <img src="img/basket.png" class="btn-cart" @click="showCart = !showCart">
              <span>{{countOfProduct}}</span>
            </div>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item"
                v-for="item of cartItems"
                :key="item.id_product"
                :cart-item="item"
                :img="item.img"
                @remove="remove">
                </cart-item>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                            <p class="product-single-price">$ {{cartItem.price}} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}} $</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});

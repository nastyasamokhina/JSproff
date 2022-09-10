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
            if(find){
              find.quantity++;
            } else {
              let prod = Object.assign({quantity: 1}, product);
              this.cartItems.push(prod)
            }
            this.productCounting();
        },
        remove(item) {
            if(item.quantity>1) {
                item.quantity--;
            } else {
                this.cartItems.splice(this.cartItems.indexOf(item), 1)
            }
            this.productCounting();
        },
        productCounting() {
          let count = 0;
          this.cartItems.forEach(el => {
            count += el.quantity;
          });
          this.countOfProduct = count;
        }
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

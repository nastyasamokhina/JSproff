class Humberger {
  constructor() {
    this.menu = [];
    this._fetchMenu();
  }

  _fetchMenu() {
    this.menu = [
      {title: "small", price: 50, cal: 20},
      {title: "big", price: 100, cal: 40},
      {title: "cheese", price: 10, cal: 20},
      {title: "salad", price: 20, cal: 5},
      {title: "potatoes", price: 15, cal: 10},
      {title: "spices", price: 15, cal: 0},
      {title: "sous", price: 20, cal: 5}
    ];
  }

  getSize() {
    const inputSize = document.querySelectorAll(".size > input");
    for (let i = 0; i < inputSize.length; i++) {
      if (inputSize[i].checked === true) {
        const currentSize = this.menu.find(el => {
          return el.title === inputSize[i].value;
        })
        return currentSize;
      }
    }
  }

  getStuffing() {
    const inputStuffing = document.querySelectorAll(".stuffing > input");
    for (let i = 0; i < inputStuffing.length; i++) {
      if (inputStuffing[i].checked === true) {
        const currentStuffing = this.menu.find(el => {
          return el.title === inputStuffing[i].value;
        })
        return currentStuffing;
      }
    }
  }

  getTopping() {
    const inputTopping = document.querySelectorAll(".topping > input");
    let toppings = [];
    for (let i = 0; i < inputTopping.length; i++) {
      if (inputTopping[i].checked === true) {
        const currentTopping = this.menu.find(el => {
          return el.title === inputTopping[i].value;
        })
        toppings.push(currentTopping);
      }
    }
    return toppings;
  }

  calcPriceCallories() {
    const sizeBurger = this.getSize();
    const stuffingBurger = this.getStuffing();
    const toppingBurger = this.getTopping();
    const allIng = [sizeBurger, stuffingBurger, ...toppingBurger];
    let price = allIng.reduce((sum, item) => {
      return sum + item.price
    }, 0);
    let callories = allIng.reduce((sum, item) => {
      return sum + item.cal
    }, 0);
    alert(`Ваш бургер стоит ${price} рублей, в нем ${callories} каллорий`);
  }
}

let burger = new Humberger();
burger.getSize();

const button = document.querySelector("button");
button.addEventListener('click', event => {
  burger.calcPriceCallories();
});

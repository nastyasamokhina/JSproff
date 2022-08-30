function checkName() {
  let name = document.getElementById('name');
  let regs = /^[a-zа-яё]+$/i;
  let message = document.getElementById('message1');
  if (regs.test(name.value)) {
    name.classList.add('borderOk');
    return true;
  } else {
    name.classList.add('borderError');
    message.style.color = "red";
    message.innerHTML = "Имя содержит только буквы";
    return false;
  }
}


function checkPhone() {
  let phone = document.getElementById('phone');
  let regs = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
  let message = document.getElementById('message2');
  if (regs.test(phone.value)) {
    phone.classList.add('borderOk');
    return true;
  } else {
    phone.classList.add('borderError');
    message.style.color = "red";
    message.innerHTML = "Телефон имеет вид +7(000)000-0000";
    return false;
  }
}

function checkEmail() {
  let email = document.getElementById('email');
  let regs = /^[\w._-]+@\w+\.[a-z]{2,4}$/i;
  let message = document.getElementById('message3');
  if (regs.test(email.value)) {
    email.classList.add('borderOk');
    return true;
  } else {
    email.classList.add('borderError');
    message.style.color = "red";
    message.innerHTML = "E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru";
    return false;
  }
}

const buttonEl = document.querySelector(".button");
buttonEl.addEventListener('click', event => {
  checkNameResult = checkName();
  checkPhoneResult = checkPhone();
  checkEmailResult = checkEmail();
  if (checkNameResult && checkPhoneResult && checkEmailResult) {
    event.preventDefault();
    return true
  } else {
    event.preventDefault();
    return false
  }
});

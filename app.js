const pizzaType = document.getElementById('pizza-type');
const pizzaSize = document.getElementById('pizza-size');
const amount = document.getElementById('amount');
const addBtn = document.getElementById('btn-submit');
const clearBtn = document.getElementById('btn-clear');
const orderList = document.getElementById('order-list');
const orderTotal = document.getElementById('order-total');
const payBtn = document.getElementById('submit-payment');
const cardNumber = document.getElementById('credit-card');
const paymentMsg = document.getElementById('payment-message');
let orderPizzas = [];

addBtn.addEventListener('click', addOrder);
clearBtn.addEventListener('click', clearOrder);
payBtn.addEventListener('click', pay);

function addOrder(event) {
	event.preventDefault();
	const toppings = Array.from(
		document.querySelectorAll('input[name="toppings"]:checked')
	).map((x) => x.value.split('-')[0]);
	const type = pizzaType.value.split('-');
	const size = pizzaSize.value.split('-');

	let totalPrice =
		(parseInt(type[1]) + parseInt(size[1]) + toppings.length * 10) *
		amount.value;

	const pizzaOrder = {
		pizzaName: type[0],
		pizzaPrice: type[1],
		size: size[0],
		sizePrice: size[1],
		toppings: toppings,
		toppingsPrice: toppings.length * 10,
		quantity: amount.value,
		pizzaTotalPrice: totalPrice,
	};
	orderPizzas.push(pizzaOrder);
	updateOrderSummary();
	this.form.reset();
}

function clearOrder(event) { 
    event.preventDefault();
    orderPizzas = [];
    orderList.innerHTML = ''
    orderTotal.innerHTML = 0
}

function pay(event) {
    event.preventDefault();
    const cardNum = cardNumber.value.replace(/[^0-9]/g, '');
    const valid = checkLuhn(cardNum)
    if (!valid) return
    const obj = {
		pizzas: orderPizzas,
        total: orderTotal.innerHTML,
        cardNumber: cardNum
    };
    console.log(obj)
}

function checkLuhn(num) {
	let last = num.slice(-1);
	num = num.slice(0, -1).split('').reverse().join('');
	const arr = [];
	for (let i = 0; i < num.length; i++) {
		if (i % 2 == 0) {
			let temp = parseInt(num[i]) * 2;
			if (temp > 9)
				arr.push(
					temp
						.toString()
						.split('')
						.reduce((sum, digit) => sum + parseInt(digit), 0)
				);
			else arr.push(temp);
		} else arr.push(parseInt(num[i]));
	}
	let sum = arr.reduce((sum, digit) => sum + digit, 0);
	let final = num + (10 - (sum % 10));

	if (final === num + last) {
		paymentMsg.innerText = 'Payment successful!';
        paymentMsg.style.color = 'green';
        return true
	} else {
		paymentMsg.innerText = 'Invalid credit card number.';
        paymentMsg.style.color = 'red';
        return false
	}
}

function updateOrderSummary() {
	const orderItem = document.createElement('li');
	let str = document.createTextNode(
		`${orderPizzas[orderPizzas.length - 1].quantity} x ${
			orderPizzas[orderPizzas.length - 1].pizzaName
		} - ${orderPizzas[orderPizzas.length - 1].pizzaTotalPrice} NOK`
	);

	orderItem.appendChild(str);
	orderList.appendChild(orderItem);
	let tot = parseInt(orderTotal.innerHTML);
	tot += orderPizzas[orderPizzas.length - 1].pizzaTotalPrice;
	orderTotal.innerText = tot;
}

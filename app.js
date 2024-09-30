const pizzaType = document.getElementById('pizza-type');
const pizzaSize = document.getElementById('pizza-size');
const amount = document.getElementById('amount');
const addBtn = document.getElementById('btn-submit');
const clearBtn = document.getElementById('btn-clear');
const orderList = document.getElementById('order-list');
const orderTotal= document.getElementById('order-total');
const orderPizzas = [];

addBtn.addEventListener('click', addOrder);
clearBtn.addEventListener('click', clearOrder);

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

function clearOrder(event) {}

function updateOrderSummary() {
	const orderItem = document.createElement('li');
	let str = document.createTextNode(
		`${orderPizzas[orderPizzas.length-1].quantity} x ${
			orderPizzas[orderPizzas.length-1].pizzaName
		} - ${orderPizzas[orderPizzas.length-1].pizzaTotalPrice} NOK`
	);

	orderItem.appendChild(str);
    orderList.appendChild(orderItem);
    let tot = parseInt(orderTotal.innerHTML);
    tot += orderPizzas[orderPizzas.length-1].pizzaTotalPrice;
    orderTotal.innerText = tot
}

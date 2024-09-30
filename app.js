const pizzaType = document.getElementById('pizza-type');
const pizzaSize = document.getElementById('pizza-size');
const amount = document.getElementById('amount');
const addBtn = document.getElementById('btn-submit');
const clearBtn = document.getElementById('btn-clear');
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
    orderPizzas.push(pizzaOrder)
	console.log(pizzaOrder);
	// console.log(type);
	// console.log(size);
	// console.log(toppings);
	// console.log(amount.value);
}

function clearOrder(event) {}

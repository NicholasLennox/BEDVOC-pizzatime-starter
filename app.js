$(document).ready(function() {
    const form = $("#pizza-form")

    let orderPizzas = []
    let orderTotal = 0

    form.on("submit", function(event) {
        event.preventDefault()

    let pizzaTypeValue = $("#pizza-type").val()
    let pizzaSizeValue = $("#pizza-size").val()
    const quantity = parseInt($("#quantity").val(), 10)

    let pizzaTypeDetails = pizzaTypeValue.split("-")
    let pizzaName = pizzaTypeDetails[0]
    let pizzaPrice = parseInt(pizzaTypeDetails[1])

    let pizzaSizeDetails = pizzaSizeValue.split("-")
    let pizzaSizeName = pizzaSizeDetails[0]
    let sizePrice = parseInt(pizzaSizeDetails[1])
    
    let selectedToppings = []
    let toppingsTotal = 0

    $('input[type="checkbox"]:checked').each(function() {
        let toppingDetails = $(this).val().split("-")
        let toppingName = toppingDetails[0]
        let toppingPrice = parseInt(toppingDetails[1], 10)

        selectedToppings.push(toppingName)
        toppingsTotal += toppingPrice   
    })

    const pizzaTotalPrice = (pizzaPrice + sizePrice + toppingsTotal) * quantity
    orderTotal += pizzaTotalPrice
    let pizzaOrder = {
        pizzaName: pizzaName,
        pizzaPrice: pizzaPrice,
        size: pizzaSizeName,
        sizePrice: sizePrice,
        toppings: selectedToppings,
        toppingsPrice: toppingsTotal,
        quantity: quantity,
        pizzaTotalPrice: pizzaTotalPrice
    }

    updateOrderSummary = () => {    
        $("#order-list").empty()
        orderPizzas.forEach(function() {
            let orderListItem = $(`<li>${pizzaOrder.quantity} x ${pizzaOrder.pizzaName} - ${pizzaOrder.pizzaTotalPrice} NOK</li>`)
            $("#order-list").append(orderListItem)
        })

        $("#order-total").text(orderTotal)
    }
    
    orderPizzas.push(pizzaOrder)
    updateOrderSummary()
    console.log(pizzaOrder)
    console.log(orderPizzas)
    console.log("Your total is " + orderTotal+ " NOK")

    this.reset()
})

})
$(document).ready(() => {
  let cart = []

  // add to cart
  $('.button-add').click((event) => {
    event.preventDefault()
    let card = $(event.target).parent().parent().parent()
    let price = card.find('.price').text()
    let name = card.find('.food-name').text()
    let integer = (name.length - 9)
    let title = name.substring(0, (integer))

    addToCart({price, title})

})
// Remove from cart
  $('#orders').click('.remove', (event) => {
    let title = $(event.target).data("title")
    console.log("title in remove", title)
    removeFromCart(title)
  })

  function removeFromCart(title) {
    let existingItem = findInCart(title)
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity--
    }
    renderCart()
  }
// Search the cart to not duplicate an item
  function addToCart(item){
    let existingItem = findInCart(item.title)
    if (existingItem){
      console.log("item exists", existingItem)
      existingItem.quantity++
    }
    else {
      item.quantity = 1
      console.log(item.quantity)
      cart.push(item)
    }
    renderCart()
  }
// Make cart
  function findInCart(title){
    let existingItem = null
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].title === title) {
        existingItem = cart[i]
      }
    }
    return existingItem
  }

  function renderCart() {
// Clear table
    let tbody = $('#orders tbody')
    tbody.children().remove()

// Add to table
    let subtotal = 0
    for (item of cart) {
      let price = parsePrice(item.price)
      if (item.quantity > 0 ) {
        tbody.append(`<tr>
          <td>${item.title}</td>
          <td>${item.quantity}</td>
          <td>${formatPrice(price)}</td>
          <td><a class="btn-small btn-primary remove-custom remove-item" data-title="${item.title}">Remove</a></td>
        </tr>`)
      }
      subtotal += price * +(item.quantity)
    }

// Do math
    $('#subtotal').text(formatPrice(subtotal))
    let taxes = (subtotal * .08845)
    $('#taxes').text(formatPrice(taxes))
    let getTotal = taxes + subtotal
    let total = formatPrice(getTotal)
    $('#total').text(total)
  }

  function parsePrice(price) {
    return parseFloat(price.replace(/\$/, ''))
  }

  function formatPrice(price) {
    return '$' + price.toFixed(2)
  }
})

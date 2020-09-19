let carts = document.querySelectorAll('.add-cart')

let products=[
    {
        name:'White Hoodie',
        tag: 'whitehood',
        price: 15,
        inCart:0
    },
    {
        name:'Grey Tshirt',
        tag: 'greyshirt',
        price: 45,
        inCart:0
    },
    {
        name:'Black Hoodie',
        tag: 'blackhood',
        price: 30,
        inCart:0
    },
  
]
for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', ()=>{
        cartNumbers(products[i])
        totalCost(products[i])
    })
}

function onloadcartNumbers(){
    let productno=localStorage.getItem('cartNumbers')
    if(productno){
        document.querySelector('.cart span').textContent=productno;
    }
}


function cartNumbers(product){
  
    let productno=localStorage.getItem('cartNumbers')
    productno=parseInt(productno)
    if(productno){
  localStorage.setItem('cartNumbers',productno + 1)
  document.querySelector('.cart span').textContent=productno + 1;
}
  else{
    localStorage.setItem('cartNumbers',1)
    document.querySelector('.cart span').textContent= 1;
  }
  setItems(product)
}

function setItems(product){
    let cartItems =localStorage.getItem('productsInCart')
    cartItems= JSON.parse(cartItems);

   if(cartItems!=null){
       if(cartItems[product.tag]==undefined){
           cartItems={
               ...cartItems,
               [product.tag]:product
           }

       }
       cartItems[product.tag].inCart +=1
   }
   else{
   product.inCart= 1;
   cartItems= {
    [product.tag]:product
   }}
   localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product){
 
    let cartCost = localStorage.getItem('totalCost');
    if ( cartCost === null){
        localStorage.setItem('totalCost', product.price);
    } else {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }
}

function displayCart(){
    let cartItems=localStorage.getItem('productsInCart')
    cartItems=JSON.parse(cartItems)
    let productcon=document.querySelector(".products")
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productcon){
        productcon.innerHTML='';
        Object.values(cartItems).map(item =>{
            productcon.innerHTML += `<div class="product">
           <img class="ima" src="./images/${item.tag}.jpg">
           <span class="name">${item.name}</span> 
           <div class="prices">${item.price}
           <div class="quantities">
           <i class="fas fa-minus-square"></i>
           <span>${item.inCart}</span>
           <i class="fas fa-plus-square"></i>
           <div class="totals">
           ${item.inCart * item.price},00
           </div> 
           </div>
           </div>
           </div>
`
        })
        productcon.innerHTML +=`
        <div class="basket-container">
        <h4 class="basket-title">
        Basket Total</h4>
        <h4 class="basket-total">
        $${cartCost},00
        </h4>
        </div>`
    }
}

onloadcartNumbers()
displayCart()
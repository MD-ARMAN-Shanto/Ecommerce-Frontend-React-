export const addItemToCart = (item, next) => {
    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        });
         cart = Array.from(new Set(cart.map( p => p._id))).map( id => {
            return cart.find(p => p._id === id );
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
}

//total items in the cart
export const itemTotal = () => {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
}

//get the cart item from the local storage
export const getCartItem = () => {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            console.log('localstorage Item', JSON.parse(localStorage.getItem('cart')))
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
}

//update item count
export const updateItem=(productId, count) => {
    let cart = [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i) => {
            if(product._id === productId){
                cart[i].count = count
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

//remove cart item from the cart
export const removeItem = (productId) => {
    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i) => {
            if(product._id === productId){
                cart.splice(i, 1)
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart;
}

//clear the cart from localstorage
export const emptyCart = next => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('cart')
        next()
    }
}
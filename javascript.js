const CART_KEY = 'dakingoCart';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function addToCart(name, price) {
    let cart = getCart();
    cart.push({ name: name, price: price });
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    
    const toastElement = document.getElementById('cartToast');
    if (toastElement) {
        new bootstrap.Toast(toastElement).show();
    }
    updateCart(); 
}

function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cart = getCart(); 
    
    // 1. Navigation bar count update
    const navOrderCount = document.getElementById('navOrderCount');
    if (navOrderCount) {
        navOrderCount.innerText = cart.length;
    }
    
    // 2. Cart Drawer / Cart Page update
    const cartList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('cartTotal'); 
    
    if (cartList) {
        cartList.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price;
            cartList.innerHTML += `
                <div class="d-flex justify-content-between mb-2 align-items-center">
                    <span>${item.name}</span>
                    <span>${item.price.toLocaleString()} MMK 
                        <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(${index})">x</button>
                    </span>
                </div>`;
        });
        
        if (cartTotal) {
            cartTotal.innerText = total.toLocaleString() + " MMK";
        }
    }
}

document.addEventListener('DOMContentLoaded', updateCart);
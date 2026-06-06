// script.js
let cart = JSON.parse(localStorage.getItem('dakingoCart')) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('dakingoCart', JSON.stringify(cart));
    
    // Toast ပြရန်
    const toastElement = document.getElementById('cartToast');
    if (toastElement) {
        new bootstrap.Toast(toastElement).show();
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('dakingoCart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    // အရေးကြီးဆုံး: Page ပြောင်းတိုင်း LocalStorage ကနေ data အသစ်ပြန်ဆွဲထုတ်မယ်
    cart = JSON.parse(localStorage.getItem('dakingoCart')) || [];
    
    const cartList = document.getElementById('cartItemsList');
    const navOrderCount = document.getElementById('navOrderCount');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartList) return; 
    
    cartList.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        cartList.innerHTML += `
            <div class="d-flex justify-content-between mb-2">
                <span>${item.name}</span>
                <span>${item.price.toLocaleString()} MMK 
                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(${index})">x</button>
                </span>
            </div>`;
    });
    
    if (navOrderCount) navOrderCount.innerText = cart.length;
    if (cartTotal) cartTotal.innerText = total.toLocaleString();
}

// Page ပွင့်လာတိုင်း အလုပ်လုပ်ဖို့
document.addEventListener('DOMContentLoaded', updateCart);
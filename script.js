let cart = [];

// Load cart from localStorage
window.onload = function () {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }

  document.querySelectorAll('.slideshow').forEach((slideshow) => {
    const images = slideshow.querySelectorAll('img');
    let currentIndex = 0;

    setInterval(() => {
      images[currentIndex].classList.remove('active'); // Remove active class from current image
      currentIndex = (currentIndex + 1) % images.length; // Move to the next image
      images[currentIndex].classList.add('active'); // Add active class to the next image
    }, 3000); // Change image every 3 seconds
  });
};

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');

  if (!cartItems || !cartTotal || !cartCount) return;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function toggleCart() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.classList.toggle('hidden');
}

function checkout() {
  alert('Thanks for your purchase!');
  cart = [];
  saveCart();
  updateCartUI();
  toggleCart();
}

// switch button funtion
//const jerseyImages = ["jersey-black.jpg", "jersey-red.jpg", "jersey-white.jpg"];
 // let jerseyIndex = 0;

 // function updateJerseyImage() {
 //   document.getElementById("jersey-image").src = jerseyImages[jerseyIndex];
 // }

 // function nextJersey() {
 //   jerseyIndex = (jerseyIndex + 1) % jerseyImages.length;
 //   updateJerseyImage();
 // }

 // function prevJersey() {
 //   jerseyIndex = (jerseyIndex - 1 + jerseyImages.length) % jerseyImages.length;
 //   updateJerseyImage();
 // }



// ==================== PRODUCTS DATABASE ====================
let products = [
  { id: 1, name: "Essential Oversized T-Shirt", category: "tshirt", price: 899, image: "images/oversizee.jpg", rating: 4.9 },
  { id: 2, name: "Core Classic Tee", category: "tshirt", price: 799, image: "images/ovrsize1.jpg", rating: 4.6 },
  { id: 3, name: "StreetFlow Oversized Tee", category: "tshirt", price: 699, image: "images/oversize2.avif", rating: 4.6 },
  { id: 4, name: "Premium Oxford Button-Down Shirt", category: "shirt", price: 1699, image: "images/shirtt.jpeg", rating: 5 },
  { id: 5, name: "Classic Oxford Shirt", category: "shirt", price: 1399, image: "images/shirt2.jpg", rating: 4.5 },
  { id: 6, name: "Premium Cotton Shirt", category: "shirt", price: 1899, image: "images/shirt3.jpg", rating: 3.5 },
  { id: 7, name: "Urban Relaxed Fit Hoodie", category: "hoodie", price: 1299, image: "images/hoodie.webp", rating: 3.9 },
  { id: 8, name: "Chill Mode Hoodie", category: "hoodie", price: 1099, image: "images/hoodie1.avif", rating: 3.7 },
  { id: 9, name: "Oversize Hoodie", category: "hoodie", price: 1999, image: "images/hoodie2.avif", rating: 4.9 },
  { id: 10, name: "Trendy Jacket", category: "jacket", price: 4099, image: "images/leatherjacket.webp", rating: 4.3 },
  { id: 11, name: "Leather Biker Jacket", category: "jacket", price: 4299, image: "images/jacket1.png", rating: 4.2 },
  { id: 12, name: "Travelling Jacket", category: "jacket", price: 4799, image: "images/leatherjacket.webp", rating: 3.9 },
  { id: 13, name: "Slim Fit Chino Pants", category: "pants", price: 2799, image: "images/pants.jpg", rating: 4.9 },
  { id: 14, name: "Cargo Pants", category: "pants", price: 1399, image: "images/pants1.webp", rating: 4.1 },
  { id: 15, name: "Loose Pants", category: "pants", price: 1699, image: "images/pants2.jpg", rating: 4.6 },
  { id: 16, name: "Stylish Jeans", category: "jeans", price: 2099, image: "images/washjeans.jpg", rating: 5 },
  { id: 17, name: "Vintage Wash Straight Jeans", category: "jeans", price: 2099, image: "images/jeans1.jpg", rating: 4.5 },
  { id: 18, name: "Been Jeans", category: "jeans", price: 2339, image: "images/jeans2.avif", rating:4.2 },
  { id: 19, name: "Classic Crew Neck T-Shirt", category: "tshirt", price: 1699, image: "images/necktshirt.jpg", rating: 3.8 },
  { id: 20, name: "Linen Summer Shirt", category: "shirt", price: 1339, image: "images/summershirt.webp", rating: 4.5 },
  { id: 21, name: "Heavyweight Fleece Hoodie", category: "hoodie", price: 1799, image: "images/flehoodie.webp", rating: 4.3 },
  { id: 22, name: "Denim Trucker Jacket", category: "jacket", price: 1799, image: "images/truckerjacket.webp", rating: 4.8 },
  { id: 23, name: "Cargo Utility Pants", category: "pants", price: 1099, image: "images/cargopants.avif", rating: 4.6 },
  { id: 24, name: "Black Skinny Jeans", category: "jeans", price: 2099, image: "images/skinnyjeans.avif", rating: 4.7 },
  { id: 25, name: "Relaxed Fit Graphic Tee", category: "tshirt", price: 799, image: "images/graphicteeshirt.jpg", rating: 4.9 },
  { id: 26, name: "Quilted Bomber Jacket", category: "jacket", price: 2199, image: "images/bomberjacket.webp", rating: 4.8 },
];

let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || {};

function getCategoryDisplay(cat) {
  const map = {
    tshirt: "T-Shirt", shirt: "Shirt", hoodie: "Hoodie", jacket: "Jacket",
    pants: "Pants", jeans: "Jeans", sneakers: "Sneakers"
  };
  return map[cat] || cat;
}

function renderProducts(filteredProducts) {
  const container = document.getElementById("productContainer");
  const empty = document.getElementById("emptyState");
  container.innerHTML = "";

  if (filteredProducts.length === 0) {
    empty.classList.remove("d-none");
    return;
  }
  empty.classList.add("d-none");

  filteredProducts.forEach((product) => {
    const isLiked = !!likedProducts[product.id];

    const cardHTML = `
      <div class="col">
        <div class="card product-card h-100 shadow-sm">
          <div class="position-relative">
            <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
            ${Math.random() > 0.7 ? `<span class="badge-new badge">NEW</span>` : ""}
          </div>
          <div class="card-body d-flex flex-column p-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <small class="text-muted">${getCategoryDisplay(product.category)}</small>
              <div class="rating-stars">
                ${"★".repeat(Math.floor(product.rating))}<span class="text-muted">${product.rating}</span>
              </div>
            </div>
            <h6 class="card-title mb-2">${product.name}</h6>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <h5 class="text-primary mb-0">₹${product.price}</h5>
              <button onclick="toggleLike(${product.id}, this)" class="like-btn btn btn-sm ${isLiked ? "liked" : ""}">
                <i class="fas fa-heart fa-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

function toggleLike(id, btnElement) {
  if (likedProducts[id]) {
    delete likedProducts[id];
    btnElement.classList.remove("liked");
  } else {
    likedProducts[id] = true;
    btnElement.classList.add("liked");
  }
  localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
  updateLikesCount();
}

function updateLikesCount() {
  const count = Object.keys(likedProducts).length;
  document.getElementById("totalLikes").textContent = count;
}

// function filterCategory(btn) {
//   document.querySelectorAll("#filterButtons button").forEach(b => b.classList.remove("active"));
//   btn.classList.add("active");

//   const category = btn.getAttribute("data-category");
//   const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();

//   let filtered = products;

//   if (category !== "all") {
//     filtered = filtered.filter(p => p.category === category);
//   }

//   if (searchTerm) {
//     filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm)) ||
//     p.category.toLowerCase().includes(searchTerm);
//   }

//   renderProducts(filtered);
// }
function filterCategory(btn) {
  document.querySelectorAll("#filterButtons button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const category = btn.getAttribute("data-category");
  const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();

  let filtered = products.filter(p =>
    (category === "all" || p.category === category) &&
    (p.name.toLowerCase().includes(searchTerm) ||
     p.category.toLowerCase().includes(searchTerm))
  );

  renderProducts(filtered);
}

function filterByCategory(category) {
  const pills = document.querySelectorAll("#filterButtons button");
  pills.forEach(p => p.classList.remove("active"));

  const targetPill = Array.from(pills).find(p => p.getAttribute("data-category") === category);
  if (targetPill) targetPill.classList.add("active");

  document.getElementById("products").scrollIntoView({ behavior: "smooth" });

  const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
  let filtered = products;

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }
  if (searchTerm) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm));
  }

  renderProducts(filtered);
}

function initSearch() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const activeBtn = document.querySelector("#filterButtons button.active");
    if (activeBtn) filterCategory(activeBtn);
  });
}

function toggleLikesView() {
  const filtered = products.filter(p => likedProducts[p.id]);
  renderProducts(filtered);

  document.querySelectorAll("#filterButtons button").forEach(b => b.classList.remove("active"));
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function resetFilters() {
  document.getElementById("searchInput").value = "";
  const allBtn = document.querySelector('#filterButtons button[data-category="all"]');
  filterCategory(allBtn);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// Initialize
window.onload = function () {
  renderProducts(products);
  updateLikesCount();
  initSearch();

  console.log("%c✅ StyleVault Professional Store Loaded Successfully!", "color:#0d6efd; font-size:16px; font-weight:bold");
};
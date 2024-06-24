const API_URL = "https://fakestoreapi.com/";
const userControl = [
  {
    src: "public/assets/UserInteraction/gridicons_share.png",
    title: "Share",
    alt: "Share",
  },
  {
    src: "public/assets/UserInteraction/compare-svgrepo-com 1.png",
    title: "Compare",
    alt: "Compare",
  },
  {
    src: "public/assets/UserInteraction/Heart.png",
    title: "Like",
    alt: "Like",
  },
];

// helper function for fetching data
const fetchData = async (url) => {
  try {
    const getData = await fetch(`${API_URL}${url}`);
    if (!getData.ok) {
      throw new Error("Could not fetch data");
    }
    const jsonData = await getData.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

const createProduct = (product) => {
  const productSection = document.getElementById("product_landing");
  productSection.innerHTML = "";
  // Mapping through each products
  product?.map((product) => {
    // Creating parent Div for item
    const productItem = document.createElement("div");
    productItem.addEventListener("click", () => {
      // Add Routing here for specific Product
      console.log(`Clicked and id is ${product.id}`);
      location.href = `product.html?id=${product.id}`;
    });

    productItem.classList.add("product__images-item");
    // Creating image container
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("product-image-container");
    // Creating img tag
    const img = document.createElement("img");
    img.setAttribute("src", product.image);
    img.setAttribute("alt", product.title);
    img.setAttribute("width", "285px");
    img.setAttribute("height", "301px");
    imageContainer.appendChild(img);
    // Creating image overlay
    const overlay = document.createElement("div");
    overlay.classList.add("product-overlay");
    // Creating button for add to cart
    const addToCart = document.createElement("button");
    addToCart.textContent = "Add to cart";
    overlay.appendChild(addToCart);
    // Creating user controls
    const controls = document.createElement("div");
    controls.classList.add("user-controls");
    // User controls icons
    userControl.map((item) => {
      const controlsP = document.createElement("p");
      const controlsIcon = document.createElement("img");
      controlsIcon.setAttribute("src", item.src);
      controlsIcon.setAttribute("alt", item.alt);
      controlsIcon.setAttribute("width", "16px");
      controlsIcon.setAttribute("height", "16px");
      controlsP.appendChild(controlsIcon);
      const controlsPText = document.createTextNode(item.title);
      controlsP.appendChild(controlsPText);
      controls.appendChild(controlsP);
    });
    overlay.appendChild(controls);
    imageContainer.appendChild(overlay);
    // Creating Product description
    const description = document.createElement("div");
    description.classList.add("product__images-desc");
    const title = document.createElement("h3");
    title.textContent =
      product.title.length > 15
        ? product.title.substring(0, 12) + "..."
        : product.title;
    description.appendChild(title);
    const category = document.createElement("p");
    category.textContent = product.category;
    description.appendChild(category);
    const price = document.createElement("div");
    price.classList.add("price");
    const actualPrice = document.createElement("span");
    actualPrice.classList.add("discounted-price");
    actualPrice.textContent = `Rp ${product.price}`;
    price.appendChild(actualPrice);
    description.appendChild(price);
    productItem.appendChild(imageContainer);
    productItem.appendChild(description);
    productSection.appendChild(productItem);
  });
};

// Landing Page data fetching
const fetchProductDataLimit = async (MAX_DATA) => {
  const product = await fetchData(`products?limit=${MAX_DATA}`);
  createProduct(product);
};

const fetchAllProduct = async () => {
  const product = await fetchData(`products`);
  createProduct(product);
};

const getSingleProduct = async () => {
  // Getting Search parameter from url
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const productData = await fetchData(`products/${productId}`);
  const mainContainer = document.getElementById("single-product-detail");
  mainContainer.innerHTML = "";

  function getStarRatingHTML(rating) {
    // Round the rating to the nearest half
    const roundedRating = Math.round(rating * 2) / 2;
    // Calculate the number of full stars
    const fullStars = Math.floor(roundedRating);
    // Determine if there is a half star
    const hasHalfStar = roundedRating % 1 !== 0 ? 1 : 0;
    // Initialize an empty string for the stars
    let starsHTML = "";
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML +=
        '<img src="public/assets/Product/dashicons_star-filled.svg" alt="star" />';
    }
    // Add half star if needed
    if (hasHalfStar) {
      starsHTML +=
        '<img src="public/assets/Product/carbon_star-half.svg" alt="half star" />';
    }
    // Add empty to make a total of 5
    for (let i = fullStars + hasHalfStar; i < 5; i++) {
      starsHTML += "";
    }
    return starsHTML;
  }
  mainContainer.innerHTML = `<div class="product-info-page">
    <img
        src=${productData.image}
        alt="Grifo"
        width="423"
        height="500"
    />
    <div class="product-info-single">
        <div>
            <h2>${productData.title}</h2>
            <p class="price">Rs. ${productData.price}</p>
        </div>
        <div class="rateing">
            <div class="stars">
                ${getStarRatingHTML(productData.rating.rate)}
            </div>
            <div class="vertical-border"></div>
            <span>${productData.rating.count} Customer Review</span>
        </div>
        <p class="description">
            ${productData.description}
        </p>
        <input
            type="number"
            name="order-product"
            id="order-product"
            placeholder="1"
            style="
                padding: 20px;
                width: 63px;
                font-size: 16px;
                font-weight: 500;
                line-height: 24px;
                text-align: center;
                border-radius: 10px;
                border: 1px solid #9f9f9f;
            "
        />
        <hr style="margin: 60px 0px 30px 0px" />
        <div style="display: flex; gap: 16px">
            <div class="title">
                <p>SKU</p>
                <p>Category</p>
                <p>Tags</p>
                <p>Share</p>
            </div>
            <div class="details">
                <p>: ${productData.id}</p>
                <p>: ${productData.category}</p>
                <p>: ${productData.category}</p>
                <p style="display: flex; align-items: center; gap: 12px">
                    :
                    <img
                        src="public/assets/Product/akar-icons_facebook-fill.svg"
                        alt="facebook"
                        width="20px"
                        height="20px"
                    />
                    <img
                        src="public/assets/Product/akar-icons_linkedin-box-fill.svg"
                        alt="Linkedin"
                        width="20px"
                        height="20px"
                    />
                    <img
                        src="public/assets/Product/ant-design_twitter-circle-filled.svg"
                        alt="Twitter"
                        width="20px"
                        height="20px"
                    />
                </p>
            </div>
        </div>
    </div>
</div>
<div class="product-info-desc">
    <h3>Description</h3>
    <!-- Fetch data here and create fallback state -->
    <p id="product-description">
       ${productData.description}
    </p>
</div>`;

  const titleHistory = document.getElementById("product-name-history");
  titleHistory.textContent = productData.title;
};

const handleViewAll = () => {
  location.href = "shop.html";
};
const formSubmit = () => {
  alert("Form Submitted ");
};
// Running function based on page for optimization
function initializePageScripts() {
  if (document.body.id === "index-page") {
    fetchProductDataLimit(12);
  } else if (document.body.id === "shop-page") {
    fetchAllProduct();
  } else if (document.body.id === "product-page") {
    getSingleProduct();
    fetchProductDataLimit(4);
  }
}

// Initialize the scripts when the DOM content is loaded
document.addEventListener("DOMContentLoaded", initializePageScripts);

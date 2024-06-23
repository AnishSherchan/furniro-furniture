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

// Landing Page data fetching
const fetchProductDataLanding = async () => {
  const MAX_DATA = 12;
  const product = await fetchData(`products?limit=${MAX_DATA}`);
  const productSection = document.getElementById("product_landing");
  productSection.innerHTML = "";
  // Mapping through each products
  product?.map((product) => {
    // Creating parent Div for item
    const productItem = document.createElement("div");
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

// Running function based on page for optimization
function initializePageScripts() {
  if (document.body.id === "index-page") {
    fetchProductDataLanding();
  } else if (document.body.id === "index-page") {
  }
}

// Initialize the scripts when the DOM content is loaded
document.addEventListener("DOMContentLoaded", initializePageScripts);

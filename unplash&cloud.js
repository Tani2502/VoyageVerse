const UNSPLASH_ACCESS_KEY = "iADZkK-R9fNdhCJ_uc6K3NlFdRMcC6nbjt6BIBsXuFM";


const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/diimspeuw/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "Travel_whishlist";

const searchBtn = document.getElementById("search-btn");
const destinationInput = document.getElementById("destination-input");
const imageResults = document.getElementById("image-results");
const wishlist = document.getElementById("wishlist");

// Fetch images from Unsplash API
const searchUnsplash = async (query) => {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=5`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching Unsplash images");
    }

    const data = await response.json();
    return data.results; // Array of image results
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

// Upload image to Cloudinary
const uploadToCloudinary = async (imageUrl) => {
  try {
    // Fetch the image as a blob
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();

    // Create form data for upload
    const formData = new FormData();
    formData.append("file", imageBlob);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    // Upload to Cloudinary
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error uploading to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url; // Uploaded image URL
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// Add destination to wishlist
const addToWishlist = (imageUrl, description) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${imageUrl}" alt="Wishlist Image">
    <div class="info">
      <p>${description}</p>
    </div>
  `;
  wishlist.appendChild(card);
};

// Search Unsplash and display results
searchBtn.addEventListener("click", async () => {
  const query = destinationInput.value.trim();
  if (!query) return;

  const images = await searchUnsplash(query);
  imageResults.innerHTML = "";

  images.forEach((img) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${img.urls.small}" alt="${img.alt_description}">
      <div class="info">
        <p>${img.description || "No description available"}</p>
        <button class="add-btn">Add to Wishlist</button>
      </div>
    `;
    imageResults.appendChild(card);

    // Add image to wishlist when button is clicked
    card.querySelector(".add-btn").addEventListener("click", async () => {
      const uploadedImageUrl = await uploadToCloudinary(img.urls.small);
      if (uploadedImageUrl) {
        addToWishlist(uploadedImageUrl, img.description || "No description available");
      } else {
        alert("Failed to add the destination.");
      }
    });
  });
});
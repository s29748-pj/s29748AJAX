const galleryList = document.getElementById("gallery-list");
const photoContainer = document.getElementById("photo-container");
const photoSection = document.getElementById("photos");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const backButton = document.createElement("button");

// Add "Back to Main Menu" Button
backButton.id = "back-button";
backButton.textContent = "Back to Main Menu";
backButton.onclick = goBack;
document.body.insertBefore(backButton, photoContainer);

// Simulated albums list
const albums = [
    { id: 1, title: "Nature Photography" },
    { id: 2, title: "City Landscapes" },
    { id: 3, title: "Wildlife" },
    { id: 4, title: "Architecture Wonders" },
    { id: 5, title: "Abstract Art" }
];

// Populate album list
albums.forEach(album => {
    const albumDiv = document.createElement("div");
    albumDiv.textContent = album.title;
    albumDiv.classList.add("album-item");
    albumDiv.onclick = () => loadPhotos(album.id, album.title);
    galleryList.appendChild(albumDiv);
});

function loadPhotos(albumId, title) {
    photoContainer.style.display = "block";
    backButton.style.display = "block";
    galleryList.style.display = "none";
    document.getElementById("album-title").textContent = title;
    photoSection.innerHTML = "";

    // Simulate 10 random photos per album using Lorem Picsum
    for (let i = 1; i <= 10; i++) {
        const img = document.createElement("img");
        
        // Generating random images from Lorem Picsum
        const imageUrl = `https://picsum.photos/150/150?random=${albumId}${i}`;
        const fullImageUrl = `https://picsum.photos/600/400?random=${albumId}${i}`;

        img.src = imageUrl;
        img.alt = `Photo ${i} from ${title}`;
        img.classList.add("photo-thumbnail");

        img.onclick = () => openLightbox(fullImageUrl);

        img.onerror = () => {
            img.src = "https://picsum.photos/150/150?random=fallback";
        };

        photoSection.appendChild(img);
    }
}

function openLightbox(url) {
    lightbox.style.display = "flex";
    lightboxImg.src = url;
    lightboxImg.alt = "Expanded photo";
}

// Close lightbox when clicking the close button
document.querySelector(".close").onclick = () => {
    lightbox.style.display = "none";
};

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
});

function goBack() {
    photoContainer.style.display = "none";
    galleryList.style.display = "flex";
    backButton.style.display = "none";
}

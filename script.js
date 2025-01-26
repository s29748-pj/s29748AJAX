const galleryList = document.getElementById("gallery-list");
const photoContainer = document.getElementById("photo-container");
const photoSection = document.getElementById("photos");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// Fetch album list
fetch("https://jsonplaceholder.typicode.com/albums")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(albums => {
        albums.forEach(album => {
            const albumDiv = document.createElement("div");
            albumDiv.textContent = album.title;
            albumDiv.classList.add("album-item");
            albumDiv.onclick = () => loadPhotos(album.id, album.title);
            galleryList.appendChild(albumDiv);
        });
    })
    .catch(error => {
        console.error("Error fetching albums:", error);
    });

function loadPhotos(albumId, title) {
    photoContainer.style.display = "block";
    document.getElementById("album-title").textContent = title;
    photoSection.innerHTML = "";

    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(photos => {
            photos.forEach(photo => {
                const img = document.createElement("img");
                img.src = photo.thumbnailUrl; // Using API-provided thumbnail URL
                img.alt = photo.title;
                img.classList.add("photo-thumbnail");

                img.onclick = () => openLightbox(photo.url); // Using correct URL from API
                photoSection.appendChild(img);
            });
        })
        .catch(error => {
            console.error("Error fetching photos:", error);
        });
}

function openLightbox(url) {
    lightbox.style.display = "flex";
    lightboxImg.src = url;
    lightboxImg.alt = "Expanded photo";
}

document.querySelector(".close").onclick = () => {
    lightbox.style.display = "none";
};

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
});

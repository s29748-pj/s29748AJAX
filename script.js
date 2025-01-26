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

                // Using Lorem Picsum for valid placeholder images
                const validUrl = photo.thumbnailUrl.startsWith("http") 
                    ? photo.thumbnailUrl 
                    : `https://picsum.photos/150?random=${photo.id}`;

                img.src = validUrl;
                img.alt = photo.title;
                img.classList.add("photo-thumbnail");

                img.onclick = () => openLightbox(photo.url.startsWith("http") 
                    ? photo.url 
                    : `https://picsum.photos/600?random=${photo.id}`);

                img.onerror = () => {
                    img.src = "https://picsum.photos/150?random=fallback";
                };

                photoSection.appendChild(img);
            });
        })
        .catch(error => {
            console.error("Error fetching photos:", error);
            photoSection.innerHTML = `<p style="color: red;">Failed to load photos. Please try again later.</p>`;
        });
}

function openLightbox(url) {
    lightbox.style.display = "flex";
    lightboxImg.src = url.startsWith("http") 
        ? url 
        : `https://picsum.photos/600?random=fallback`;
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

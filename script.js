const galleryList = document.getElementById("gallery-list");
const photoContainer = document.getElementById("photo-container");
const photoSection = document.getElementById("photos");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// Fetch album list
fetch("https://jsonplaceholder.typicode.com/albums")
    .then(response => response.json())
    .then(albums => {
        albums.forEach(album => {
            const albumDiv = document.createElement("div");
            albumDiv.textContent = album.title;
            albumDiv.onclick = () => loadPhotos(album.id, album.title);
            galleryList.appendChild(albumDiv);
        });
    });

function loadPhotos(albumId, title) {
    photoContainer.style.display = "block";
    document.getElementById("album-title").textContent = title;
    photoSection.innerHTML = "";

    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then(response => response.json())
        .then(photos => {
            photos.forEach(photo => {
                const img = document.createElement("img");
                img.src = photo.thumbnailUrl;
                img.onclick = () => openLightbox(photo.url);
                photoSection.appendChild(img);
            });
        });
}

function openLightbox(url) {
    lightbox.style.display = "flex";
    lightboxImg.src = url;
}

document.querySelector(".close").onclick = () => {
    lightbox.style.display = "none";
};

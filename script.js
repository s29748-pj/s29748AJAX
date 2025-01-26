const galleryList = document.getElementById("gallery-list");
const photoContainer = document.getElementById("photo-container");
const photoSection = document.getElementById("photos");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const backButton = document.createElement("button");

let currentImageIndex = 0;
let currentAlbumImages = [];


backButton.id = "back-button";
backButton.textContent = "Back to Main Menu";
backButton.onclick = goBack;
document.body.insertBefore(backButton, photoContainer);


const prevBtn = document.createElement("button");
prevBtn.id = "prev-btn";
prevBtn.classList.add("lightbox-btn");
prevBtn.textContent = "❮";
prevBtn.onclick = () => changeImage(-1);
lightbox.appendChild(prevBtn);

const nextBtn = document.createElement("button");
nextBtn.id = "next-btn";
nextBtn.classList.add("lightbox-btn");
nextBtn.textContent = "❯";
nextBtn.onclick = () => changeImage(1);
lightbox.appendChild(nextBtn);


const albums = [
    { id: 1, title: "Nature Photography" },
    { id: 2, title: "City Landscapes" },
    { id: 3, title: "Wildlife" },
    { id: 4, title: "Architecture Wonders" },
    { id: 5, title: "Abstract Art" }
];


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
    currentAlbumImages = [];


    for (let i = 1; i <= 10; i++) {
        const img = document.createElement("img");
        
    
        const imageUrl = `https://picsum.photos/150/150?random=${albumId}${i}`;
        const fullImageUrl = `https://picsum.photos/600/400?random=${albumId}${i}`;

        img.src = imageUrl;
        img.alt = `Photo ${i} from ${title}`;
        img.classList.add("photo-thumbnail");

        img.onclick = () => openLightbox(i - 1);  

        img.onerror = () => {
            img.src = "https://picsum.photos/150/150?random=fallback";
        };

        photoSection.appendChild(img);
        currentAlbumImages.push(fullImageUrl);
    }
}

function openLightbox(index) {
    currentImageIndex = index;
    lightbox.style.display = "flex";
    lightboxImg.src = currentAlbumImages[currentImageIndex];
    lightboxImg.alt = `Image ${currentImageIndex + 1}`;
}

function changeImage(step) {
    currentImageIndex += step;

    if (currentImageIndex < 0) {
        currentImageIndex = currentAlbumImages.length - 1;
    } else if (currentImageIndex >= currentAlbumImages.length) {
        currentImageIndex = 0;
    }

    lightboxImg.src = currentAlbumImages[currentImageIndex];
    lightboxImg.alt = `Image ${currentImageIndex + 1}`;
}


document.querySelector(".close").onclick = () => {
    lightbox.style.display = "none";
};


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

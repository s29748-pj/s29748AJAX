const rootEl = document.getElementById("root");

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

function getAlbums() {
    return fetchData("https://jsonplaceholder.typicode.com/albums");
}

function getAlbum(id) {
    return fetchData(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
}

function drawPage(drawingFunction) {
    rootEl.innerHTML = "";
    drawingFunction();
}

async function drawAlbums() {
    try {
        const container = document.createElement("div");
        container.classList.add("container");
        rootEl.append(container);

        const albums = await getAlbums();

        albums.forEach(({ id, title }) => {
            const albumContainer = document.createElement("div");
            albumContainer.classList.add("album-container");
            albumContainer.innerText = title;

            albumContainer.addEventListener("click", () => {
                drawPage(() => drawAlbum(id));
            });

            container.appendChild(albumContainer);
        });
    } catch (error) {
        console.error("Error fetching albums:", error);
        rootEl.innerText = "Failed to load albums.";
    }
}

async function drawAlbum(id) {
    try {
        const header = document.createElement("div");
        header.classList.add("header");
        rootEl.append(header);

        const button = document.createElement("button");
        button.innerText = "Strona główna";
        button.addEventListener("click", () => {
            drawPage(drawAlbums);
        });
        header.appendChild(button);

        const container = document.createElement("div");
        container.classList.add("container");
        rootEl.append(container);

        const bigPhotoContainer = document.createElement("div");
        bigPhotoContainer.classList.add("big-photo-container", "big-photo-container--hidden");
        rootEl.appendChild(bigPhotoContainer);

        const bigPhotoContainerPhoto = document.createElement("img");
        bigPhotoContainerPhoto.src = "https://via.placeholder.com/600";
        bigPhotoContainer.appendChild(bigPhotoContainerPhoto);

        const bigPhotoContainerButton = document.createElement("button");
        bigPhotoContainerButton.innerText = "Zamknij";
        bigPhotoContainerButton.addEventListener("click", () => {
            bigPhotoContainer.classList.add("big-photo-container--hidden");
        });
        bigPhotoContainer.appendChild(bigPhotoContainerButton);

        const album = await getAlbum(id);

        album.forEach(({ title, url }) => {
            const photoContainer = document.createElement("div");
            photoContainer.classList.add("photo-container");
            container.appendChild(photoContainer);
            photoContainer.addEventListener("click", () => {
                bigPhotoContainer.classList.remove("big-photo-container--hidden");
                bigPhotoContainerPhoto.src = url;
            });

            const photo = document.createElement("img");
            photo.classList.add("photo");
            photo.src = url;
            photo.onerror = () => {
                photo.onerror = null; // Prevent looping
                photo.src = "https://via.placeholder.com/600";
            };
            photoContainer.appendChild(photo);

            const titleEl = document.createElement("div");
            titleEl.classList.add("title");
            titleEl.innerText = title;
            photoContainer.appendChild(titleEl);
        });
    } catch (error) {
        console.error("Error fetching album:", error);
        rootEl.innerText = "Failed to load album.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");
    drawPage(drawAlbums);
});

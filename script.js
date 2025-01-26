const rootEl = document.getElementById("root");

function sendRequest(url, method) {
	console.log(url);
	return new Promise((resolve, reject) => {
		$.ajax({
			url,
			type: method,
			dataType: "json",
			success: function (data) {
				resolve(data);
			},
			error: function (_, error) {
				reject(error);
			},
		});
	});
}

function getAlbums() {
	return sendRequest("https://jsonplaceholder.typicode.com/albums", "GET");
}

function getAlbum(id) {
	return sendRequest(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`, "GET");
}

function drawPage(drawingFunction) {
	rootEl.innerHTML = "";

	drawingFunction();
}

async function drawAlbums() {
	const container = document.createElement("div");
	container.classList.add("container");
	rootEl.append(container);

	const albums = await getAlbums();

	albums.forEach(({ id, title }) => {
		const albumContainer = document.createElement("div");
		albumContainer.classList.add("album-container");
		albumContainer.innerText = title;

		albumContainer.addEventListener("click", () => {
			drawPage(drawAlbum.bind(null, id));
		});

		container.appendChild(albumContainer);
	});
}

async function drawAlbum(id) {
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
	bigPhotoContainer.classList.add("big-photo-container");
	bigPhotoContainer.classList.add("big-photo-container--hidden");
	rootEl.appendChild(bigPhotoContainer);

	const bigPhotoContainerPhoto = document.createElement("img");
	bigPhotoContainerPhoto.setAttribute("src", "");
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
			bigPhotoContainerPhoto.setAttribute("src", url);
		});

		const photo = document.createElement("img");
		photo.classList.add("photo");
		photo.setAttribute("src", url);
		photoContainer.appendChild(photo);

		const titleEl = document.createElement("div");
		titleEl.classList.add("title");
		titleEl.innerText = title;
		photoContainer.appendChild(titleEl);
	});
}

drawPage(drawAlbums);

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
function previewAvatar() {
    let file = document.getElementById("avatarUpload").files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("avatar").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}



function addVideo() {
    let url = document.getElementById("videoUrl").value;
    let desc = document.getElementById("videoDesc").value || "Aucune description";
    let file = document.getElementById("videoFile").files[0];

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        let embedUrl = url.replace("watch?v=", "embed/");
        displayVideo(embedUrl, desc, false);
    } else if (file) {
        let fileUrl = URL.createObjectURL(file);
        displayVideo(fileUrl, desc, true);
    } else {
        alert("Lien non valide ou aucun fichier sélectionné !");
    }

    document.getElementById("videoUrl").value = "";
    document.getElementById("videoDesc").value = "";
    document.getElementById("videoFile").value = "";
}
function updateProfile() {
    let username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    alert("Profil mis à jour !");
}

function displayVideo(embedUrl, desc, isFile) {
    let videoContainer = document.createElement("div");
    videoContainer.classList.add("video-item");

    videoContainer.innerHTML = `
        ${isFile ? `<video controls><source src="${embedUrl}" type="video/mp4"></video>` 
                 : `<iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`}
        <div class="video-info">
            <p>${desc}</p>
            <button class="btn">👍 J'aime</button>
        </div>
    `;

    document.getElementById("video-list").appendChild(videoContainer);
}

function sortVideo() {
    alert("Fonction de tri en développement !");
}
function addVideo() {
    let url = document.getElementById("videoUrl").value;
    let desc = document.getElementById("videoDesc").value || "Aucune description";
    let file = document.getElementById("videoFile").files[0];

    let videoData = [];

    if (localStorage.getItem("videos")) {
        videoData = JSON.parse(localStorage.getItem("videos"));
    }

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        let embedUrl = url.replace("watch?v=", "embed/");
        videoData.push({ url: embedUrl, desc: desc, isFile: false });
    } else if (file) {
        let fileUrl = URL.createObjectURL(file);
        videoData.push({ url: fileUrl, desc: desc, isFile: true });
    } else {
        alert("Lien non valide ou aucun fichier sélectionné !");
        return;
    }

    localStorage.setItem("videos", JSON.stringify(videoData));
    displayVideos();
}

function displayVideos() {
    let videoList = document.getElementById("video-list");
    videoList.innerHTML = "";

    let videoData = JSON.parse(localStorage.getItem("videos") || "[]");

    videoData.forEach(video => {
        let videoContainer = document.createElement("div");
        videoContainer.classList.add("video-item");

        videoContainer.innerHTML = `
            ${video.isFile ? `<video controls><source src="${video.url}" type="video/mp4"></video>` 
                           : `<iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>`}
            <div class="video-info">
                <p>${video.desc}</p>
                <button class="btn" onclick="removeVideo('${video.url}')">🗑️ Supprimer</button>
            </div>
        `;

        videoList.appendChild(videoContainer);
    });
}

function removeVideo(videoUrl) {
    let videoData = JSON.parse(localStorage.getItem("videos") || "[]");
    videoData = videoData.filter(video => video.url !== videoUrl);
    localStorage.setItem("videos", JSON.stringify(videoData));
    displayVideos();
}

window.onload = displayVideos;
function toggleProfileMenu() {
    let menu = document.getElementById("profile-menu");
    menu.style.display = menu.style.display === "none" || menu.style.display === "" ? "block" : "none";
}

function saveUsername() {
    let username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    alert("Nom enregistré !");
}

function previewAvatar() {
    let file = document.getElementById("avatarUpload").files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("avatar").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function uploadAvatar() {
    let avatarSrc = document.getElementById("avatar").src;
    localStorage.setItem("userAvatar", avatarSrc);
    alert("Avatar enregistré !");
}

function loadProfile() {
    let savedAvatar = localStorage.getItem("userAvatar");
    let savedName = localStorage.getItem("username");

    if (savedAvatar) {
        document.getElementById("avatar").src = savedAvatar;
    }
    if (savedName) {
        document.getElementById("username").value = savedName;
    }
}

window.onload = loadProfile;
function searchVideo() {
    let query = document.getElementById("searchBar").value.toLowerCase();
    let videos = document.querySelectorAll(".video-item");

    videos.forEach(video => {
        video.style.display = video.innerHTML.toLowerCase().includes(query) ? "block" : "none";
    });
}
function toggleAddVideo() {
    let menu = document.getElementById("add-video-menu");
    menu.style.display = menu.style.display === "none" || menu.style.display === "" ? "block" : "none";
}

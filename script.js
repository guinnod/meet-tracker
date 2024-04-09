const styles = `
        .modal-anchor {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0,0,0,0.4);
        }
        .modal {
            background-color: #fefefe;
            margin: 10% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 500px;
            position: relative;
        }
        .close-icon {
            color: #aaa;
            position: absolute;
            top: 0px;
            right: 10px;
            font-size: 28px;
            cursor: pointer;
        }
        .content-container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 20px;
        }
        .modal-title {
            margin-bottom: 15px;
            text-align: center;
            max-width: 300px;
        }
        .image-container {
            display: flex;
            justify-content: center;
            gap: 10px;
        }
        .image-container img {
            max-width: 200px;
            aspect-ratio: 1/1;
        }
        .modal-btn, .start-tracking-btn {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            display: inline-block;
        }
        .modal-btn {
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 1001;
        }
        .start-tracking-btn {
            margin-top: 20px;
        }
    `;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const modalAnchor = document.createElement("div");
modalAnchor.classList.add("modal-anchor");

const modal = document.createElement("div");
modal.classList.add("modal");

const closeIcon = document.createElement("span");
closeIcon.classList.add("close-icon");
closeIcon.innerHTML = "&times;";

const contentContainer = document.createElement("div");
contentContainer.classList.add("content-container");

const title = document.createElement("h3");
title.classList.add("modal-title");
title.textContent =
    "You should change the layout to tiled mode as shown below.";

const imageContainer = document.createElement("div");
imageContainer.classList.add("image-container");

const image = document.createElement("img");
image.src =
    "https://raw.githubusercontent.com/guinnod/photo-base/main/gmeet_1.jpg";
image.alt = "Click on the three dots";

const image2 = document.createElement("img");
image2.src =
    "https://raw.githubusercontent.com/guinnod/photo-base/main/gmeet_2.jpg";
image2.alt = "Select 'Change layout' to 'Tiled' mode";

const startTrackingBtn = document.createElement("button");
startTrackingBtn.classList.add("start-tracking-btn");
startTrackingBtn.textContent = "Start Tracking";

imageContainer.appendChild(image);
imageContainer.appendChild(image2);

contentContainer.appendChild(title);
contentContainer.appendChild(imageContainer);
contentContainer.appendChild(startTrackingBtn);

modal.appendChild(closeIcon);
modal.appendChild(contentContainer);

modalAnchor.appendChild(modal);

document.body.appendChild(modalAnchor);

const button = document.createElement("button");
button.innerText = "Open Modal";
button.classList.add("modal-btn");

document.body.appendChild(button);

function closeModal() {
    modalAnchor.style.display = "none";
}

button.addEventListener("click", () => {
    modalAnchor.style.display = "block";
});

closeIcon.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
    if (event.target === modalAnchor) {
        closeModal();
    }
});

startTrackingBtn.addEventListener("click", () => {
    console.log("Start Tracking clicked.");
    closeModal();
});

(function insertStyles() {
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
    .modal-btn, .start-tracking-btn, .stop-tracking-btn {
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
    .stop-tracking-btn {
        margin-top: 20px;
        background-color: #dc3545;
    }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
})();

(function drawModal() {
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

    const stopTrackingBtn = document.createElement("button");
    stopTrackingBtn.classList.add("stop-tracking-btn");
    stopTrackingBtn.textContent = "Stop Tracking";

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
        startTrackingBtn.parentNode.replaceChild(
            stopTrackingBtn,
            startTrackingBtn
        );
        startTracking();
        closeModal();
    });

    stopTrackingBtn.addEventListener("click", () => {
        stopTrackingBtn.parentNode.replaceChild(
            startTrackingBtn,
            stopTrackingBtn
        );
        stopTracking();
        closeModal();
    });
})();

var observingInterval;
var sendingInterval;

const observingIntervalTime = 1000;
const sendingIntervalTime = 2000;

function startTracking() {
    observingInterval = setInterval(() => {
        observe();
    }, observingIntervalTime);

    sendingInterval = setInterval(() => {
        sendData();
    }, sendingIntervalTime);
}

function stopTracking() {
    clearInterval(observingInterval);
    clearInterval(sendingInterval);
}

const dataKey = "google_meet_data";

function getData() {
    try {
        return JSON.parse(sessionStorage.getItem(dataKey)) || [];
    } catch (error) {
        return [];
    }
}

function setData(data) {
    try {
        const raw = JSON.stringify(data);
        sessionStorage.setItem(dataKey, raw);
    } catch (error) {}
}

async function sendData() {
    const data = getData();
    try {
        // TO-DO: Send data to the server
        await new Promise((resolve) => setTimeout(resolve, 3000));
        if (false) {
            throw new Error("Failed to send data");
        }
        setData([]);
        console.log("Data sent");
    } catch (error) {}
}

function observe() {
    console.log("Observe");
    collectData();
}

function collectData() {
    const groupedElements = {};

    ["div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6"].forEach((tag) => {
        document.querySelectorAll(tag).forEach((el) => {
            const ariaHidden = el.getAttribute("aria-hidden") === "true";
            const hasRoleTooltip = el.getAttribute("role") === "tooltip";

            if (
                el.innerText.trim() !== "" &&
                el.children.length === 0 &&
                !ariaHidden &&
                !hasRoleTooltip
            ) {
                const className = el.className || "no-class";

                if (!groupedElements[className]) {
                    groupedElements[className] = [];
                }

                groupedElements[className].push({
                    element: el,
                    depth: calculateDepth(el),
                });
            }
        });
    });

    Object.entries(groupedElements).forEach(([className, group]) => {
        if (
            group.length > 1 &&
            group.every((item) => item.depth === group[0].depth)
        ) {
            const elements = group.map((item) => item.element);
            const commonParent = findFirstCommonParent(elements);

            elements.forEach((element) => {
                const parentAfterCommon = findParentAfterCommon(
                    element,
                    commonParent
                );
                const hasVisibleVideo = checkForVisibleVideo(parentAfterCommon);
                console.log(
                    `Element text: "${element.innerText}", Has visible video: ${hasVisibleVideo}`
                );
            });
        }
    });
}

function checkForVisibleVideo(parent) {
    const videos = parent ? parent.getElementsByTagName("video") : [];
    return Array.from(videos).some((video) => video.style.display !== "none");
}

function calculateDepth(el) {
    let depth = 0;
    while (el.parentElement) {
        depth++;
        el = el.parentElement;
    }
    return depth;
}

function findFirstCommonParent(elements) {
    const paths = elements.map((el) => {
        const path = [];
        while (el) {
            path.unshift(el);
            el = el.parentElement;
        }
        return path;
    });

    let commonParent = null;
    for (let i = 0; i < paths[0].length; i++) {
        const current = paths[0][i];
        if (paths.every((path) => path[i] === current)) {
            commonParent = current;
        } else {
            break;
        }
    }
    return commonParent;
}

function findParentAfterCommon(element, commonParent) {
    let parent = element.parentElement;
    while (parent && parent !== commonParent) {
        if (parent.parentElement === commonParent) {
            return parent;
        }
        parent = parent.parentElement;
    }
    return null;
}

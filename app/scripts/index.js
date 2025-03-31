import { initializeDB, logoutUser } from "./storage.js";



document.addEventListener("DOMContentLoaded", initializeDB );

const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logoutUser);
    }
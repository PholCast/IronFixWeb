import { initializeDB, logoutUser } from "./storage.js";



document.addEventListener("DOMContentLoaded", initializeDB );

const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(){
            logoutUser()
            window.location.href = "../html/login.html";

        });
    }
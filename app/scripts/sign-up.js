import { getDB, addUser } from "./storage.js";


const registerUser = event => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const password2 = document.getElementById("password2").value.trim();
    

    if (password !== password2) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    const db = getDB();
    const existingUser = db.users.find(user => user.username === username || user.email === email);
    
    if (existingUser) {
        alert("El nombre de usuario o correo electrónico ya están en uso.");
        return;
    }

    const newUser = {
        username,
        email,
        password, 
        role: "admin" 
    };

    addUser(newUser);
    alert("Registro exitoso. Redirigiendo al login...");
    window.location.href = "./login.html";
};


document.querySelector("form").addEventListener("submit", registerUser);

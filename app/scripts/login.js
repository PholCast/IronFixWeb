import { getDB, setCurrentUser } from "./storage.js";

const validateUser = event => {
    event.preventDefault(); // Evita que el form submit vaya a otra pagina

    const usernameOrEmail = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const selectedRole = document.getElementById("role").value;

    const db = getDB();
    const user = db.users.find(user => 
        (user.username === usernameOrEmail || user.email === usernameOrEmail) && 
        user.password === password && selectedRole === user.role
    );

    if (user) {
        setCurrentUser(user); 
        

        if (user.role === "admin") {
            window.location.href = "../html/index.html"; 
        }
        else{
            window.location.href = "../html/technician-index.html";
        }
        
    } else {
        alert("Datos incorrectos.");
    }
};

document.querySelector("form").addEventListener("submit", validateUser);

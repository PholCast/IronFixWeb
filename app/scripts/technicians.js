import {addUser} from "./storage.js";
document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todos los botones de eliminar
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            // Encuentra la fila de técnico más cercana y la elimina
            const technicianRow = event.target.closest(".technician-row");
            if (technicianRow) {
                technicianRow.remove();
            }
        });
    });

    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const technicianRow = event.target.closest(".technician-row");
            if (technicianRow) {

                const nameElement = technicianRow.querySelector(".technician-name div:last-child");
                const companyElement = technicianRow.querySelector(".technician-company");
                const contactElement = technicianRow.querySelector(".technician-contact");

                // Pedir nuevos valores
                const newName = prompt("Ingrese el nuevo nombre:", nameElement.textContent);
                const newCompany = prompt("Ingrese la nueva empresa:", companyElement.textContent);
                const newContact = prompt("Ingrese el nuevo contacto:", contactElement.textContent);

                // Actualizar los valores si el usuario ingresó datos
                if (newName) nameElement.textContent = newName;
                if (newCompany) companyElement.textContent = newCompany;
                if (newContact) contactElement.textContent = newContact;
            }
        });
    });

    
    const registerButton = document.querySelector(".register-btn");

    if (registerButton) {
        registerButton.addEventListener("click", () => {
            
            const name = prompt("Ingrese el nombre del técnico:");
            const company = prompt("Ingrese la empresa del técnico:");
            const email = prompt("Ingrese el correo del técnico:");
            const password = prompt("Ingrese las contraseña del técnico:");
            const phone = prompt("Ingrese el contacto del técnico:");

            if (name && company && phone && email && password) {
                // Crear una nueva fila
                const newRow = document.createElement("div");
                newRow.classList.add("technician-row");

                // Definir el contenido de la nueva fila
                newRow.innerHTML = `
                    <div class="technician-name">
                        <div class="technician-avatar" style="background-image: url('../assets/profileBlank-removebg-preview.png');"></div>
                        <div>${name}</div> 
                    </div>
                    <div class="technician-company">${company}</div> 
                    <div class="technician-contact">${phone}</div> 
                    <div class="technician-actions">
                        <button class="action-btn delete-btn"><i class="fa-regular fa-trash-can"></i></button>
                        <button class="action-btn edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
                    </div>
                `;

                const newtechnician = {
                    username:name,
                    email,
                    password, 
                    role: "technician" 
                };

                addUser(newtechnician)

                // Agrega la nueva fila a la tabla
                const techniciansTable = document.querySelector(".technicians-table");
                if (techniciansTable) {
                    techniciansTable.appendChild(newRow);
                }

                // Agregar eventos a los botones del tecnico creado
                newRow.querySelector(".delete-btn").addEventListener("click", () => newRow.remove());
                newRow.querySelector(".edit-btn").addEventListener("click", () => {
                    const newName = prompt("Ingrese el nuevo nombre:", name);
                    const newCompany = prompt("Ingrese la nueva empresa:", company);
                    const newPhone = prompt("Ingrese el nuevo contacto:", phone);

                    if (newName) newRow.querySelector(".technician-name div:last-child").textContent = newName;
                    if (newCompany) newRow.querySelector(".technician-company").textContent = newCompany;
                    if (newPhone) newRow.querySelector(".technician-contact").textContent = newPhone;
                });
            } else {
                alert("Debe ingresar todos los datos para registrar un técnico.");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    
    const addButton = document.querySelector(".add-btn");

    addButton.addEventListener("click", () => {
    
        const id = prompt("Ingrese el id del equipo:");
        const name = prompt("Ingrese el nombre del equipo:");
        const location = prompt("Ingrese la ubicación del equipo:");
        const status = prompt("Ingrese el estado del equipo:");

        
        if (name && location && status) {

            const newRow = document.createElement("div");
            newRow.classList.add("equipment-row");

            newRow.innerHTML = `
                <div class="equipment-icon-cell">
                    <a href="./equipment-info.html">
                        <div class="equipment-icon" style="background-image: url('../assets/tools.png');">
                        </div>
                    </a>
                </div>
                <div class="equipment-id">${id}</div>
                <div class="equipment-type">${name}</div>
                <div class="equipment-location">${location}</div>
                <div class="equipment-status">${status}</div>
                <div class="equipment-actions">
                    <button class="action-btn delete-btn"><i class="fa-regular fa-trash-can"></i></button>
                    <button class="action-btn edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
                </div>
            `;

            const equipmentTable = document.querySelector(".equipment-table");
            if (equipmentTable) {
                equipmentTable.appendChild(newRow);
            }

            newRow.querySelector(".delete-btn").addEventListener("click", () => newRow.remove());
            newRow.querySelector(".edit-btn").addEventListener("click", () => {
                const newLocation = prompt("Ingrese la nueva ubicación:");
                const newStatus = prompt("Ingrese el nuevo estado:");

                if (newLocation) {
                    newRow.querySelector(".equipment-location").textContent = newLocation;
                }
                if (newStatus) {
                    newRow.querySelector(".equipment-status").textContent = newStatus;
                    }
            });
        } else {
                alert("Debe ingresar todos los datos para agregar un equipo.");
            }
    });
    

    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const equipmentRow = event.target.closest(".equipment-row");
            if (equipmentRow) {
                equipmentRow.remove();
            }
        });
    });

    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const equipmentRow = event.target.closest(".equipment-row");
            if (equipmentRow) {
                const newLocation = prompt("Ingrese la nueva ubicación:");
                const newStatus = prompt("Ingrese el nuevo estado:");

                if (newLocation) {
                    equipmentRow.querySelector(".equipment-location").textContent = newLocation;
                }
                if (newStatus) {
                    equipmentRow.querySelector(".equipment-status").textContent = newStatus;
                }
            }
        });
    });
});

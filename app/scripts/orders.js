document.addEventListener("DOMContentLoaded", () => {
    const acceptButtons = document.querySelectorAll(".accept-btn");
    if (acceptButtons){
    acceptButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.textContent = "Orden aceptada"; 
            button.classList.add("accepted"); 

        });
    })};


    const newOrderBtn = document.querySelector(".new-order-btn");
    const maintenanceGrid = document.querySelector(".maintenance-grid");
    
    if (newOrderBtn && maintenanceGrid) {
        newOrderBtn.addEventListener("click", () => {
            // Datos para la nueva orden
            const title = prompt("Ingrese el título de la nueva orden de mantenimiento");
            const description = prompt("Descripción breve de la nueva orden.");
    
            // Crear el nuevo elemento de la orden
            if(title && description){
            const orderCard = document.createElement("div");
            orderCard.classList.add("maintenance-card");
            orderCard.innerHTML = `
                <div class="card-image" style="background-image: url('../assets/tools.png');"></div> 
                <div class="card-content">
                    <div class="card-title">${title}</div> 
                    <div class="card-description">${description}</div>
                </div>
            `;
    
            // Agregar la nueva orden al html
            maintenanceGrid.appendChild(orderCard);
            }else{
                alert("Debes ingresar todos los datos para crear la orden")
            }
            
        });
        }


});

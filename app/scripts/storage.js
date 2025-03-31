const initializeDB = () => {
    if (!localStorage.getItem("db")) {
        let initialDB = {
            users: [],
            equipment: [],
            orders: []
        };
        localStorage.setItem("db", JSON.stringify(initialDB));
        console.log("Base de datos creada en localStorage.");
    } else {
        console.log("Base de datos ya esta creada.");
    }
    
    if (!localStorage.getItem("currentUser")) {
        localStorage.setItem("currentUser", JSON.stringify(null));
        console.log("Current user initialized as null.");
    }
    
}

const getDB = () => JSON.parse(localStorage.getItem("db"));

const saveDB = db => localStorage.setItem("db", JSON.stringify(db));


const addUser = user => {
    const db = getDB();
    db.users.push(user);
    saveDB(db);
    console.log("User added:", user);
};

const addEquipment = equipment => {
    const db = getDB();
    db.equipment.push(equipment);
    saveDB(db);
    console.log("Equipment added:", equipment);
};

const addOrder = order => {
    const db = getDB();
    db.orders.push(order);
    saveDB(db);
    console.log("Service order added:", order);
};

const getCurrentUser = () => JSON.parse(localStorage.getItem("currentUser"));
const setCurrentUser = user => localStorage.setItem("currentUser", JSON.stringify(user));
const logoutUser = () => localStorage.setItem("currentUser", JSON.stringify(null));

export {initializeDB, getDB,saveDB,addUser,addEquipment,addOrder,getCurrentUser,setCurrentUser,logoutUser}
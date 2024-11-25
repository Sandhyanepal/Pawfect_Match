// import { API } from "../config"

// // To fetch all pets
// export const getAllPets = () => {
//     return fetch(`${API}/getallpets`)
//         .then(response => response.json())
//         .catch(error => console.log(error))
// }

import { API } from "../config"; // Import the API constant from config.js

// To fetch all pets
export const getAllPets = () => {
    return fetch(`${API}/getallpets`)
        .then(response => response.json())
        .catch(error => console.log(error));
};

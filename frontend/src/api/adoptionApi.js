export const getAdoption = () => {
    return fetch(`${API}/getAdoption`)
    .then(response => response.json())
    .catch(error => console.log(error))
}
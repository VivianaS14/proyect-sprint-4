import { URL_PATHS } from "./url.js";
import { httpPOST, httpPATCH } from "./CRUD.js";

export const checkOut = () => {
    const form = document.querySelector('#form-checkout');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        let products = JSON.parse(localStorage.getItem('shoppingFastCart'));
        let client = {
            id: document.querySelector('.input-id').value,
            name: document.querySelector('.input-name').value,
            email: document.querySelector('.input-email').value,
            address: document.querySelector('.input-address').value,
            phone: document.querySelector('.input-phone').value,
            products: products
        }
        await httpPOST(URL_PATHS.shopping, client);
        localStorage.clear();
        window.location.pathname = '/proyect-sprint04/index.html';
    })

}

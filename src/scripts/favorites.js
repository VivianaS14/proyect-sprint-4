import { URL_PATHS } from "./url.js";
import { getProducts } from "./products.js";
import { httpGET, httpPOST, httpDELETE } from "./CRUD.js";
import { amountProducts, addToCart } from "./cart.js";


export const addFavorite = () => {
    const btnFavorites = document.querySelectorAll('.btn-favorite');
    btnFavorites.forEach(btn => {
        btn.addEventListener('click', async () => {
            let product = await getProducts(`?q=${btn.getAttribute('id')}`);
            let newProduct = {
                id: product[0].id,
                category: product[0].category,
                name: product[0].name,
                quantity: product[0].quantity,
                price: product[0].price,
                image: product[0].image,
                stock: product[0].stock
            }
            await httpPOST(URL_PATHS.favorites, newProduct);
            window.location.pathname = '/pages/favorites.html';
        })
    });
};

export const getFavorites = async () => {
    return await httpGET(URL_PATHS.favorites);
}

export const printFavorites = (products) => {
    const container = document.querySelector('#favorites-container');
    container.innerHTML = '';

    products.forEach(product => {
        const { id, image, category, name, quantity, price } = product;

        container.innerHTML += `
            <div class="card m-2" style="width: 18rem">
                <img
                    src="${image}"
                    class="card-img-top position-relative p-5"
                    alt="image-product-${id}"
                />
                <button
                    id="${id}"
                    type="button"
                    class="btn btn-danger position-absolute top-10 start-0 m-2"
                >
                    <i class="bx bx-heart fs-5"></i>
                </button>
                <button
                    id="${id}"
                    type="button"
                    class="btn btn-light position-absolute top-10 end-0 m-2 btn-delete-favorite"
                >
                    <i class="bx bx-x fs-5"></i>
                </button>
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">${category}</h6>
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${quantity}.</p>
                <p class="card-text text-green">$ ${price}</p>
                <div class="input-group mb-3 mx-auto w-75">
                    <button id="${id}" type="button" class="input-group-text btn color-green btn-minus">
                        <i class="bx bx-minus"></i>
                    </button>
                    <input
                        id="${id}"
                        type="text"
                        class="form-control ps-5 input-amount"
                        aria-label="Amount"
                        value="0"
                        disabled
                    />
                    <button id=${id} type="button" class="input-group-text btn color-green btn-plus">
                        <i class="bx bx-plus"></i>
                    </button>
                </div>
                <div class="container text-center">
                    <button id=${id} type="button" class="btn color-green w-75 btn-addToCart">Add To Cart</button>
                </div>
            </div>
            </div>
        `
    });

    addToCart();
}

export const deleteFavorites = () => {
    const btnDeleteFav = document.querySelectorAll('.btn-delete-favorite');

    btnDeleteFav.forEach(btn => {
        btn.addEventListener('click', async () => {
            await httpDELETE(URL_PATHS.favorites, btn.getAttribute('id'));
        })
    });
}
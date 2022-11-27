import { URL_PATHS } from "./url.js";
import { httpGET } from "./CRUD.js";
import { addFavorite } from "./favorites.js";
import { amountProducts, addToCart } from "./cart.js";

export const getProducts = async (_order = "") => {
    return await httpGET(URL_PATHS.products + _order);
}

export const printAllProducts = (products) => {
    const container = document.querySelector('#cards-container');
    container.innerHTML = "";

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
                    class="btn btn-outline-danger position-absolute top-10 start-0 m-2 btn-favorite"
                >
                    <i class="bx bx-heart fs-5"></i>
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

    addFavorite();
    amountProducts();
    addToCart();
}

export const stockProducts = async () => {
    let products = await getProducts();
    let all = 0;
    let veggies = 0;
    let beverages = 0;
    let meats = 0;
    let breakies = 0;
    let frozens = 0;
    let snacks = 0;
    let grocery = 0;
    let alcohols = 0;

    products.forEach(prod => {
        const { category } = prod
        all++;
        switch (category) {
            case "Vegetables & Fruits":
                veggies++
                break;
            case "Beverages":
                beverages++
                break;
            case "Meats & Seafood":
                meats++
                break;
            case "Breakfast & Dairy":
                breakies++
                break;
            case "Frozen Foods":
                frozens++
                break;
            case "Biscuits & Snacks":
                snacks++
                break;
            case "Grocery & Staples":
                grocery++
                break;
            case "Wines & Alcohol Drinks":
                alcohols++
                break;
        }
    });

    document.querySelector('#stock-all').innerText = all;
    document.querySelector('#stock-veggie').innerText = veggies;
    document.querySelector('#stock-beverages').innerText = beverages;
    document.querySelector('#stock-meats').innerText = meats;
    document.querySelector('#stock-breaky').innerText = breakies;
    document.querySelector('#stock-frozen').innerText = frozens;
    document.querySelector('#stock-snacks').innerText = snacks;
    document.querySelector('#stock-grocery').innerText = grocery;
    document.querySelector('#stock-alcohol').innerText = alcohols;
}
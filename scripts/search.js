import { getProducts, printAllProducts } from "./products.js";

export const searchCategories = () => {
    const categories = document.querySelectorAll('.categories');

    categories.forEach(categ => {
        categ.addEventListener('click', async () => {
            categ.getAttribute('id')
            if (categ.getAttribute('id') === "type-veggies") {
                let types = await getProducts("?category_like=Fruits");
                printAllProducts(types);
            } else if (categ.getAttribute('id') === "type-beverages") {
                let types = await getProducts("?category_like=Beverages");
                printAllProducts(types);
            } else if (categ.getAttribute('id') === "type-meats") {
                let types = await getProducts("?category_like=meats");
                printAllProducts(types);
            } else if (categ.getAttribute('id') === "type-breaky") {
                let types = await getProducts("?category_like=break");
                printAllProducts(types);
            } else if (categ.getAttribute('id') === "type-frozen") {
                let types = await getProducts("?category_like=frozen");
                printAllProducts(types);
            } else if (categ.getAttribute('id') === "type-snacks") {
                let types = await getProducts("?category_like=snacks");
                printAllProducts(types);
            } else if (categ.getAttribute('id') === "type-grocery") {
                let types = await getProducts("?category_like=grocery");
                printAllProducts(types);
            } else if (categ.getAttribute('id') === "type-alcohol") {
                let types = await getProducts("?category_like=alcohol");
                printAllProducts(types);
            } else if (categ.getAttribute('id') === "type-all") {
                let types = await getProducts("?_sort=name");
                printAllProducts(types);
            }

        })
    });
};

export const searchInput = () => {
    const input = document.querySelector('#input-search');
    input.addEventListener('keyup', async e => {
        let valueSearched = await getProducts(`?q=${e.target.value}`);
        printAllProducts(valueSearched);
    });
    const formSearch = document.querySelector('#form-search');
    formSearch.addEventListener('submit', async e => {
        e.preventDefault();
        let valueSearched = await getProducts(`?q=${input.value}`);
        printAllProducts(valueSearched);
        formSearch.reset();
    });
}

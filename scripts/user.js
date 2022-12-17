import { httpGET, httpPOST, httpPATCH, httpDELETE } from "./CRUD.js";
import { URL_PATHS } from "./url.js";
import { stockProducts } from "./products.js";

const validationExpres = {
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password: /^[\w@-]{8,20}$/
}

export const validationUser = () => {
    const inputs = document.querySelectorAll('.admin-control');
    inputs.forEach(input => {
        input.addEventListener('keyup', e => {
            if (e.target.attributes.name.value === 'input-admin-email') {
                if (validationExpres['email'].test(e.target.value)) {
                    document.querySelector('.admin-error-email').classList.add('d-none');
                    document.querySelector('#input-admin-email').classList.remove('border-error');
                    loginAdmin();
                } else {
                    document.querySelector('#input-admin-email').classList.add('border-error')
                    document.querySelector('.admin-error-email').classList.remove('d-none');
                }
            } else {
                if (validationExpres['password'].test(e.target.value)) {
                    document.querySelector('.admin-error-password').classList.add('d-none');
                    document.querySelector('#input-admin-password').classList.remove('border-error');
                    loginAdmin();
                } else {
                    document.querySelector('#input-admin-password').classList.add('border-error');
                    document.querySelector('.admin-error-password').classList.remove('d-none');
                }
            }
        })
    });
}

export const loginAdmin = () => {
    const inputs = document.querySelectorAll('.admin-control');
    let admin = inputs[0].value
    let pass = inputs[1].value

    const formLogin = document.querySelector('#admin-form');
    formLogin.addEventListener('submit', e => {
        e.preventDefault();
        if (admin === 'admin@fastkart.com' && pass === '@Admin-1') {
            window.location.pathname = '/pages/admin.html'
            console.log('Entre');
        }
    })
}

export const getStockProduct = async (order = "") => {
    let products = await httpGET(URL_PATHS.products, order)
    return products;
}

export const showProducts = async (products) => {
    const productContainer = document.querySelector('#cards-container');
    productContainer.innerHTML = ''
    products.forEach(product => {
        const { id, image, category, name, quantity, price, stock } = product;
        productContainer.innerHTML += `
            <div class="card m-2" style="width: 18rem">
                <img
                    src="${image}"
                    class="card-img-top p-5"
                    alt="image-product-${id}"
                />
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">${id}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">${category}</h6>
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${quantity}.</p>
                    <p class="card-text">Stock ${stock}.</p>
                    <p class="card-text text-green">$ ${price}</p>
                    <div class="container text-center">
                        <button id=${id} type="button" class="btn color-green w-75 mb-3 btn-edit" data-bs-toggle="modal"
                        data-bs-target="#formProducts">Edit</button>
                    </div>
                    <div class="container text-center">
                        <button id=${id} type="button" class="btn color-orange w-75 btn-delete">Delete</button>
                    </div>
                </div>
            </div>
        `
    });
    stockProducts();
    searchProd();
    editProduct();
    deleteProduct();
}

export const searchProd = () => {
    const categories = document.querySelectorAll('.categories');
    categories.forEach(categ => {
        categ.addEventListener('click', async () => {
            categ.getAttribute('id')
            if (categ.getAttribute('id') === "type-veggies") {
                let types = await httpGET(URL_PATHS.products, "?category_like=Fruits");
                showProducts(types);
            } else if (categ.getAttribute('id') === "type-beverages") {
                let types = await httpGET(URL_PATHS.products, "?category_like=Beverages");
                showProducts(types);
            } else if (categ.getAttribute('id') === "type-meats") {
                let types = await httpGET(URL_PATHS.products, "?category_like=meats");
                showProducts(types);
            } else if (categ.getAttribute('id') === "type-breaky") {
                let types = await httpGET(URL_PATHS.products, "?category_like=break");
                showProducts(types);
            } else if (categ.getAttribute('id') === "type-frozen") {
                let types = await httpGET(URL_PATHS.products, "?category_like=frozen");
                showProducts(types);
            } else if (categ.getAttribute('id') === "type-snacks") {
                let types = await httpGET(URL_PATHS.products, "?category_like=snacks");
                showProducts(types);
            } else if (categ.getAttribute('id') === "type-grocery") {
                let types = await httpGET(URL_PATHS.products, "?category_like=grocery");
                showProducts(types);
            } else if (categ.getAttribute('id') === "type-alcohol") {
                let types = await httpGET(URL_PATHS.products, "?category_like=alcohol");
                showProducts(types);
            } else if (categ.getAttribute('id') === "type-all") {
                let types = await httpGET(URL_PATHS.products, "?_sort=name");
                showProducts(types);
            }
        })
    });

    const input = document.querySelector('#input-search');
    input.addEventListener('keyup', async e => {
        let valueSearched = await getStockProduct(`?q=${e.target.value}`);
        showProducts(valueSearched);
    });
    const formSearch = document.querySelector('#form-search');
    formSearch.addEventListener('submit', async e => {
        e.preventDefault();
        let valueSearched = await getStockProduct(`?q=${input.value}`);
        showProducts(valueSearched);
        formSearch.reset();
    });
}

export const captureData = () => {
    const id = document.querySelector('#product-id').value;
    let category = document.querySelector('#product-category');
    const name = document.querySelector('#product-name').value;
    const quantity = document.querySelector('#product-quantity').value;
    const price = document.querySelector('#product-price').value;
    const image = document.querySelector('#product-image').value;
    const stock = document.querySelector('#product-stock').value;
    category = category.options[category.selectedIndex].text;

    const product = {
        id,
        category,
        name,
        quantity,
        price,
        image,
        stock
    }
    return product;
}

export const addProduct = () => {
    const btnAdd = document.querySelector('.btn-add');

    btnAdd.addEventListener('click', async () => {
        const newProduct = captureData();
        if (newProduct.id !== '' && newProduct.category !== '--Selected--' && newProduct.name !== '' && newProduct.quantity !== '' && newProduct.price !== '' && newProduct.image !== '' && newProduct.stock !== '') {
            await httpPOST(URL_PATHS.products, newProduct);
        } else {
            alert('No se permiten campos vacios!');
        }
    })
}

export const editProduct = () => {
    const btnsEdit = document.querySelectorAll('.btn-edit');
    btnsEdit.forEach(btn => {
        btn.addEventListener('click', async () => {
            let product = await httpGET(URL_PATHS.products, `/${btn.getAttribute('id')}`);
            console.log(product);
            let id = document.querySelector('#product-id');
            let category = document.querySelector('#product-category');
            let name = document.querySelector('#product-name');
            let quantity = document.querySelector('#product-quantity');
            let price = document.querySelector('#product-price');
            let image = document.querySelector('#product-image');
            let stock = document.querySelector('#product-stock');

            id.value = product.id
            category.options[category.selectedIndex].text = product.category
            name.value = product.name
            quantity.value = product.quantity
            price.value = product.price
            image.value = product.image
            stock.value = parseInt(product.stock)
        });
    });

    const btnEdit = document.querySelector('.btn-editProduct');
    btnEdit.addEventListener('click', async () => {
        const editProduct = captureData();
        await httpPATCH(URL_PATHS.products, editProduct, editProduct.id);
    })
}

export const deleteProduct = () => {
    const btnsDelete = document.querySelectorAll('.btn-delete');
    btnsDelete.forEach(btn => {
        btn.addEventListener('click', async () => {

            await httpDELETE(URL_PATHS.products, btn.getAttribute('id'))
        })
    });
}

export const logOut = () => {
    const btnLogOut = document.querySelector('.btn-log-out');
    btnLogOut.addEventListener('click', () => {
        window.location.pathname = '../index.html';
    })
}

export const control = () => {
    const btnClients = document.querySelector('.btn-control-clients');
    btnClients.addEventListener('click', async () => {
        document.querySelector('.main-container').classList.add('d-none');
        document.querySelector('.client-container').classList.remove('d-none');

        let clients = await httpGET(URL_PATHS.shopping);
        clients.forEach(client => {
            const { id, name, email, address, phone, products } = client

            document.querySelector('#clients-container').innerHTML += `
                <div class="card m-2" style="width: 18rem">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Id: ${id}</h6>
                        <h5 class="card-title">Name: ${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${email}</h6>
                        <p class="card-text">Address: ${address}.</p>
                        <p class="card-text">Phone Number: ${phone}.</p>
                        <hr/>
                        <p class="card-text text-green link-products" id="${id}">Products</p>
                        <ul class="list-group products-ul-${id} d-flex flex-wrap">
                            
                        </ul>                        
                    </div>
                </div>
            `
        });
        listProducts();
    })
    const btnProducts = document.querySelector('.btn-control-products');
    btnProducts.addEventListener('click', () => {
        document.querySelector('.client-container').classList.add('d-none');
        document.querySelector('.main-container').classList.remove('d-none');
    })
}

const listProducts = () => {
    const linkProducts = document.querySelectorAll('.link-products');
    linkProducts.forEach(e => {
        e.addEventListener('click', async () => {
            let clients = await httpGET(URL_PATHS.shopping, `/${e.getAttribute('id')}`);
            const { id, products } = clients;
            products.forEach(prod => {
                document.querySelector(`.products-ul-${id}`).innerHTML += `
                    <li class="list-group-item">Id: ${prod.id}</li>
                    <li class="list-group-item">Name Product: ${prod.name}</li>
                    <li class="list-group-item">Price: ${prod.price}</li>
                    <li class="list-group-item">Amount: ${prod.amount}</li>
                    <hr/>
                `
            });

        })
    });
}
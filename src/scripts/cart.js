import { getProducts } from "./products.js";
import { addFavorite } from "./favorites.js";

export const amountProducts = () => {
    const btnsPlus = document.querySelectorAll('.btn-plus');
    const btnsMinus = document.querySelectorAll('.btn-minus');
    const inputAmount = document.querySelectorAll('.input-amount');

    btnsPlus.forEach(btn => {
        btn.addEventListener('click', () => {
            inputAmount.forEach(inpt => inpt.getAttribute('id') === btn.getAttribute('id') ? inpt.value++ : false);
        })
    });

    btnsMinus.forEach(btn => {
        btn.addEventListener('click', () => {
            inputAmount.forEach(inpt => {
                if (inpt.getAttribute('id') === btn.getAttribute('id')) {
                    if (inpt.value > 0) {
                        inpt.value--
                    }
                }
            });
        })
    });
}

export const addToCart = () => {
    const btnAddCart = document.querySelectorAll('.btn-addToCart');
    const inputAmount = document.querySelectorAll('.input-amount');

    btnAddCart.forEach(btn => {
        btn.addEventListener('click', async () => {
            let amountProd = 0;
            inputAmount.forEach(inpt => {
                if (inpt.getAttribute('id') === btn.getAttribute('id')) {
                    amountProd = inpt.value;
                    inpt.value = 0;
                }
            });
            let product = await getProducts(`?q=${btn.getAttribute('id')}`);
            let newProduct = {
                id: product[0].id,
                category: product[0].category,
                name: product[0].name,
                quantity: product[0].quantity,
                price: product[0].price,
                image: product[0].image,
                amount: amountProd
            }
            let returnLS = localStorage.getItem('shoppingFastCart');
            let products;

            if (returnLS == undefined) {
                products = [];
            } else {
                products = JSON.parse(returnLS);
            }

            if (amountProd > 0) {
                products.push(newProduct);
            }

            let productsJSON = JSON.stringify(products);
            localStorage.setItem('shoppingFastCart', productsJSON);

            showCartModal();
            showCountCart();
            totalCartModal();
        });
    });
}

export const deleteToCart = () => {
    const btnDeleteCart = document.querySelectorAll('.btn-deleteCart');
    btnDeleteCart.forEach(btn => {
        btn.addEventListener('click', () => {
            let products = JSON.parse(localStorage.getItem('shoppingFastCart'));
            products.splice(products.findIndex(e => e.id == btn.getAttribute('id')), 1);
            localStorage.setItem('shoppingFastCart', JSON.stringify(products));
            if (window.location.pathname === '/index.html' || window.location.pathname === '/pages/favorites.html') {
                showCartModal();
                showCountCart();
                totalCartModal();
            } else if (window.location.pathname === '/pages/cart.html') {
                showCart();
                showCartTotal();
            }
        })
    });
}

export const showCartModal = () => {
    const container = document.querySelector('.cart-container');
    container.innerHTML = "";

    let products = JSON.parse(localStorage.getItem('shoppingFastCart'));
    if (products.length !== 0) {
        products.forEach(prod => {
            const { id, category, name, quantity, price, image, amount } = prod;
            container.innerHTML += `
            <div class="card mb-3" style="max-width: 540px">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img
                        src="${image}"
                        class="img-fluid rounded-start p-5"
                        alt="Product-${id}"
                    />
                    </div>
                    <div class="col-md-8 position-relative">
                        <div class="card-body">
                            <h5 class="card-title text-green">${name} ${quantity}</h5>
                            <p class="card-text">${category}</p>
                            <p class="card-text">${amount} x $${price}</p>
                        </div>
                        <button
                            id="${id}"
                            type="button"
                            class="btn-close position-absolute top-0 end-0 m-1 btn-deleteCart"
                            aria-label="Close"
                        ></button>
                    </div>
                </div>
            </div>
        `
        });
        deleteToCart();
    }
}

export const showCountCart = () => {
    const span = document.querySelector('.cart-count');
    let products = JSON.parse(localStorage.getItem('shoppingFastCart'));
    let count = products.length;
    span.innerText = count;
}

export const totalCartModal = () => {
    let products = JSON.parse(localStorage.getItem('shoppingFastCart'));
    let total = 0;
    products.forEach(prod => {
        total += prod.price * prod.amount
    })
    const totalCart = document.querySelector('.total-cart');
    totalCart.textContent = `$ ${total}`;
}

export const showCart = () => {
    const container = document.querySelector('.cart-produts-container');
    container.innerHTML = "";

    let products = JSON.parse(localStorage.getItem('shoppingFastCart'));
    products.forEach(product => {
        const { id, name, quantity, price, image, amount } = product;
        container.innerHTML += `
            <div
                class="container bg-light d-flex justify-content-around align-items-center my-4 p-2"
            >
                <img src="${image}" alt="Product-image=${id}" class="p-5" width="250" />
                <div class="container">
                    <h5>${name}</h5>
                    <p>Sold By: FastKart</p>
                    <p>Quantity: ${quantity}.</p>
                </div>
                <div class="container">
                    <p>Price</p>
                    <h5 class="text-green">$${price}</h5>
                </div>
                <div class="container">
                    <p>Qty</p>
                    <div class="input-group mb-3 mx-auto w-100">
                        <button id="${id}" type="button" class="input-group-text btn color-green btn-minus">
                            <i class="bx bx-minus"></i>
                        </button>
                        <input
                            id="${id}"
                            type="text"
                            class="form-control ps-5 input-amount"
                            aria-label="Amount"
                            value="${amount}"
                            disabled
                        />
                        <button id="${id}" type="button" class="input-group-text btn color-green btn-plus">
                            <i class="bx bx-plus"></i>
                        </button>
                    </div>
                </div>
                <div id="${id}" class="container w-75 total-container">
                    <p>Total</p>
                    <h5>$ ${price * amount}</h5>
                </div>
                <div class="container">
                    <p class="">Action</p>
                    <button
                        id="${id}"
                        type="button"
                        class="btn btn-outline-danger my-1 btn-favorite"
                    >
                        <i class="bx bx-heart fs-5"></i>Favorites
                    </button>
                    <button
                        id="${id}"
                        type="button"
                        class="btn btn-light my-1 btn-deleteCart"
                    >
                        <i class="bx bx-x fs-5"></i>Remove
                    </button>
                </div>
            </div>
        `
    });
    addFavorite();
    deleteToCart();

}

export const countProduct = () => {
    const totalContainer = document.querySelectorAll('.total-container');
    const inputAmount = document.querySelectorAll('.input-amount');
    let products = JSON.parse(localStorage.getItem('shoppingFastCart'));

    const btnMinus = document.querySelectorAll('.btn-minus');
    const btnPlus = document.querySelectorAll('.btn-plus');

    btnPlus.forEach(btn => {
        btn.addEventListener('click', () => {
            inputAmount.forEach(inp => {
                if (inp.getAttribute('id') == btn.getAttribute('id')) {
                    products.forEach(prod => {
                        if (prod.id == inp.getAttribute('id')) {
                            prod.amount = parseInt(inp.value);
                            totalContainer.forEach(e => {
                                if (e.getAttribute('id') == inp.getAttribute('id')) {
                                    e.innerHTML = `
                                        <p>Total</p>
                                        <h5>$ ${prod.price * prod.amount}</h5>
                                    `
                                }
                            })
                        }
                    });
                    localStorage.setItem('shoppingFastCart', JSON.stringify(products));
                    showCartTotal()
                }
            })
        })
    });

    btnMinus.forEach(btn => {
        btn.addEventListener('click', () => {
            inputAmount.forEach(inp => {
                if (inp.getAttribute('id') == btn.getAttribute('id')) {
                    products.forEach(prod => {
                        if (prod.id == inp.getAttribute('id')) {
                            prod.amount = parseInt(inp.value);
                            totalContainer.forEach(e => {
                                if (e.getAttribute('id') == inp.getAttribute('id')) {
                                    e.innerHTML = `
                                        <p>Total</p>
                                        <h5>$ ${prod.price * prod.amount}</h5>
                                    `
                                }
                            })
                        }

                    });
                    localStorage.setItem('shoppingFastCart', JSON.stringify(products));
                    showCartTotal()
                }
            })
        })
    });
}

export const discountCart = () => {
    const btnCoupon = document.querySelector('#btn-coupon');
    const notValid = document.querySelector('#not-valid');
    let discount = 0;
    btnCoupon.addEventListener('click', () => {
        let inputCouponValue = document.querySelector('#input-coupon').value;
        if (inputCouponValue === 'BLACKFRIDAY') {
            discount = 10
            inputCouponValue = ""
            notValid.classList.add('d-none');
            showCartTotal(discount);
        } else {
            notValid.classList.remove('d-none');
            inputCouponValue = ""
        }
    })
}

export const showCartTotal = (_coupon = 0) => {
    let products = JSON.parse(localStorage.getItem('shoppingFastCart'));
    let subTotal = 0;
    let shipping = 20;
    let discount = _coupon;
    products.forEach(prod => {
        subTotal += prod.price * prod.amount
    })
    const subTotalContainer = document.querySelector('.subtotal-cart');
    subTotalContainer.innerHTML = `
        <h5>Subtotal:</h5>
        <h5>$ ${subTotal}</h5>
    `
    const couponContainer = document.querySelector('.coupon-cart');
    couponContainer.innerHTML = `
        <h5>Coupon Discount:</h5>
        <h5>- $ ${discount}</h5>
    `
    const shippingContainer = document.querySelector('.shipping-cart');
    shippingContainer.innerHTML = `
        <h5>Shipping:</h5>
        <h5>$ ${shipping}</h5>
    `
    const totalContainer = document.querySelector('.total-cart');
    totalContainer.innerHTML = `
        <h5>Total (USD):</h5>
        <h5>$ ${(subTotal + shipping - discount)}</h5>
    `
    return { subTotal: subTotal, shipping: shipping, discount: discount, total: (subTotal + shipping - discount) };
}
import { getProducts, printAllProducts, stockProducts } from "./products.js";
import { searchCategories, searchInput } from "./search.js";
import { getFavorites, printFavorites, deleteFavorites } from "./favorites.js";
import { amountProducts, showCountCart, showCartModal, totalCartModal, showCart, countProduct, showCartTotal, discountCart } from "./cart.js";
import { checkOut } from "./checkout.js";
import { validationUser, showProducts, addProduct, getStockProduct, searchProd, logOut, control } from "./user.js";

if (window.location.pathname === '/proyect-sprint04/index.html') {
    /* IMPRIMIR PRODUCTOS */
    let dataProducts = await getProducts("?_sort=name");
    printAllProducts(dataProducts);
    /* MOSTRAR STOCK X CATEGORIAS */
    await stockProducts();
    /* BUSCAR */
    searchCategories();
    searchInput();
    /* CARRITO */
    showCartModal();
    showCountCart();
    totalCartModal();
    /* ADMIN VALIDATION */
    validationUser();
} else if (window.location.pathname === '/proyect-sprint04/pages/favorites.html') {
    /* IMPRIMIR FAVORITOS */
    let dataFavorites = await getFavorites();
    printFavorites(dataFavorites);
    deleteFavorites();
    /* CARRITO */
    amountProducts();
    showCartModal();
    showCountCart();
    totalCartModal();
    /* ADMIN VALIDATION */
    validationUser();
} else if (window.location.pathname === '/proyect-sprint04/pages/cart.html') {
    /* CARRITO */
    showCart();
    amountProducts();
    countProduct();
    showCartTotal();
    discountCart();
    /* CHECKOUT */
    checkOut();
} else if (window.location.pathname === '/proyect-sprint04/pages/admin.html') {
    /* ADMIN CONTROL */
    addProduct();
    /* PRODUCTS */
    let products = await getStockProduct();
    showProducts(products);
    searchProd();
    /* LOG OUT */
    logOut();
    /* CONTROL */
    control()
}

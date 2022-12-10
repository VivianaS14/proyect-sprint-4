import { getProducts, printAllProducts, stockProducts } from "./scripts/products";
import { searchCategories, searchInput } from "./scripts/search";
import { getFavorites, printFavorites, deleteFavorites } from "./scripts/favorites";
import { amountProducts, showCountCart, showCartModal, totalCartModal, showCart, countProduct, showCartTotal, discountCart } from "./scripts/cart";
import { checkOut } from "./scripts/checkout";
import { validationUser, showProducts, addProduct, getStockProduct, searchProd, logOut, control } from "./scripts/user";

if (window.location.pathname === '/index.html') {
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
} else if (window.location.pathname === '/pages/favorites.html') {
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
} else if (window.location.pathname === '/pages/cart.html') {
    /* CARRITO */
    showCart();
    amountProducts();
    countProduct();
    showCartTotal();
    discountCart();
    /* CHECKOUT */
    checkOut();
} else if (window.location.pathname === '/pages/admin.html') {
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

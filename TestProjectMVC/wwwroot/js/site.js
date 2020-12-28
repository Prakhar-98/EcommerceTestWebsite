// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
function increaseQuantity(cart, stock, price) {
    var n = parseInt(document.getElementById('q ' + cart).innerHTML);
    if (n < stock) {
        document.getElementById('q ' + cart).innerHTML = n + 1;
        document.getElementById('t ' + cart).innerHTML = (n + 1) * price;
        document.getElementById('z' + cart + '__Quantity').value = n + 1;
    }
}
function decreaseQuantity(cart, price) {
    var n = parseInt(document.getElementById('q ' + cart).innerHTML);
    if (n > 1) {
        document.getElementById('q ' + cart).innerHTML = n - 1;
        document.getElementById('t ' + cart).innerHTML = (n - 1) * price;
        document.getElementById('z' + cart + '__Quantity').value = n - 1;
    }
}
// Write your JavaScript code.

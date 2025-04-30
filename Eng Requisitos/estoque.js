const form = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

let products = JSON.parse(localStorage.getItem('products')) || [];

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function renderProducts(filter = '') {
    productList.innerHTML = '';

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        productList.innerHTML = `
            <tr>
                <td colspan="4">Nenhum produto encontrado.</td>
            </tr>
        `;
        return;
    }

    filteredProducts.forEach((product, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>R$ ${parseFloat(product.price).toFixed(2)}</td>
            <td class="actions">
                <button class="edit" onclick="editProduct(${index})">Editar</button>
                <button class="delete" onclick="deleteProduct(${index})">Excluir</button>
            </td>
        `;

        productList.appendChild(tr);
    });
}

function addProduct(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceInput.value);

    if (name && quantity >= 0 && price >= 0) {
        products.push({ name, quantity, price });
        saveProducts();
        renderProducts(); // <-- Atualiza toda a lista, sem filtro
        form.reset();
    }
}

// Agora: botão "Buscar" funcionando corretamente
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    renderProducts(searchTerm);
});

function deleteProduct(index) {
    if (confirm('Deseja excluir este produto?')) {
        products.splice(index, 1);
        saveProducts();
        renderProducts();
    }
}

function editProduct(index) {
    const product = products[index];

    const newName = prompt('Editar nome:', product.name);
    const newQuantity = prompt('Editar quantidade:', product.quantity);
    const newPrice = prompt('Editar preço:', product.price);

    if (newName !== null && newQuantity !== null && newPrice !== null) {
        products[index] = {
            name: newName.trim(),
            quantity: parseInt(newQuantity),
            price: parseFloat(newPrice)
        };
        saveProducts();
        renderProducts();
    }
}

// Inicializar a página
renderProducts();
form.addEventListener('submit', addProduct);

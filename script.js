const listaCompras = document.getElementById('listaCompras');
const formulario = document.getElementById('formulario');
const nomeItem = document.getElementById('nomeItem');
const precoItem = document.getElementById('precoItem');
const valorTotal = document.getElementById('valorTotal');

let itens = JSON.parse(localStorage.getItem('lista')) || [];

function salvarLocalStorage() {
    localStorage.setItem('lista', JSON.stringify(itens));
}

function calcularTotal() {
    const total = itens.reduce((acc, item) => {
        if (!item.comprado) {
            return acc + item.preco;
        } else {
            return acc;
        }
    }, 0);
    valorTotal.innerText = total.toFixed(2);
}

function renderizarLista() {
    listaCompras.innerHTML = '';

    itens.forEach((item, index) => {
        const li = document.createElement('li');
        if (item.comprado) {
            li.classList.add('comprado');
        }

        li.innerHTML = 
        `${item.nome} - R$ ${item.preco.toFixed(2)}
        <div class="botoes">
        <button onclick="toggleComprado(${index})">✔️</button>
        <button onclick="removerItem(${index})">🗑️</button>
        </div>`;

        listaCompras.appendChild(li);
    });

    calcularTotal();
}

function adicionarItem(event) {
    event.preventDefault();

    const nome = nomeItem.value.trim();
    const preco = parseFloat(precoItem.value);

    if (nome === '' || isNaN(preco) || preco <= 0) {
        alert('Preencha corretamente o nome e o preço!');
        return;
    }

    const novoItem = {
        nome,
        preco,
        comprado: false
    };

    itens.push(novoItem);
    salvarLocalStorage();
    renderizarLista();

    formulario.reset();
}

function removerItem(index) {
    itens.splice(index, 1);
    salvarLocalStorage();
    renderizarLista();
}

function toggleComprado(index) {
    itens[index].comprado = !itens[index].comprado;
    salvarLocalStorage();
    renderizarLista();
}

formulario.addEventListener('submit', adicionarItem);

renderizarLista();

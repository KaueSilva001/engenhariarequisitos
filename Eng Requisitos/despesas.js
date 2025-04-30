const despesas = [];
const listaDespesas = document.getElementById('lista-despesas');
const ctx = document.getElementById('graficoDespesas').getContext('2d');

let grafico;

// Função para atualizar o gráfico
function atualizarGrafico() {
    const descricoes = despesas.map(d => d.descricao);
    const valores = despesas.map(d => d.valor);

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: descricoes,
            datasets: [{
                label: 'Despesas',
                data: valores,
                backgroundColor: [
                    '#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1'
                ],
                borderColor: '#fff',
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

// Função para adicionar despesa
function adicionarDespesa() {
    const descricaoInput = document.getElementById('descricao');
    const valorInput = document.getElementById('valor');

    const descricao = descricaoInput.value.trim();
    const valor = parseFloat(valorInput.value);

    if (descricao === '' || isNaN(valor) || valor <= 0) {
        alert('Por favor, insira uma descrição e um valor válido.');
        return;
    }

    despesas.push({ descricao, valor });

    descricaoInput.value = '';
    valorInput.value = '';

    renderizarDespesas();
    atualizarGrafico();
}

// Função para listar despesas
function renderizarDespesas() {
    listaDespesas.innerHTML = '';

    despesas.forEach((despesa, index) => {
        const div = document.createElement('div');
        div.className = 'despesa-item';
        div.innerHTML = `
            <span>${despesa.descricao} - R$ ${despesa.valor.toFixed(2)}</span>
            <button onclick="removerDespesa(${index})">Remover</button>
        `;
        listaDespesas.appendChild(div);
    });
}

// Função para remover despesa
function removerDespesa(index) {
    despesas.splice(index, 1);
    renderizarDespesas();
    atualizarGrafico();
}

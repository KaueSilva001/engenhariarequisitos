// ========== Adicionar o CSS via JavaScript ==========
const style = document.createElement('style');
style.innerHTML = `

`;
document.head.appendChild(style);

// ========== Controle do Modal ==========
const Modal = {
  open() {
    document.querySelector('.modal-overlay').style.display = 'flex';
  },
  close() {
    document.querySelector('.modal-overlay').style.display = 'none';
  }
};

// ========== Controle das Transações ==========
const Transaction = {
  all: [],

  add(transaction) {
    this.all.push(transaction);
    App.reload();
  },

  remove(index) {
    this.all.splice(index, 1);
    App.reload();
  },

  incomes() {
    return this.all
      .filter(trans => trans.amount > 0)
      .reduce((acc, trans) => acc + trans.amount, 0);
  },

  expenses() {
    return this.all
      .filter(trans => trans.amount < 0)
      .reduce((acc, trans) => acc + trans.amount, 0);
  },

  total() {
    return this.incomes() + this.expenses();
  }
};

// ========== Atualizar o HTML ==========
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
  
    addTransaction(transaction, index) {
      const tr = document.createElement('tr');
      tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
      tr.dataset.index = index;
      DOM.transactionsContainer.appendChild(tr);
    },
  
    innerHTMLTransaction(transaction, index) {
      const CSSclass = transaction.amount > 0 ? "income" : "expense";
      const amount = Utils.formatCurrency(transaction.amount);
  
      const html = `
        <td>${transaction.item}</td>
        <td>${transaction.quantity}</td>
        <td class="${CSSclass}">${amount}</td>
        <td>${transaction.date}</td>
        <td>
          <button onclick="Transaction.remove(${index})" style="border:none; background:none; color:red; font-weight:bold;">X</button>
        </td>
      `;
      return html;
    },
  
    updateBalance() {
      document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
      document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());
      document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
    },
  
    clearTransactions() {
      DOM.transactionsContainer.innerHTML = "";
    }
  };
  

// ========== Utilidades ==========
const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");
    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    return signal + value;
  },

  formatAmount(value) {
    value = Number(value) * 100;
    return Math.round(value);
  },

  formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }
};

// ========== Formulário ==========
const Form = {
    item: document.querySelector('input#item'),
    quantity: document.querySelector('input#quantity'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),
  
    getValues() {
      return {
        item: Form.item.value,
        quantity: Form.quantity.value,
        amount: Form.amount.value,
        date: Form.date.value
      };
    },
  
    validateFields() {
      const { item, quantity, amount, date } = Form.getValues();
      if (item.trim() === "" || quantity.trim() === "" || amount.trim() === "" || date.trim() === "") {
        throw new Error("Por favor, preencha todos os campos");
      }
    },
  
    formatValues() {
      let { item, quantity, amount, date } = Form.getValues();
      amount = Utils.formatAmount(amount);
      quantity = parseInt(quantity);
      date = Utils.formatDate(date);
  
      return { item, quantity, amount, date };
    },
  
    clearFields() {
      Form.item.value = "";
      Form.quantity.value = "";
      Form.amount.value = "";
      Form.date.value = "";
    },
  
    submit(event) {
      event.preventDefault();
  
      try {
        Form.validateFields();
        const transaction = Form.formatValues();
        Transaction.add(transaction);
        Form.clearFields();
        Modal.close();
      } catch (error) {
        alert(error.message);
      }
    }
  };
  

// ========== Inicializar e Recarregar ==========
const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction);
    DOM.updateBalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  }
};

// ========== Inicializa o app ==========
App.init();

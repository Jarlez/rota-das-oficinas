const products = [];
const customers = [];

let isProductFormOpen = false;
let isCustomerFormOpen = false;

function createFormElement(elementType, labelText) {
  const label = document.createElement("label");
  label.textContent = labelText;

  const input = document.createElement("input");
  input.type = elementType;

  const container = document.createElement("div");
  container.appendChild(label);
  container.appendChild(input);

  return { container, input };
}

function addProduct() {
  if (isProductFormOpen) {
    return;
  }

  isProductFormOpen = true;

  const form = document.createElement("form");
  form.className = "productForm";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Fechar formulário";
  closeButton.className = "closeButtonProduct";

  closeButton.addEventListener("click", function () {
    form.reset();
    form.style.display = "none";
    isProductFormOpen = false;
    document.getElementById("addProductButton").style.display = "block";
  });



  const nameInput = createFormElement("text","Digite o nome do produto:");
  const valueInput = createFormElement("number","Digite o valor do produto:");

  const submitButton = document.createElement("button");
  submitButton.textContent = "Adicionar produto";
  submitButton.className = "addButtonProduct";


  const buttonContainer = document.createElement("div");
  buttonContainer.className = "buttonContainer";
  buttonContainer.appendChild(submitButton);
  buttonContainer.appendChild(closeButton);


  form.appendChild(nameInput.container);
  form.appendChild(valueInput.container);
  form.appendChild(buttonContainer);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.input.value;
    const value = parseFloat(valueInput.input.value);

    if (!isNaN(value)) {
      products.push({ name, value });

      const productList = document.getElementById("productList");
      const newItem = document.createElement("li");
      newItem.textContent = `${name}: R$${value.toFixed(2)}`;
      productList.appendChild(newItem);

      form.reset();
    }
  });

  submitButton.addEventListener("click", function () {
    form.dispatchEvent(new Event("submit"));
  });

  form.addEventListener("reset", function () {
    form.style.display = "none";
    isProductFormOpen = false;
    document.getElementById("addProductButton").style.display = "block";
  });

  document.body.appendChild(form);
}

function addCustomer() {
  if (isCustomerFormOpen) {
    return;
  }

  if (products.length === 0) {
    alert("Não foi cadastrado nenhum produto. Por favor, adicione um ou mais produtos antes de registrar clientes.");
    return;
  }

  isCustomerFormOpen = true;

  const form = document.createElement("form");
  form.className = "customerForm";

  const nameInput = createFormElement("text", "Digite o nome de um cliente:");

  const submitButton = document.createElement("button");
  submitButton.textContent = "Adicionar cliente";
  submitButton.className = "addButtonCustomer";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Fechar";
  closeButton.className = "closeButton";

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "buttonContainer";
  buttonContainer.appendChild(submitButton);
  buttonContainer.appendChild(closeButton);

  form.appendChild(nameInput.container);
  form.appendChild(buttonContainer);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.input.value;
    const consumedProducts = [];

    for (const product of products) {
      const add = confirm(`O cliente consumiu o produto '${product.name}'?`);

      if (add) {
        consumedProducts.push(product);
      }
    }

    const payFee = confirm("O cliente irá pagar os 10% de taxa?");

    customers.push({ name, products: consumedProducts, payFee });

    const customerList = document.getElementById("customerList");
    const newItem = document.createElement("li");
    const consumedProductsStr = consumedProducts.map(product => product.name).join(", ");
    const customerInfo = `${name}: ${consumedProductsStr}${payFee ? " (pagará os 10%)" : " (não pagará os 10%)"}`;
    newItem.textContent = customerInfo;
    customerList.appendChild(newItem);

    form.reset();
    isCustomerFormOpen = false;
  });

  submitButton.addEventListener("click", function () {
    form.style.display = "none";
    document.getElementById("addCustomerButton").style.display = "block";
  });

  closeButton.addEventListener("click", function (event) {
    event.preventDefault();
    form.style.display = "none";
    isCustomerFormOpen = false;
    document.getElementById("addCustomerButton").style.display = "block";
  });

  document.body.appendChild(form);
}

function calculateAccount() {
  if (products.length === 0 || customers.length === 0) {
    alert("Não é possível calcular a conta. É necessário ter pelo menos um cliente consumindo um produto.");
    return;
  }

  for (const product of products) {
    let productConsumed = false;
    let numberOfConsumers = 0;

    for (const customer of customers) {
      if (customer.products.includes(product)) {
        productConsumed = true;
        numberOfConsumers++;
      }
    }

    if (!productConsumed) {
      alert(`O produto '${product.name}' não foi consumido por nenhum cliente. Atribua o produto a pelo menos um cliente.`);
      return;
    }


    if (numberOfConsumers > 0) {
      product.value /= numberOfConsumers;
    }
  }

  for (const customer of customers) {
    let consumedValue = 0;

    for (const consumedProduct of customer.products) {
      consumedValue += consumedProduct.value;
    }

    const serviceCharge = customer.payFee ? consumedValue * 0.1 : 0;
    customer.totalValue = consumedValue + serviceCharge;
  }

  let calcResultHTML = "";
  for (const customer of customers) {
    calcResultHTML += `${customer.name}: R$${customer.totalValue.toFixed(2)}<br>`;
  }

  document.getElementById("calcResult").innerHTML = calcResultHTML;
}

function clearProducts() {
  products.length = 0;
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
}

function clearCustomers() {
  customers.length = 0;
  const customerList = document.getElementById("customerList");
  customerList.innerHTML = "";
}

function resetCalculator() {
  clearProducts();
  clearCustomers();
  document.getElementById("calcResult").innerHTML = "";
}

const addProductButton = document.createElement("button");
addProductButton.textContent = "Adicionar produto";
addProductButton.id = "addProductButton";
addProductButton.addEventListener("click", function () {
  addProduct();
  addProductButton.style.display = "none";
});

const addCustomerButton = document.createElement("button");
addCustomerButton.textContent = "Adicionar cliente";
addCustomerButton.id = "addCustomerButton";
addCustomerButton.addEventListener("click", function () {
  addCustomer();
  addCustomerButton.style.display = "none";
});

const calculateButton = document.createElement("button");
calculateButton.textContent = "Calcular conta";
calculateButton.addEventListener("click", function () {
  calculateAccount();
});

const clearProductsButton = document.createElement("button");
clearProductsButton.textContent = "Limpar produtos";
clearProductsButton.addEventListener("click", function () {
  clearProducts();
});

const clearCustomersButton = document.createElement("button");
clearCustomersButton.textContent = "Limpar clientes";
clearCustomersButton.addEventListener("click", function () {
  clearCustomers();
});

const resetButton = document.createElement("button");
resetButton.textContent = "Resetar calculadora";
resetButton.addEventListener("click", function () {
  resetCalculator();
});

const productList = document.createElement("ul");
productList.id = "productList";

const customerList = document.createElement("ul");
customerList.id = "customerList";

const calcResult = document.createElement("div");
calcResult.id = "calcResult";



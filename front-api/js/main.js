const productsList = document.querySelector('#products-list')
const form = document.querySelector('#form')
const edit = document.querySelector('#edit')
const formEdit = document.querySelector('#formEdit')

const API_URL = `http://localhost:8080/api/products`

//adicionando evento de click no btn excluir
function addEventBtnExcluir() {
  const botoesExcluir = document.querySelectorAll('.botao-excluir')
  botoesExcluir.forEach(botao => {
    botao.onclick = function(e) {
      e.preventDefault()

      const id = this.dataset.id

      fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          if(data.message === 'success') {
            obtainList()
            alert('Produto excluido com sucesso!')
          } else {
            alert('Ops, ocorreu um erro! tente novamente.')
          }
        })
    }
  })
}

//adicionando evento de click no btn editar
function addEventBtnEditar() {
  const botoesEditar = document.querySelectorAll('.botao-editar')
  botoesEditar.forEach(botao => {
    botao.onclick = function(e) {
      e.preventDefault()

      edit.classList.remove('hidden')

      const id = this.dataset.id
      const name = this.dataset.name
      const brand = this.dataset.brand
      const price = this.dataset.price

      document.forms['formEdit'].name.value = id
      document.forms['formEdit'].name.value = name
      document.forms['formEdit'].brand.value = brand
      document.forms['formEdit'].price.value = price
    }
  })
}


function obtainList() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const productsHTML = data.map(product => `
        <li>
          ${product.name} - ${product.brand} - ${product.price} - 
          <a href="#" class="botao-editar" data-id="${product._id}" data-name="${product.name}" data-brand="${product.brand}" data-price="${product.price}">[editar]</a>
          <a href="#" class="botao-excluir" data-id="${product._id}">[excluir]</a>
        </li>
      `).join('')

      productsList.innerHTML = productsHTML

      addEventBtnExcluir()
      addEventBtnEditar()
      
    })
}
//chamar function para obter lista
obtainList()

//ao cadastrar um item
form.onsubmit = function(e) {
  e.preventDefault()

  const name = document.forms['form'].name.value
  const brand = document.forms['form'].brand.value
  const price = document.forms['form'].price.value


  if(name !== '' || brand !== '' || price !== '') {
    //requisição POST
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json' // definindo o tipo de conteudo que será montado na tela (headers - postman)
      }, 
      body: JSON.stringify({
        name,
        brand,
        price,
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.message === 'success') {
        form.reset()
        obtainList()
        alert('Item cadastrado com sucesso!')
      } else {
        alert('Ops! ocorreu um erro, tente novamente.')
      }
    })
  } else {
    alert('Preencha todos os campos corretamente!')
  }
}

//ao editar um produto
formEdit.onsubmit = function(e) {
  e.preventDefault()

  const id = document.forms['formEdit'].id.value
  const name = document.forms['formEdit'].name.value
  const brand = document.forms['formEdit'].brand.value
  const price = document.forms['formEdit'].price.value

  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json', 
    },
    body: JSON.stringify({
      name,
      brand,
      price,
    })
  })
    .then(res => res.json())
    .then(data => {
      if(data.message === 'success') {
        formEdit.reset()
        edit.classList.add('hidden')
        obtainList()
        alert('Produto alterado com sucesso!')
      } else {
        alert('Ops, ocorreu um erro! tente novamente.')
      }
    })
}



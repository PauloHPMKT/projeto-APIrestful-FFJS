//const productsList = document.querySelector('#products-list')
const form = document.querySelector('#form')

const API_URL = `http://localhost:8080/api/products`


function obtainList() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const productsHTML = data.map(product => `
        <li>
          ${product.name} - ${product.brand} - ${product.price} - 
          <a href="#" class="botao-excluir" data-id="${product._id}">[excluir]</a>
        </li>
      `).join('')

      productsList.innerHTML = productsHTML

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
    })
}
//chamar function para obter lista
obtainList()

form.onsubmit = function(e) {
  e.preventDefault()

  const name = document.forms['form'].name.value
  const brand = document.forms['form'].brand.value
  const price = document.forms['form'].price.value

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
}
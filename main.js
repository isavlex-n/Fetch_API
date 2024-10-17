import './style.css'

let loading = false

function getHtmlForUser(user) {
  return `
    <div class='user'>
      <img src='${user.picture.large}' />
      <div>
        <p>Name: ${user.name.title} ${user.name.first} ${user.name.last}</p>
        <p>E-mail: ${user.email}</p>
      </div>
    </div>
  `
}

function addUsers(users) {
  const app = document.querySelector('#app')
  let html = ''
  if (typeof users !== 'string') {
    html = loading
      ? 'Загрузка'
      : `
    <ul>
      ${
        users &&
        users.map((user) => `<li>${getHtmlForUser(user)}</li>`).join('')
      }
    </ul>
  `
  } else {
    html = `<p>${users}</p>`
  }
  app.innerHTML = html
}

function fetchRandomUsers() {
  loading = true
  addUsers([])
  fetch('https://randomuser.me/api/?results=10')
    .then((res) => res.json())
    .then((users) => {
      loading = false
      addUsers(users.results)
    })
    .catch(() => addUsers('Не удалось загрузить пользователей!'))
}

fetchRandomUsers()

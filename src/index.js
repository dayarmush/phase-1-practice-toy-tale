let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(data => data.forEach(renderToys))

// renders the toys to the page
function renderToys(toy) {
  const cardDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const btn = document.createElement('button');
    
    cardDiv.setAttribute('class', 'card')
    
    h2.innerText = toy.name
    cardDiv.appendChild(h2)

    img.src = toy.image
    img.alt = toy.name
    img.setAttribute('class', 'toy-avatar')
    cardDiv.appendChild(img)

    p.textContent = `${toy.likes} likes`
    cardDiv.appendChild(p)

    btn.setAttribute('class', 'like-btn')
    btn.textContent = 'Like ❤️'
    cardDiv.appendChild(btn)

    document.querySelector('#toy-collection').appendChild(cardDiv)
//toy obj to pass to patch
    const toyObj = {
      'id': toy.id,
      'name': toy.name,
      'image': toy.image,
      'likes': `${toy.likes}`
    }
//event listener to update likes and persist
    btn.addEventListener('click', e => {
      const likeNumber = p.textContent = `${++toy.likes} likes`
      console.log(toyObj)
      fetch(`http://localhost:3000/toys/${toyObj.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'likes': Number.parseInt(likeNumber)
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
    })
}

//grabs toy data from form and add it to dom
function addNewToy() {
  const form = document.querySelector('form')

  form.addEventListener('submit', e => {
    e.preventDefault()
    const newToy = {
      'name': e.target.name.value,
      'image': e.target.image.value,
      'likes': 0,
    };
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
    .then(resp => resp.json())
    .then(renderToys(newToy))
    form.reset()
  })
}
//call the function
addNewToy()
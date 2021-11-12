function createSection(j) {
  var dogURL = 'https://dog.ceo/api/breeds/image/random'
  var catURL = 'https://api.thecatapi.com/v1/images/search'
  var dogCounter = 0
  var catCounter = 0

  var container = document.getElementById('container')

  for (var i = 0; i < j; i++) {
    var mySection = document.createElement('section')
    mySection.classList.add('row')

    var div1 = document.createElement('div')
    var div2 = document.createElement('div')

    div1.id = 'dog' + i
    div2.id = 'cat' + i

    container.appendChild(mySection)
    mySection.appendChild(div1)
    mySection.appendChild(div2)

    //Dog API
    fetch(dogURL)
      .then(function (result) {
        return result.json()
      })
      .then(function (data) {
        var myDogImage = data.message
        console.log(`dog${dogCounter}`)
        document.getElementById(
          `dog${dogCounter}`
        ).style.backgroundImage = `url('${myDogImage}')`
        dogCounter++
      })

    //Cat API
    fetch(catURL)
      .then(function (result) {
        return result.json()
      })
      .then(function (data) {
        var myCatImage = data[0].url
        console.log(`cat${catCounter}`)
        document.getElementById(
          `cat${catCounter}`
        ).style.backgroundImage = `url('${myCatImage}')`
        catCounter++
      })
  }
}

window.onload = function () {
  var validate = false

  while (!validate) {
    var num = parseInt(prompt('Digite um número de 1 a 10.'))

    if (num > 0 && num <= 10) {
      validate = true
    }
  }

  createSection(num)
}

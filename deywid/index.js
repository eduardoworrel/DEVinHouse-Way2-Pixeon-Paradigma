do {
  var valor = window.prompt("Informe um número de 1 a 10");
} while (valor < 1 || valor > 10);

for (var i = 0; i < valor; i++) {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(function (data) {
      return data.json();
    }).then(function (json) {
      document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", `<section class="dog" style="background-image: url('${json.message}')"></section>`)
    })
  fetch('https://api.thecatapi.com/v1/images/search')
    .then(function (data) {
      return data.json();
    }).then(function (json) {
      document.getElementsByTagName('body')[0].insertAdjacentHTML("afterbegin", `<section class="cat" style="background-image: url('${json[0].url}')"></section>`)
    })
}
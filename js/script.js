const tarjetas = document.querySelectorAll(".tarjeta");

let tarjetaVolteada = false;
let bloquearTablero = false;
let primeraTarjeta, segundaTarjeta;

function voltear() {
  if (bloquearTablero) return;
  if (this === primeraTarjeta) return;

  this.classList.add("volteada");

  if (tarjetaVolteada === false) {
    tarjetaVolteada = true;
    primeraTarjeta = this;

    return;
  }

  segundaTarjeta = this;
  verificarCoincidencia();
}

function verificarCoincidencia() {
  if (primeraTarjeta.dataset.framework === segundaTarjeta.dataset.framework) {
    coinciden();
  } else {
    noCoinciden();
  }
}

function coinciden() {
  primeraTarjeta.removeEventListener("click", voltear);
  segundaTarjeta.removeEventListener("click", voltear);

  resetearTablero();
}

function noCoinciden() {
  bloquearTablero = true;
  setTimeout(() => {
    primeraTarjeta.classList.remove("volteada");
    segundaTarjeta.classList.remove("volteada");

    resetearTablero();
  }, 1000);
}

function resetearTablero() {
  [tarjetaVolteada, bloquearTablero] = [false, false];
  [primeraTarjeta, segundaTarjeta] = [null, null];
}

(function revolver() {
  tarjetas.forEach((tarjeta) => {
    let random = Math.floor(Math.random() * 12);
    tarjeta.style.order = random;
  });
})();

tarjetas.forEach((tarjeta) => tarjeta.addEventListener("click", voltear));

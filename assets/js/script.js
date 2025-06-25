// seleccionar elementos
const botones = document.querySelectorAll(".color-btn");
//variable para almacenar los botones
let primerBoton = null;
let segundoBoton = null;

// colocar colores a los botones
function getRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

// crear pares
function crearColores() {
  const colores = [];

  for (let i = 0; i < 4; i++) {
    const color = getRandomColor();
    colores.push(color, color);
  }
  colores.push(getRandomColor());
  // mezclar los colores
  return colores.sort(() => Math.random() - 0.5);
}
// asignar colores a los botones
function asignarColores() {
  const colores = crearColores();
  botones.forEach((boton, index) => {
    boton.dataset.color = colores[index]; // almacenar el color en un atributo data
  });
}
// manejar el clic en los botones
function manejarClick(evento) {
  const botonClickeado = evento.target;
  if (botonClickeado.innerHTML === "") return;

  botonClickeado.innerHTML = "";
  botonClickeado.style.backgroundColor = botonClickeado.dataset.color; // mostrar el color del botón

  //botones seleccionados
  if (!primerBoton) {
    primerBoton = botonClickeado;
    return;
  }
  segundoBoton = botonClickeado;

  //comparar los colores
  if (primerBoton.dataset.color === segundoBoton.dataset.color) {
    //si son iguales, borramos
    setTimeout(() => {
      primerBoton.style.visibility = "hidden";
      segundoBoton.style.visibility = "hidden";
      reiniciarSeleccion();
      verificarVictoria();
    }, 500);
  } else {
    // pareja incorrecta
    setTimeout(() => {
      primerBoton.innerHTML = "?"; 
      segundoBoton.innerHTML = "?";
      primerBoton.style.backgroundColor = "#c6dbea"; // volver al color original
      segundoBoton.style.backgroundColor = "#c6dbea"; 
      reiniciarSeleccion();
    }, 1000);
  }
}
// reiniciar la selección de botones
function reiniciarSeleccion() {
  primerBoton = null;
  segundoBoton = null;
}
// verificar si se ha ganado el juego
function verificarVictoria() {
  const botonesVisibles = [...botones].filter(
    (boton) =>
      boton.style.visibility !== "hidden" && boton.style.display !== "none"
  );

  if (botonesVisibles.length === 1) {
    setTimeout(() => {
      alert("¡Felicidades! Has ganado el juego.");
    }, 300);
  }
}
//iniciar el juego
function iniciarJuego() {
  botones.forEach((boton) => {
    boton.style.backgroundColor = " #c6dbea";
    boton.innerHTML = "?";
    boton.addEventListener("click", manejarClick);
  });
  asignarColores();
}
// iniciar el juego al cargar la página
document.addEventListener("DOMContentLoaded", iniciarJuego);

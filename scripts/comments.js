let msjs = [];
let input = document.getElementById("msj");
let nombre = document.getElementById("nombreCompleto");
let btn = document.getElementById("btn");
let lista = document.getElementById("list");

function agregarMsj() {
  const msj = input.value;
  const nmbr = nombre.value;
  if (!msj || !nmbr) {
    alert("Llena ambos campos para dejar tu mensaje");
  } else {
    const mensaje = '<h5>El usuario "' + nmbr + '" dice: ' + msj + "</h5>";
    msjs.push(mensaje);
    input.value = "";
    nombre.value = "";
    mostrarMsjs();
  }
}

function eliminarMsj(index) {
  msjs.splice(index, 1);
  mostrarMsjs();
}

function mostrarMsjs() {
  !msjs.length
    ? (lista.innerHTML = "<li>No hay comentarios</li>")
    : (lista.innerHTML = "");
  msjs.forEach((mensaje, index) => {
    lista.innerHTML += `
      <li>
        <span>${mensaje}</span>
        <button class="delete" onclick="eliminarMsj(${index}) ">Eliminar</button>
      </li>
    `;
  });
}

document.addEventListener("DOMContentLoaded", mostrarMsjs);
btn.addEventListener("click", agregarMsj);


const campana = new Audio('./sounds/bell.wav');


const btnIniciar = document.querySelector('.btn-iniciar');
const btnDetener = document.querySelector('.btn-detener');
const minutosElem = document.querySelector('.minutos');
const segundosElem = document.querySelector('.segundos');

let intervalo;
let totalSegundos;
let estado = 'listo'; 
let minutosIniciales = 25; 


minutosElem.textContent = minutosIniciales < 10 ? '0' + minutosIniciales : minutosIniciales;
segundosElem.textContent = '00';


const actualizarTiempo = () => {
  if (totalSegundos <= 0) {
    campana.play();
    clearInterval(intervalo);
    estado = 'listo';
    btnIniciar.textContent = 'Iniciar';
    return;
  }

  totalSegundos--;

  let minutosRestantes = Math.floor(totalSegundos / 60);
  let segundosRestantes = totalSegundos % 60;

  minutosElem.textContent = minutosRestantes < 10 ? '0' + minutosRestantes : minutosRestantes;
  segundosElem.textContent = segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes;
};


const manejarPomodoro = () => {
  if (estado === 'listo') {
    // Iniciar
    totalSegundos = minutosIniciales * 60;
    intervalo = setInterval(actualizarTiempo, 1000);
    estado = 'corriendo';
    btnIniciar.textContent = 'Pausar';
  } else if (estado === 'corriendo') {
    // Pausar
    clearInterval(intervalo);
    estado = 'pausado';
    btnIniciar.textContent = 'Continuar';
  } else if (estado === 'pausado') {
    // Continuar
    intervalo = setInterval(actualizarTiempo, 1000);
    estado = 'corriendo';
    btnIniciar.textContent = 'Pausar';
  }
};

const reiniciarPomodoro = () => {
  clearInterval(intervalo);
  totalSegundos = minutosIniciales * 60;
  minutosElem.textContent = minutosIniciales < 10 ? '0' + minutosIniciales : minutosIniciales;
  segundosElem.textContent = '00';
  estado = 'listo';
  btnIniciar.textContent = 'Iniciar';
};

// Eventos
btnIniciar.addEventListener('click', manejarPomodoro);

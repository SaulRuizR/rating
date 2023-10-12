let rate;
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();    
})
function iniciarApp(){
   seleccionado();
   
}
function limparBotones(){
    const botones = document.querySelectorAll('.boton');
    botones.forEach(boton =>{
        boton.classList.remove('selected');
    })
}
function seleccionado(){
    const botones = document.querySelectorAll('.boton');
    botones.forEach(boton =>{
        boton.addEventListener('click', function(){
            limparBotones();
            boton.classList.toggle('selected');
            rate = boton.value;
            gracias();
        })
    })
}
function gracias(){
    const botonCalif=document.querySelector('.submit');
    const calificar = document.querySelector('.rating');
    const gracias2 = document.querySelector('.gracias');
    botonCalif.addEventListener('click', function(){
        calificar.classList.add('ocultar');
        gracias2.classList.remove('ocultar');
        gracias2.classList.add('ver');
    })
    const calif = document.getElementById('calif');
    calif.innerHTML= rate;
    setTimeout(function(){
        calificar.classList.remove('ocultar');
        calificar.classList.add('ver');
        gracias2.classList.remove('ver');
        gracias2.classList.add('ocultar');
        limparBotones();
    }, 3000);
    
}
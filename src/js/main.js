let edadUsuario = null


const setEdad = (edad) =>{
    edadUsuario = parseInt(edad)
    
}


const preguntarEdad = async () =>{
    
    const result = await Swal.fire({
        title: 'Confirma tu edad',
        icon: 'question',
        input: 'range',
        inputLabel: 'edad',
        inputAttributes: {
            min: 8,
            max: 80,
            step: 1
        },
        inputValue: 25
    })

    if(result.value != undefined){
        setEdad(result.value)
        if(edadUsuario >= 18 ){
            renderizarClubs(clubs, " Participan de nuestra agenda")
        }
    }else{
        giveMeSweetAlert("error", "no colocaste una edad valida", "recarga la pagina para ingresar")
    }
}

preguntarEdad()

const botonDarkMode = document.getElementById('botonDarkMode')
const botonLightMode = document.getElementById('botonLightMode') 

let darkMode 
const giveMeSweetAlert = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        timer: 2400,
    })
}

botonDarkMode.addEventListener('click', () => {
    giveMeSweetAlert("success", 'party mode activado!', '♪ ♬ ─=≡Σ((( つ•̀ω•́)つLET’SGO! ♬ ♪')
})

botonLightMode.addEventListener('click', () => {
    giveMeSweetAlert("success", 'take it easy mode activado!', '(⌣_⌣”)' )
})

localStorage.getItem('theme') ? darkMode = localStorage.getItem('theme') : localStorage.setItem('theme', 'light')

if (darkMode == 'dark') {
  document.body.classList.add('darkMode')
}

botonDarkMode.addEventListener('click', () => {
  document.body.classList.add('darkMode')
  localStorage.setItem('theme', 'dark')
})

botonLightMode.addEventListener('click', () => {
  document.body.classList.remove('darkMode')
  localStorage.setItem('theme', 'light')
})

/* --------------------------------------------------------------------------------------- */

//FORMULARIO 

const formulario = document.getElementById("formulario")

formulario.addEventListener("submit", (e) =>{

    e.preventDefault()
    const { nombre, precioEntrada, precioParking, experiencia} = formulario
    const user = {
        nombre: nombre.value,
        precioEntrada: parseInt(precioEntrada.value),
        precioParking: parseInt(precioParking.value),
        experiencia: experiencia.value
    }

    procesarUsuario(user)

    nombre.value = precioEntrada.value = precioParking.value = ""

})


const clubs = []
fetch('../src/data/clubes.json')
        .then(
            (response) => response.json()
        )
        .then((data) => {
            data.forEach( (club) => clubs.push(club))
        })



const resultadosHTML = document.getElementById("resultados")
const tituloResultado = document.getElementById("tituloResultado")
const saludoHTML = document.getElementById("saludo")

const renderizarClubs = (listaDeClubs, mensaje) =>{

    tituloResultado.innerHTML = `<h2>${mensaje}</h2>`
    resultadosHTML.innerHTML = ""
    for(let club of listaDeClubs){
        resultadosHTML.innerHTML += crearPlantillaClub(club)
    }
}

const crearPlantillaClub = (club) =>{
    return `<div class="cardClub">
                <h3>Nombre: ${club.nombre}</h3>
                <img src=${club.thumbnail} alt="imagen de boliche"/>
                <p>Tipo: ${club.tipo}</p>
                <p>Precio: $${club.precio}</p>
            </div>`
}

const procesarUsuario = (user) =>{

    const { nombre, precioEntrada, precioParking, experiencia} = user
      
   if (edadUsuario < 18) {
    giveMeSweetAlert("error", 'No contas con la edad suficiente para ingresar', "(¬_¬'')ԅ(￣ε￣ԅ)");
    }else if(edadUsuario >= 18){
        saludoHTML.innerHTML = `Hola ${nombre}, bienvenidx a nuestra agenda nocturna!`
        const bolichesFiltrados = clubs.filter((boliche) => boliche.precio <= precioEntrada + precioParking && boliche.tipo === experiencia)
        console.log(bolichesFiltrados)
        renderizarClubs(bolichesFiltrados, "Segun tus preferencias: ")
    }
}



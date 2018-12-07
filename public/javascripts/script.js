document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');
  //console.log({{{teachers}}})

}, false);

/* document.getElementById('hamburguesita').addEventListener('mouseover', function() {
    document.getElementById('listaa').style.display = 'block'
    document.getElementById('listaa').addEventListener('mouseover', function() {
        document.getElementById('listaa').style.display = 'block'
    })
})


document.getElementById('hamburguesita').addEventListener('mouseout', function() {
    document.getElementById('listaa').addEventListener('mouseout', function() {
        document.getElementById('listaa').style.display = 'none'
    })
})

document.getElementById('hamburguesita').addEventListener('click', function() {
    document.getElementById('listaa').style.display = 'block'
    document.getElementById('listaa').addEventListener('mouseover', function() {
        document.getElementById('listaa').style.display = 'block'
    })
})

document.getElementById('hamburguesita').addEventListener('dblclick', function() {
    document.getElementById('listaa').addEventListener('mouseout', function() {
        document.getElementById('listaa').style.display = 'none'
    })
}) */

function Busqueda(x) {
    document.addEventListener('keyup', function(e) {
        if (e.keyCode === 13) {
            const busqueda = document.getElementById('busquedaLanding').value
            if (busqueda != '') {
                window.localStorage.setItem('busqueda', busqueda)
                document.getElementById('toResult').click()
            }
        }
    })
}

function doBsuqueda() {
    var busqueda = localStorage.getItem('busqueda')
    console.log(busqueda)
}

document.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        doBsuqueda()
    }
})

/*
document.getElementById('upLoad').addEventListener('click', function() {
    document.getElementById('toUploadCloud').click()

})
*/
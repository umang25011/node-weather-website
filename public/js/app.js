// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const one = document.querySelector('#one')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    one.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{
        console.log(data)
        one.textContent = data.forecast.description
    })
    })
    search.value=""
})
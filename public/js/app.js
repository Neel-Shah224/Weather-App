console.log('Client Side JavaScript Working Great')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    msg1.style.backgroundColor = 'white'
    msg1.style.color = msg2.style.color
    msg1.style.padding = msg2.style.padding
    msg2.textContent=''
    msg1.textContent='Loading .... '
    fetch('/weather?address='+location).then( (response) => {
        response.json().then( (data) => {
            if(data.error){
                msg1.textContent=data.error
                msg2.textContent=''
                msg1.style.backgroundColor = 'red'
                msg1.style.color = 'white'
                msg1.style.padding = '3px'
            }
            else {
                msg1.textContent =(data.location )
                msg2.textContent = ( data.forecast)
            }
        })
    })
    search.value=''
})
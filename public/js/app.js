console.log('Client Side JavaScript Working Great')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    msg1.style.color = msg2.style.color
    msg2.textContent=''
    msg1.textContent='Loading .... '
    document.body.style.backgroundImage = 'none'
    fetch('/weather?address='+location).then( (response) => {
        response.json().then( (data) => {
            if(data.error){
                msg1.textContent=data.error
                msg2.textContent=''
                msg1.style.color = 'red'
            }
            else {
                msg1.textContent =(data.location )
                msg2.textContent = ( data.forecast)
                if(data.is_day === 'yes'){
                    
                    document.body.style.backgroundImage = "url('./img/day.png')";
                }
                else{
                    
                    document.body.style.backgroundImage = "url('./img/night.png')";
                }
            }
        })
    })
    search.value=''
})
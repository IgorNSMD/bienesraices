(function(){
    //alert('cambiarestado.js')
    const changeStateBtn = document.querySelectorAll('.change-state')
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

    changeStateBtn.forEach( b => {
        b.addEventListener('click',changeStateProperty)
    });

    async function changeStateProperty(e){
        const { propertyid: id } = e.target.dataset
        //console.log(id)

        try {
            const url = `/properties/changeState/${ id }`

            const resp = await fetch(url,{
                method:'PUT',
                headers: {
                    'CSRF-Token': token
                }
            })
    
            console.log(resp)            
        } catch (error) {
            console.log(error)    
        }
    }

})()
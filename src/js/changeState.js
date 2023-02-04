(function(){
    //alert('cambiarestado.js')
    const changeStateBtn = document.querySelectorAll('.change-state')

    changeStateBtn.forEach( b => {
        b.addEventListener('click',changeStateProperty)
    });

    function changeStateProperty(e){
        const { propertyid: id } = e.target.dataset
        console.log(id)
    }

})()
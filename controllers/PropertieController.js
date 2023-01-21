const admin = (req,res) => {
    res.render('properties/admin',{
        pageLabel: 'Mis propiedades',
        barra:true
    })
}

export {
    admin
}
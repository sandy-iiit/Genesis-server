
exports.getLogin =(req,res,next)=>{
    res.render('login',{})
}
exports.getSignup =(req,res,next)=>{
    res.render('signup',{})
}

exports.getHome=(req,res,next)=>{
    res.render('home',{})
}
arr=[{name:'insurance name',term:'x yrs',percentage:90+'%',cost:'f'},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:'f'},
    {name:'insurance name',term:'x yrs',percentage:90+'%',cost:'f'},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:'f'},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''},{name:'insurance name',term:'x yrs',percentage:90+'%',cost:''}]
exports.getHealthPolicies=(req,res,next)=>{
    res.render('healthpolicies',{array:arr})
}
exports.getVehiclePolicies=(req,res,next)=>{
    res.render('transportpolicies',{array:arr})
}

exports.getDetails=(req,res,next)=>{
    res.render('details',{name:'Sandeep',email:'ishidoshuji@gmail.com'})
}

exports.getMyDetails=(req,res,next)=>{
    res.render('my-details')
}

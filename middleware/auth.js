const isLogin = async (req,res,next)=>{
    try{
        console.log("inside auth");
        if(req.session.user){
           
            next()
        }
        else{
            res.redirect('/login')
            
        }

    } catch (error){
        console.log(error.message);
    }
}


const isLogOut = async (req,res,next)=>{
    try{
    
        if(req.session.user){
            res.redirect("/home")

        }else{
            // console.log("login")
            // res.redirect('/login')
            next()
        }
       

    } catch (error){
        console.log(error.message);
    }
}

module.exports ={
    isLogin,
    isLogOut,
}
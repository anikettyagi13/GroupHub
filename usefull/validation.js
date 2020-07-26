export const validEmail =(email)=>{
    var emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    var emailType = new RegExp(emailPattern);

    if(email.match(emailType)){
        return true;
    }
    else{
        return false;
    }
}

export const validUsername=(username)=>{
    var usernamePattern = /^[a-z0-9._-]{5,16}$/;

    var usernameType = new RegExp(usernamePattern);

    if(username.match(usernameType)){
        return true;
    }else{
        return false
    }
}
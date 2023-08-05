export default function Validation(values){
    const errors={}
    const email_pattern =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const password_pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/
    const name_pattern=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
if(values.name===""){
    errors.name="Name is Required";
}
else if(!name_pattern.test(values.name)){
errors.name="name didn't match"
}
if(values.email===""){
    errors.email="email is required"
}
else if(!email_pattern.test(values.email)){
    errors.email="email didn't match"
}
if(values.password===""){
    errors.password="password required"
}
else if(!password_pattern.test(values.password))
{
    errors.password="password didn't match"
}

return errors;
}
let inputEmail = document.getElementById("inputEmail")
let inputPassowrd = document.getElementById("inputPassword")
let loginButton = document.getElementById("loginButton")

loginButton.addEventListener("click", ()=>{

    let email = inputEmail.value
    let password= inputPassowrd.value

    fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
            if(data.message="success"){
                window.location.href="/pacients"
            }
            else{
                alert("credenciales incorrectas")
            }
        })
        .catch((error) => alert("usuario no encontrado"))
        .catch((error) => alert("usuario no encontrado"));
});



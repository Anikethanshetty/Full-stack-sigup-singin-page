let loginForm = document.querySelector(".my-form")

loginForm.addEventListener("submit", (e) => { 
    e.preventDefault();

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    // First, check if the email already exists
    axios
        .post("http://localhost:4000/check-email", { email }) 
        .then(res => {
            if (res.data.exists) {
                alert("Email already exists")
            } else {
                // If email doesn't exist, proceed with signup
                axios
                    .post("http://localhost:4000/signup", { email, password }) 
                    .then(res => {
                        alert("Signup successful")
                        window.location.href= "http://localhost:4000/signin"
                    })
                    .catch(err => {
                        alert("Signup error")
                    })
            }
        })
        .catch(err => {
            alert("Failed to check email")
        })

})

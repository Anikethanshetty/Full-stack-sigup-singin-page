const logout = document.querySelector("button")

logout.addEventListener("click",()=>{
    localStorage.removeItem("token")
    window.location.href="http://localhost:4000/signin"
})

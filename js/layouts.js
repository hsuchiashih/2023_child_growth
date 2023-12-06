renderLoginOrNot();

function renderLoginOrNot(){
  if(token){
    document.querySelectorAll(".login-user-box").forEach(element => {
      element.classList.remove("d-none");
    });
    document.querySelectorAll(".user-name").forEach(element => {
      element.innerHTML = userInfo.username;
    });
    document.querySelectorAll(".login-out-box").forEach(element => {
      element.classList.remove("d-none");  
      element.addEventListener("click",logout);
    });
    document.querySelectorAll(".login-box").forEach(element => {
      element.classList.add("d-none");
    });

  }else{
    document.querySelectorAll(".login-box").forEach(element => {
      element.classList.remove("d-none");
      element.addEventListener("click",()=>{
        window.location.href = "./login.html";
      });
    });
    document.querySelectorAll(".login-out-box").forEach(element => {
      element.classList.add("d-none");
    });
    document.querySelectorAll(".login-user-box").forEach(element => {
      element.classList.add("d-none");
    });
    // document.querySelector("a.logout").classList.add("d-none");
  }
}
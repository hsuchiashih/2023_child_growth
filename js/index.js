if(token){
  document.querySelectorAll(".user-name").forEach(element => {
    element.innerHTML = userInfo.username;
  });
  document.querySelectorAll(".logout").forEach(element => {
    element.classList.remove(d-none);    element.addEventListener("click",logout);
  });
  document.querySelectorAll(".login").forEach(element => {
    element.classList.add(d-none);
  });

}else{
  document.querySelector("a.login").classList.remove(d-none);
  document.querySelector("a.logout").classList.add(d-none);
}
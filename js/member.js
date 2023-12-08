init();
function init(){
  Object.keys(userInfo).forEach(key=>{
    if(document.querySelector(`.${key}`) != null){
      document.querySelector(`.${key}`).innerHTML += userInfo[key];
    }
  });
}
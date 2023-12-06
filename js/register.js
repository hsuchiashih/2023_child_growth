// login();
document.querySelector("#memberPasswordAgain").addEventListener("input",checkPasswordMatch);
function handleFormData(data) {
  if(data.memberPassword != data.memberPasswordAgain){
    return alert('密碼不相符');
  }
  // 在這裡處理你的數據
  let signupInfo = {
      email: data.memberEmail,
      username: data.memberName,
      password: data.memberPassword,
      gender: data.memberName,
      user_birth: data.membebirthday,
      user_avatar: ""
    }
  console.log(signupInfo);
  
  signup(signupInfo)
  .then(response=>{
        console.log(_response);
    if(_response.status.toString().startsWith('2')){
      alert('註冊成功，自動登入並跳轉到新增兒童');
      window.location.href = "./new-child.html";
    }else{
      alert(`${_response.data || _response.message}`);
    }
  })
  .catch(error=>{
    console.error('Error:', error);
    alert(`${error.response.data}`);
  });
}
function checkPasswordMatch() {
  var password = document.getElementById('memberPassword').value;
  var confirmPassword = document.getElementById('memberPasswordAgain').value;
  var matchStatus = document.getElementById('passwordMatchStatus');

  if (password === confirmPassword) {
    matchStatus.textContent = '密碼相符';
    matchStatus.className = 'password-match';
  } else {
    matchStatus.textContent = '密碼不相符';
    matchStatus.className = 'password-not-match';
  }
}
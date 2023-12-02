console.log("Charizard@mail.com");
console.log("wda@123");

function handleFormData(data) {
  // 在這裡處理你的數據
  let loginInfo = {
      email: data.memberEmail,
      password: data.memberPassword,
    }
  console.log(loginInfo);
  login(data.memberEmail,data.memberPassword);
  let loginSeconds = url == "http://localhost:3000"?500:5000;
  setTimeout(()=>{
    console.log(_response);
    if(_response.status.toString().startsWith('2')){
      alert('登入成功，跳轉到每日紀錄(待改)');
      setTimeout(() => {
        // console.log(`${data.memberEmail},${data.memberPassword}`);
        // login(data.memberEmail,data.memberPassword);
        let whereTo = localStorage.getItem('whereTo');
        localStorage.removeItem('whereTo');
        window.location.href = whereTo|| "./daily.html";
      }, 500);
    }else{
      alert(`${_response.data || _response.message}`);
    }
  },loginSeconds);
}
console.log("Charizard@mail.com");
console.log("wda@123");

function handleFormData(data) {
  // 在這裡處理你的數據
  let loginInfo = {
      email: data.memberEmail,
      password: data.memberPassword,
    }
  console.log(loginInfo);
  login(data.memberEmail,data.memberPassword).then(response=>{
    // _response = response;
    console.log(_response);
    if(_response.status.toString().startsWith('2')){
      let whereTo = localStorage.getItem('whereTo');
      let message = whereTo?"原頁面":"紀錄每日作息";
      alert(`登入成功，跳轉到${message}`);
      localStorage.removeItem('whereTo');
      window.location.href = whereTo|| "./daily.html";
    }else{
      // _response = response;
      alert(`${_response.data || _response.message}`);
    }
  }).catch(error=>{
    // _response = error;
    console.log(error);
  });
}
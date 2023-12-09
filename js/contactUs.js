document.querySelector(".custom_clear_button").addEventListener("click",emptyValue);
function emptyValue(){
  $('#input-name')[0].value = "";
  // $('#input-gender')[0].value = "";
  $('#input-email')[0].value = "";
  $('#input-phone')[0].value = "";
  $('#textarea-content')[0].value = "";
}

async function handleFormData(data) {
  // 在這裡處理你的數據
  let contactInfo = {
    email: data['input-email'],
    name: data['input-name'],
    phone: data['input-phone'],
    gender: data['input-gender'],
    content: data['textarea-content'],
  }
  console.log(contactInfo);
  await addContactUs(contactInfo);
  setTimeout(()=>{
    console.log(_response);
    if(_response.status == 201 || _response.statusText == 'Created'){
      alert('發送成功，跳轉回首頁');
      setTimeout(() => {
        window.location.href = "./";
      }, 500);
    }else{
      alert('發送失敗');
    }
  },500);
}
  //待處理非同步login()->getData()->render()
  //待處理PATCH代替POST
console.log("要處理換人的addEventListener");

setDateToday();
enteringRender();
setRadioValueToInput();
function setDateToday(){
      document.addEventListener('DOMContentLoaded', function() {
      // 獲取今天的日期，並格式化為 "YYYY-MM-DD"
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; // 月份是從 0 開始計數的，所以需要加 1
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }

      if (mm < 10) {
        mm = '0' + mm;
      }

      today = yyyy + '-' + mm + '-' + dd;

      // 將今天的日期設置為 input 的值
      document.getElementById('datepicker').value = today;
    });
}
function setRadioValueToInput(){
    // 獲取所有的 radio 元素
  // var radios = document.querySelectorAll('.radio');

  // 獲取 input 元素
  // var wakeupInput = document.getElementById('wakeup');

  // 為每個 radio 元素添加事件監聽器
  document.querySelector('#myForm').addEventListener('click', function(event) {
    // 當 radio 被選中時，將其值設置到 input 的 value 屬性中
    // console.log(event.attributes.name.nodeValue);
    if(event.srcElement.type == 'radio'){
      let id = '#'+event.srcElement.name
      document.querySelector(id).value = event.srcElement.value;
    }
  });
  // radios.forEach(function(radio) {
  //   radio.addEventListener('click', function() {
  //     // 當 radio 被選中時，將其值設置到 input 的 value 屬性中
  //     alert(1);
  //     wakeupInput.value = radio.value;
  //   });
  // });
}
function handleFormData(data) {
  // 在這裡處理你的數據
  // console.log(data);
  let daily_record= {
    "sleep_record":{
      // "kidId": 99999999,
      "record_date": data.datepicker,
      "wakeup_time": data.wakeup,
      "sleep_time": data.sleep,
    },
    "breakfast_record": {
        // "sleep_recordId": 99999999,
        // "kidId": 99999999,
        "record_date": data.datepicker,
        "content": data.breakfast,
        "noBreadMilk": data.breakfastNM,
        "noDessert": data.breakfastND,
    },
    "lunch_record": {
        // "sleep_recordId": 99999999,
        // "kidId": 99999999,
        "record_date": data.datepicker,
        "content": data.lunch,
        "noBreadMilk": data.lunchNM,
        "noDessert": data.lunchND,
    },
    "dinner_record": {
        // "sleep_recordId": 99999999,
        // "kidId": 99999999,
        "record_date": data.datepicker,
        "content": data.dinner,
        "noBreadMilk": data.dinnerNM,
        "noDessert": data.dinnerND,
    }
  }
  console.log(daily_record);
  let kidNum = document.querySelector('.owl-item.active .item').attributes["data-kidnum"].value;
  if(_response.data.length != 0 || !!_response[1]){
    updateDailyRecord(kidNum,daily_record)
    .then(response=>{
      if(response.status.toString().startsWith('2')){
        alert(`完成修改${data.datepicker}每日紀錄`);
      }else{
        alert(`${response.message || response.data }`);
      }
    })
    .catch(error=>{
      _response = error;
      alert(error.response.data);
    });
  }else{
    addDailyRecord(kidNum,daily_record)
        .then(response=>{
      if(response.status.toString().startsWith('2')){
        alert(`完成新增${data.datepicker}每日紀錄`);
      }else{
        alert(`${response.message || response.data }`);
      }
    })
    .catch(error=>{
      _response = error;
      alert(error.response.data);
    });
    
  }
  // console.log(_response);
  // window.location.href = document.referrer;
}
function renderValue(_response){
  document.querySelector(".kid-name").innerHTML = userInfo.kids[0].kid_name;
  if(!_response.data || _response.data == ""){
    emptyValue(); 
    // alert("當日尚無紀錄");
    $('#wakeup')[0].value = '08:00';
    $('#sleep')[0].value = '21:00';
    $('.is-record-exist')[0].classList.remove('d-none');
  }else{
    $('.is-record-exist')[0].classList.add('d-none');
    $('#wakeup')[0].value = _response.data[0].wakeup_time;
    $('#sleep')[0].value = _response.data[0].sleep_time;
    $('#breakfast')[0].value = _response.data[0].breakfast_records[0].content;
    document.querySelector('#breakfastNM').checked = _response.data[0].breakfast_records[0].noBreadMilk == 'Y'? true:false;
    document.querySelector('#breakfastND').checked = _response.data[0].breakfast_records[0].noDessert == 'Y'? true:false;
    $('#lunch')[0].value = _response.data[0].lunch_records[0].content;
    document.querySelector('#lunchNM').checked = _response.data[0].lunch_records[0].noBreadMilk == 'Y'? true:false;
    document.querySelector('#lunchND').checked = _response.data[0].lunch_records[0].noDessert == 'Y'? true:false;
    $('#dinner')[0].value = _response.data[0].dinner_records[0].content;
    document.querySelector('#dinnerNM').checked = _response.data[0].dinner_records[0].noBreadMilk == 'Y'? true:false;
    document.querySelector('#dinnerND').checked = _response.data[0].dinner_records[0].noDessert == 'Y'? true:false;
  }
}
function emptyValue(){
  $('#wakeup')[0].value = "";
  $('#sleep')[0].value = "";
  $('#breakfast')[0].value = "";
  document.querySelector('#breakfastNM').checked = false;
  document.querySelector('#breakfastND').checked = false;
  $('#lunch')[0].value = "";
  document.querySelector('#lunchNM').checked = false;
  document.querySelector('#lunchND').checked = false;
  $('#dinner')[0].value = "";
  document.querySelector('#dinnerNM').checked = false;
  document.querySelector('#dinnerND').checked = false;
}

document.querySelector('#datepicker').addEventListener('change', function(event) {
  console.log("dateChanged");
  emptyValue();
  let kidNum = document.querySelector('.owl-item.active .item').attributes["data-kidnum"].value;
  getDailyRecords(kidNum,event.target.value).then((response)=>{
    console.log(response);
    renderValue(response)
  });
});

function enteringRender(){
  if(userInfo.kids.length == 0){
    alert('使用者無兒童，跳轉到新增兒童');
    return window.location.href = "./new-child.html" 
  }
  if(window.location.search != ""){
    // 獲取網址中的 search 部分，例如 "?record_date=2023-11-09"
    var queryString = window.location.search;
  
    // 使用 URLSearchParams 解析 search 部分
    var urlParams = new URLSearchParams(queryString);
  
    // 獲取 record_date 參數的值
    var recordDate = urlParams.get('record_date');
    var kidNum = urlParams.get('kidNum');
    console.log(recordDate);
    // console.log(kidNum);
  }
  if(recordDate != null){
    getDailyRecords(kidNum,recordDate).then((response)=>{
      renderValue(response); 
      document.querySelector('#datepicker').value = recordDate.toString();
      renderKidsList();
    });
  }else{
    renderKidsList();
    // initialRender(getDailyRecords);
    // let kidNum = document.querySelector('.owl-item.active .item').attributes["data-kidnum"].value;
    getDailyRecords(0).then(
      response=>renderValue(response)
    );
  }
}
function renderKidsList(){
  let content = "";
  userInfo.kids.forEach((element,i) => {
    content +=`
      <div class="item" data-kidNum=${i}>
        <div class="owl-change-kid-pic">
          <img
            class="img-fluid"
            src="./src/home/Rectangle 54 (2).png"
            alt=""
          />
        </div>
        <p class="kid-name">${element.kid_name}</p>
      </div>
    `
  });
  document.querySelector(".owl-change-kid").innerHTML = content;
}

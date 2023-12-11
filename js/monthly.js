renderKidsList();

function handleFormData(data) {
  // 在這裡處理你的數據
  // console.log(data);
  let   monthlyRecord = {
    height: data.height,
    weight: data.weight,
    record_month: data.monthpicker,
  }
  console.log(monthlyRecord);
  let kidNum = document.querySelector('.owl-item.active .item').attributes["data-kidnum"].value;
  getMonthlyRecordByMonth(kidNum,data.monthpicker).then(response=>{
    console.log(response);
    if(response.data != ""){
      alert(`該月已有紀錄，身高：${response.data[0].height}、體重：${response.data[0].weight}。`);
      return;
    }

    addMonthlyRecord(monthlyRecord,kidNum).then(response=>{
      if(_response.status.toString().startsWith('2')){
        alert(`完成新增${data.monthpicker}每月紀錄`);
      }else{
        alert(_response.statusText);
      }
      });
  });
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

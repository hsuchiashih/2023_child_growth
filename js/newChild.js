const constraints = {
    childName: {
      presence: {
        allowEmpty: false
      }
    },
    childBirthday: {
      presence: {
        allowEmpty: false
      }
    },
    childHeight: {
      presence: {
        allowEmpty: false
      }
    },
    childWeight: {
      presence: {
        allowEmpty: false
      }
    },
    momHeight: {
      presence: {
        allowEmpty: false
      }
    },
    dadHeight: {
      presence: {
        allowEmpty: false
      }
    },
  };
let params = {

};

/**
 *  @todo
 *  登入功能暫時放頁面中，因為需要取得token、userInfo
 *  待token、userInfo 存入全域範圍，即可刪除
 */

// 取得dateTime(可考慮抽共用)
function getDatetime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return (formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
}
// 新增兒童api
function postNewChild(kidInfo, token, userInfo) {
  kidInfo.userId = kidInfo.userId ? kidInfo.userId : userInfo.id;
  kidInfo.created_at = getDatetime();
  kidInfo.modified_time = getDatetime();
  kidInfo.isExist = "Y";
  console.log(kidInfo);
  axios
    .post(`${url}/600/kids`, kidInfo, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log(response);
      // Swal.fire({
      //   title: '新增成功',
      //   icon: 'success',
      //   confirmButtonText: '關閉'
      // })
      _response = response;
      if(_response.status.toString().startsWith('2')){
        getUserInfo(userInfo.id);
        alert('新增成功，跳轉到新增每日紀錄');
        window.location.href = "./daily.html";
      }else{
        alert(`${_response.data || _response.message}`);
      }      
    })
    .catch(function (error) {
      console.log(error.response);
      _response = error.response;
      alert(error.response);
    });
}
// 準備參數
function prepareParams() {
  const childName = document.getElementById('childName').value;
  const childBirthday = document.getElementById('childBirthday').value;
  const childHeight = document.getElementById('childHeight').value;
  const childWeight = document.getElementById('childWeight').value;
  const momHeight = document.getElementById('momHeight').value;
  const dadHeight = document.getElementById('dadHeight').value;
  const kidInfo = {
      childName,
      childBirthday,
      childHeight,
      childWeight,
      momHeight,
      dadHeight
  }
  // const kidInfo = {

  // }
  return kidInfo
}
// 檢查參數並給錯誤提示訊息
function checkParams(params) {
  const errors = validate(params, constraints)
  if (errors) {
    const errorInput = {
      'childName': 'nameError',
      'childBirthday': 'birthdayError',
      'childHeight': 'heightError',
      'childWeight': 'weightError',
      'momHeight': 'momHeightError',
      'dadHeight': 'dadHeightError',
    }
    Object.keys(errors).forEach(item => {
      document.getElementById(`${errorInput[item]}`).classList.remove('d-none');
    })

    return false;
  } else {
    
    return true;
  }
}
// 轉換傳送給後端的參數
function transformParams(params) {
  const result = {
      kid_name: params.childName,
      kid_birth: params.childBirthday,
      ini_height: params.childHeight,
      ini_weight: params.childWeight,
      mom_height: params.momHeight,
      dad_height: params.dadHeight,
      kid_avatar: "kidURL",
    }
  return result
}
// 送出新增按鈕功能
document.getElementById('addButton').addEventListener('click', 
  function addKid() {
    if (token !== '') {
      const params = prepareParams();
      if(checkParams(params)) {
        const finalParams = transformParams(params);
        postNewChild(finalParams, token, userInfo);
      }
    } else {
      Swal.fire({
        title: '不可進行新增',
        text: 'token 未通過 請重新登入',
        icon: 'error',
        confirmButtonText: '關閉'
      })
    } 
  })
// 清除資料按鈕功能
document.getElementById('clearButton').addEventListener('click', 
function clear() {
  const errorInput = {
      'childName': 'nameError',
      'childBirthday': 'birthdayError',
      'childHeight': 'heightError',
      'childWeight': 'weightError',
      'momHeight': 'momHeightError',
      'dadHeight': 'dadHeightError',
  }
  Object.keys(errorInput).forEach(item => {
    document.getElementById(`${item}`).value = '';
    document.getElementById(`${errorInput[item]}`).classList.add('d-none');
  })
  const params = prepareParams();
  transformParams(params);
  
})
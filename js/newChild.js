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

  let params = {};


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
  function postNewChild() {
    if (token !== '') {
      const params = prepareParams();
      if(checkParams(params)) {
        const finalParams = transformParams(params);
        addKid(token, userInfo, finalParams)
          .then((res) => {
            getUserInfo(userInfo.id);
            clear();
            Swal.fire({
              title: '新增成功',
              text: '新增成功，跳轉到新增每日紀錄',
              icon: 'success',
              confirmButtonText: '關閉'
            }).then((result) => {
              if(result.isConfirmed) {
                window.location.href = "./daily.html";
              }
            });
          }).catch((err) => {
            Swal.fire({
              title: '新增失敗',
              icon: 'error',
              confirmButtonText: '關閉'
            });
          })
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
document.getElementById('clearButton').addEventListener('click', clear())

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
}


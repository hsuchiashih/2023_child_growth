function signup(
  signupInfo = {
    email: "dragonite@mail.com",
    username: "快龍",
    password: "wda@123",
    gender: "female",
    user_birth: "2023-09-13",
    user_avatar: "userURL",
  },
) {
  return new Promise((resolve, reject) => {
  signupInfo.created_at = getDatetime();
  signupInfo.modified_time = getDatetime();
  signupInfo.isExist = "Y";
  axios
    .post(`${url}/signup`, signupInfo)
      .then(response => {
        localStorage.setItem('jwtToken', response.data.accessToken);
        localStorage.setItem('userData',JSON.stringify(response.data.user));
        token = response.data.accessToken;
        // data = response.data;
        _response = response;
        delete _response.data.password;
        console.log(_response);
        resolve(response);
      })
      .catch(error => {
      alert(error.response);
      _response = error;
      if(error.message=='Network Error'){
        alert('伺服器未開啟');
      }
        reject(error);
      });
  });
}

function login(email = "Charizard@mail.com", password = "wda@123") {
  return new Promise((resolve, reject) => {
    if(onrenderActivated == "off"){
      alert("伺服器開啟中，關閉視窗後等候約5秒鐘。");
    }
    axios
      .post(`${url}/login`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem('jwtToken', response.data.accessToken);
        localStorage.setItem('userData',JSON.stringify(response.data.user));
        token = response.data.accessToken;
        userInfo = response.data.user;
        // token = response.data.accessToken;
        // userInfo = response.data.user;
        _response = response;
        console.log(response);
        getUserInfo(response.data.user.id);
        resolve(response.data);
      })
      .catch(function (error) {
        alert(error.response);
        _response = error;
        if(error.message=='Network Error'){
          alert('伺服器未開啟');
        }
        reject(error);
      });
  });
}

function logout(){
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userData');
  token ="";
  userInfo="";
  _response="";
  alert("登出並回首頁");
  window.location.href = "./";
}

function addKid(token, userInfo,
  kidInfo = {
    kid_name: "迷你龍",
    kid_birth: "2012-09-17",
    ini_height: 123.1,
    ini_weight: 36.1,
    mom_height: 165.1,
    dad_height: 176.1,
    kid_avatar: "kidURL",
  },
) {
  return new Promise((resolve, reject) => {
    kidInfo.userId = kidInfo.userId ? kidInfo.userId : userInfo.id;
    kidInfo.created_at = getDatetime();
    kidInfo.modified_time = getDatetime();
    kidInfo.isExist = "Y";
    axios
    .post(`${url}/600/kids`, kidInfo, {

      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log(response);
      _response = response;
      resolve(response);
      })
      .catch(function (error) {
        console.log(error.response);
        _response = error.response;
        reject(error.response);
      });
  });
}

function addMonthlyRecord(
  monthlyRecord = {
    kidId: 99999,
    height: 96,
    weight: 9,
  },
  kidNum,
) {
  return new Promise((resolve, reject) => {
    monthlyRecord.userId = monthlyRecord.userId
    || userInfo.id;
    monthlyRecord.kidId = monthlyRecord.kidId
    || userInfo.kids[kidNum].id;
    monthlyRecord.created_at = getDatetime();
    
    axios
    .post(`${url}/600/monthly_records`, monthlyRecord, {
      headers: {
        authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        _response = response;
        resolve(response);
      })
      .catch(function (error) {
        console.log(error.response);
        _response = error.response;
        reject(error.response);
      });
  })
}
/*
    "sleep_record":{
      "wakeup_time": "23:59",
      "sleep_time": "00:59",
    },
    "breakfast_record": {
        "id": 89,
        "sleep_recordId": 89,
        "kidId": 2,
        "userId": 2,
        "content": "吐司、柳橙汁",
        "noBreadMilk": "N",
        "noDessert": "N",
        "create_at": "undefined 22:30",
        "modified_time": "2023-09-17 14:15:30",        
    },
    "lunch_record": {
        "id": 89,
        "sleep_recordId": 89,
        "kidId": 2,
        "userId": 2,
        "record_date": "2023-10-29",
        "content": "沙威瑪",
        "noBreadMilk": "N",
        "noDessert": "Y",
        "create_at": "2023-10-29 22:30",
        "modified_time": "2023-09-17 14:15:30", 
    },
    "dinner_record": {
        "id": 89,
        "sleep_recordId": 89,
        "kidId": 2,
        "userId": 2,
        "record_date": "2023-10-29",
        "content": "紅燒肉",
        "noBreadMilk": "N",
        "noDessert": "Y",
        "create_at": "2023-10-29 22:30",
        "modified_time": "2023-09-17 14:15:30", 
    }
*/
async function addDailyRecord(
  daily_record = {
    sleep_record: {
      kidId: 99999999,
      wakeup_time: "23:59",
      sleep_time: "00:59",
    },
    breakfast_record: {
      sleep_recordId: 99999999,
      kidId: 99999999,
      record_date: "2023-09-25",
      content: "吐司、柳橙汁",
      noBreadMilk: "N",
      noDessert: "N",
    },
    lunch_record: {
      sleep_recordId: 99999999,
      kidId: 99999999,
      record_date: "2023-09-25",
      content: "沙威瑪",
      noBreadMilk: "N",
      noDessert: "N",
    },
    dinner_record: {
      sleep_recordId: 99999999,
      kidId: 99999999,
      record_date: "2023-09-25",
      content: "紅燒肉",
      noBreadMilk: "N",
      noDessert: "N",
    },
  },
  kidNum = 0,
) {
  console.log('addDailyRecord');
  await addSleepRecord(daily_record.sleep_record, kidNum);
  // console.log('addSleepRecord執行完畢');
  // console.log(_response[0].id);
  addBreakfastRecord(daily_record.breakfast_record, kidNum);
  addLunchRecord(daily_record.lunch_record, kidNum);
  addDinnerRecord(daily_record.dinner_record, kidNum);
}
async function addSleepRecord(sleep_record, kidNum=0) {
  // console.log(sleep_record);
  // console.log(userInfo);
  sleep_record.kidId = userInfo.kids[kidNum].id || sleep_record.kidId;
  sleep_record.userId = userInfo.id || sleep_record.userId;
  sleep_record.record_date = sleep_record.record_date ||getMonthDate();
  sleep_record.sleep_hours = countSleepHours(
    sleep_record.wakeup_time,
    sleep_record.sleep_time,
  );
  sleep_record.modified_time = getDatetime();
  sleep_record.created_at = getDatetime();
  try {
    const response = await axios.post(
      `${url}/600/sleep_records`,
      sleep_record,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response);
    return (_response[0] = response);
  } catch (error) {
    console.log(error.response);
    _response[0] = error.response
    throw error; // 抛出错误以便处理错误情况
  }
}
function addBreakfastRecord(breakfast_record, kidNum) {
  breakfast_record.sleep_recordId =
    _response[0].data.id || breakfast_record.sleep_recordId;
  breakfast_record.kidId = userInfo.kids[kidNum].id || breakfast_record.kidId;
  breakfast_record.userId = userInfo.id || breakfast_record.userId;
  breakfast_record.record_date = breakfast_record.record_date || getMonthDate();
  breakfast_record.modified_time = getDatetime();
  breakfast_record.created_at = getDatetime();
  axios
    .post(`${url}/600/breakfast_records`, breakfast_record, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log(response);
      _response[1] = response;
    })
    .catch(function (error) {
      console.log(error.response);
      _response[1] = error.response;
    });
}
function addLunchRecord(lunch_record, kidNum) {
  lunch_record.sleep_recordId =
    _response[0].data.id || lunch_record.sleep_recordId;
  lunch_record.kidId = userInfo.kids[kidNum].id || lunch_record.kidId;
  lunch_record.userId = userInfo.id || lunch_record.userId;
  lunch_record.record_date = lunch_record.record_date || getMonthDate();
  lunch_record.modified_time = getDatetime();
  lunch_record.created_at = getDatetime();
  axios
    .post(`${url}/600/lunch_records`, lunch_record, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log(response);
      _response[2] = response;
    })
    .catch(function (error) {
      console.log(error.response);
      _response[2] = error.response;
    });
}
function addDinnerRecord(dinner_record, kidNum) {
  dinner_record.sleep_recordId =
    _response[0].data.id || dinner_record.sleep_recordId;
  dinner_record.kidId = userInfo.kids[kidNum].id || dinner_record.kidId;
  dinner_record.userId = userInfo.id || dinner_record.userId;
  dinner_record.record_date ||= getMonthDate();
  dinner_record.modified_time = getDatetime();
  dinner_record.created_at = getDatetime();
  axios
    .post(`${url}/600/dinner_records`, dinner_record, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log(response);
      _response[3] = response;
    })
    .catch(function (error) {
      console.log(error.response);
      _response[3] = error.response;
    });
}

async function addContactUs(
  contactInfo = {
    email: "123@mail.com",
    name: "史努比",
    phone: "0912345678",
    gender: "female",
    content: "小孩要怎麼長大?",
  },
) {
  contactInfo.created_at = getDatetime();
  try {
    const response = await axios
    .post(`${url}/contact_us`, contactInfo);
    console.log(response);
    return _response = response;
  } catch (error) {
    console.log(error.response);
    _response = error.response;
    throw error;
  }
}
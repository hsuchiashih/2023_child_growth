function updatePassword(
  updateInfo = {
    password: "wda@123",
  },
) {
    return new Promise((resolve, reject) => {
      updateInfo.id = userInfo.id.toString();
      updateInfo.modified_time = getDatetime();
      axios
      .patch(`${url}/600/users/${userInfo.id.toString()}`, updateInfo, {
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

function updateMemberInfo(updateInfo = {}) {
    return new Promise((resolve, reject) => {
      updateInfo.modified_time = getDatetime();
      axios
      .patch(`${url}/600/users/${userInfo.id.toString()}`, updateInfo, {
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

function updateKidInfo(updateInfo = {}, kidNum = 0) {
    return new Promise((resolve, reject) => {
      updateInfo.modified_time = getDatetime();
      axios
      .patch(
        `${url}/600/kids/${userInfo.kids[kidNum].id.toString()}`,
        updateInfo,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        )
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

function deleteKid(kidNum = 0) {
    return new Promise((resolve, reject) => {
      updateInfo = { isExist: "N" };
      updateInfo.modified_time = getDatetime();
      axios
      .patch(
        `${url}/600/kids/${userInfo.kids[kidNum].id.toString()}`,
        updateInfo,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        )
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
async function updateDailyRecord(
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
  console.log('updateDailyRecord');
  await updateSleepRecord(daily_record.sleep_record, kidNum);
  updateBreakfastRecord(daily_record.breakfast_record, kidNum);
  updateLunchRecord(daily_record.lunch_record, kidNum);
  updateDinnerRecord(daily_record.dinner_record, kidNum);
}
async function updateSleepRecord(sleep_record, kidNum=0) {
  sleep_record.sleep_hours = countSleepHours(
    sleep_record.wakeup_time,
    sleep_record.sleep_time,
  );
  sleep_record.modified_time = getDatetime();
  sleepRecordId = _response[0].data.id|| _response.data[0].id;
  try {
    const response = await axios.patch(
      `${url}/600/sleep_records/${sleepRecordId}`,
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
    throw error; // 抛出错误以便处理错误情况
  }
}
function updateBreakfastRecord(breakfast_record, kidNum) {
  breakfast_record.modified_time = getDatetime();
  breakfastRecordId = _response[1].data.id || _response.data[0].breakfast_records[0].id;
  axios
    .patch(`${url}/600/breakfast_records/${breakfastRecordId}`, breakfast_record, {
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
function updateLunchRecord(lunch_record, kidNum) {
  lunch_record.modified_time = getDatetime();
  lunchRecordId = _response[2].data.id || _response.data[0].lunch_records[0].id;
  axios
    .patch(`${url}/600/lunch_records/${lunchRecordId}`, lunch_record, {
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
function updateDinnerRecord(dinner_record, kidNum) {
  dinner_record.modified_time = getDatetime();
  dinnerRecordId = _response[3].data.id || _response.data[0].dinner_records[0].id;
  axios
    .patch(`${url}/600/dinner_records/${dinnerRecordId}`, dinner_record, {
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
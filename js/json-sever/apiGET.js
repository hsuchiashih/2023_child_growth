
function apiGET(route = "/kids/1") {
  axios
    .get(`${url}${route}`)
    .then(function (response) {
      console.log(response);
      _response = response;
    })
    .catch(function (error) {
      console.log(error.response);
      _response = error.response;
    });
}

function getUserInfo(userId) {
  // login();
    return new Promise((resolve, reject) => {
      let id =userInfo.id || userId;
      axios
      .get(`${url}/600/users/${id.toString()}?_embed=kids`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        userInfo = response.data;
        _response = response;
        delete _response.data.password;
        localStorage.setItem('userData',JSON.stringify(_response.data));
        console.log(_response);
        resolve(response);
      })
      .catch(function (error) {
        console.log(error.response);
        _response = error.response;
        reject(error.response);
      });
  })
}
function getRecentSleepTime(token,userInfo,kidNum) {
  // login();
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/600/sleep_records?kidId=${userInfo.kids[
          kidNum
        ].id.toString()}&userId=${userInfo.id.toString()}&_sort=record_date&_order=desc&_limit=7`,
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
function getSleepTimeByMonth(kidNum, year = 0, month = 0) {
  // login();
  console.log(userInfo)
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/600/sleep_records?kidId=${userInfo.kids[
          kidNum
        ].id.toString()}&record_date_gte=${getMonthDate(
          "firstDay",
          year,
          month,
        )}&record_date_lte=${getMonthDate(
          "lastDay",
          year,
          month,
        )}&_sort=record_date&_order=asc`,
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
function getFoodRecordsByMonth(kidNum, year = 0, month = 0) {
    return new Promise((resolve, reject) => {
      axios.get(
        `${url}/600/sleep_records?kidId=${userInfo.kids[
          kidNum
        ].id.toString()}&_sort=record_date&_order=asc&record_date_gte=${getMonthDate(
          "firstDay",
          year,
          month,
          )}&record_date_lte=${getMonthDate(
            "lastDay",
            year,
            month,
            )}&_embed=breakfast_records&_embed=lunch_records&_embed=dinner_records`,
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
function getMonthlyRecords(kidNum,num = 1) {
    return new Promise((resolve, reject) => {
      axios
      .get(
        `${url}/600/monthly_records?kidId=${userInfo.kids[
          kidNum
        ].id.toString()}&_sort=create_at&_order=desc&_limit=${num}`,
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

function getMonthlyRecordByMonth(kidNum,month) {

    return new Promise((resolve, reject) => {
      axios
      .get(
        `${url}/600/monthly_records?kidId=${userInfo.kids[
          kidNum
        ].id.toString()}&record_month=${month}`,
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
function getDailyRecords(kidNum,date = getMonthDate()) {
  return new Promise((resolve, reject) => {
    axios
    .get(
      `${url}/600/sleep_records?kidId=${userInfo.kids[
        kidNum
      ].id.toString()}&record_date=${date}&_embed=breakfast_records&_embed=lunch_records&_embed=dinner_records&_sort=modified_time&_order=desc&_limit=1`,
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


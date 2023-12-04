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

function getUserInfo(userId ='1') {
  // login();
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
    })
    .catch(function (error) {
      console.log(error.response);
      _response = error.response;
    });
}
function getRecentSleepTime(kidNum = 0) {
  // login();
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
    })
    .catch(function (error) {
      console.log(error.response);
      _response = error.response;
    });
}
function getSleepTimeByMonth(kidNum = 0, year = 0, month = 0) {
  // login();

  console.log(`${url}/600/sleep_records?kidId=${userInfo.kids[
        kidNum
      ].id.toString()}&record_date_gte=${getMonthDate(
        "firstDay",
        year,
        month,
      )}&record_date_lte=${getMonthDate(
        "lastDay",
        year,
        month,
      )}&_sort=record_date&_order=asc`);
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
      return _response;
    })
    .catch(function (error) {
      console.log(error.response);
      _response = error.response;
      return _response;
    });
}
function getFoodRecordsByMonth(kidNum = 0, year = 0, month = 0) {
  // login();
  return axios
    .get(
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
      return _response
    })
    .catch(function (error) {
      console.log(error.response);
      _response = error.response;
      return _response
    });
}
function getCurrentMonthlyRecord(num = 1, kidNum = 0) {
  // login();
  axios
    .get(
      `${url}/600/monthly_records?kidId=${userInfo.kids[
        kidNum
      ].id.toString()}&_sort=record_month&_order=desc&_limit=${num}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    )
    .then(function (response) {
      console.log(response);
      _response = response;
    })
    .catch(function (error) {
      console.log(error.response);
      _response = error.response;
    });
}
function getWholeMonthlyRecords(num = 36, kidNum = 0) {
  // login();
  return axios
    .get(
      `${url}/600/monthly_records?kidId=${userInfo.kids[
        kidNum
      ].id.toString()}&_sort=record_month&_order=desc&_limit=${num}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    )
    .then(function (response) {
      console.log(response);
      _response = response;
      return _response
    })
    .catch(function (error) {
      console.log(error.response);
      _response = error.response;
      return _response
    });
}
function getDailyRecords(date = getMonthDate(), kidNum = 0) {
  if(!userInfo.kids){
    alert('使用者無兒童');
    return window.location.href = "./member.html" 
  }
    
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
    })
    .catch(function (error) {
      console.log(error.response);
      _response = error.response;
    });
}


function updatePassword(updateInfo={
  password:"wda@123"
}){
  updateInfo.id = userInfo.id.toString();
  updateInfo.modified_time = getDatetime();
  axios.patch(`${url}/600/users/${userInfo.id.toString()}`,updateInfo,{
    headers:{
      "authorization":`Bearer ${token}`
    }
  })
  .then(function (response){
    console.log(response);
    _response = response;
  })
  .catch(function (error){
    console.log(error.response);
    _response = error.response;
  })
}

function updateMemberInfo(updateInfo={}){
  updateInfo.modified_time = getDatetime();
  axios.patch(`${url}/600/users/${userInfo.id.toString()}`,updateInfo,{
    headers:{
      "authorization":`Bearer ${token}`
    }
  })
  .then(function (response){
    console.log(response);
    _response = response;
  })
  .catch(function (error){
    console.log(error.response);
    _response = error.response;
  })
}

function updateKidInfo(updateInfo={},kidNum=0){
  updateInfo.modified_time = getDatetime();
  axios.patch(`${url}/600/kids/${userInfo.kids[kidNum].id.toString()}`,updateInfo,{
    headers:{
      "authorization":`Bearer ${token}`
    }
  })
  .then(function (response){
    console.log(response);
    _response = response;
  })
  .catch(function (error){
    console.log(error.response);
    _response = error.response;
  })
}


function deleteKid(kidNum=0){
  updateInfo = {isExist : 'N'};
  updateInfo.modified_time = getDatetime();
  axios.patch(`${url}/600/kids/${userInfo.kids[kidNum].id.toString()}`,updateInfo,{
    headers:{
      "authorization":`Bearer ${token}`
    }
  })
  .then(function (response){
    console.log(response);
    _response = response;
  })
  .catch(function (error){
    console.log(error.response);
    _response = error.response;
  })
}


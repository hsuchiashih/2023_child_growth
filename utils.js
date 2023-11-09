const url = 'https://cgwweb.onrender.com';
// const url = 'http://localhost:3000';

let token = '';
// let signupInfo =     {
//       email: "pikachu@mail.com",
//       username: "皮卡丘",
//       password: "wda@123",
//       gender: "female",
//       user_birth: "2023-09-13",
//       user_avatar: "userURL",
//       created_at: getDatetime(),
//       "isExist": "Y"
//     }
// let loginInfo =     {
//       email: "pikachu@mail.com",
//       password: "wda@123",
//     }
// let updateInfo = {
//       id: "",
//       password: "wda@123",
//     }


// let data;
let userInfo;
// let kidsList;
// let recentSleepTime;
// let sleepTimeByMonth;
// let foodRecordsByMonth;
// let monthlyRecords;
// let testData;
// let signupData;
// let addKidData;
let _response;

function getDatetime(){
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function generateDailyObjArr(
    id = 1,
    kidId = 1,
    userId = 1,
  ){
  let dailyRecordArr=[];
  let breakfastRecordArr=[];
  let lunchRecordArr=[];
  let dinnerRecordArr=[];
  let dailyRecord={
      "id": id,
      "kidId": kidId,
      "userId": userId,
      "record_date": "",
      "wakeup_time": "",
      "sleep_time": "",
      "sleep_hours":"",
      "create_at": ""    
  };
  let breakfastRecord={
      "id": id,
      "kidId": kidId,
      "userId": userId,
      "daily_recordId": 1,
      "record_date": "",
      "content": "",
      "noBreadMilk": "",
      "noDessert":"",
      "create_at": ""    
  };
  let lunchRecord={
      "id": 1,
      "kidId": kidId,
      "userId": userId,
      "daily_recordId": 1,
      "record_date": "",
      "content": "",
      "noBreadMilk": "",
      "noDessert":"",
      "create_at": ""    
  };
  let dinnerRecord={
      "id": id,
      "kidId": kidId,
      "userId": userId,
      "daily_recordId": 1,
      "record_date": "",
      "content": "",
      "noBreadMilk": "",
      "noDessert":"",
      "create_at": ""    
  };

  // console.log(randomTime);
  const dateRange = generateDateRange("2023-09-24", "2023-11-15");
  // console.log(dateRange);
  for (let Index = 0; Index < dateRange.length; Index++) {
    // 生成随机时间
    const wakeup_time = generateRandomTime(7,10);
    const sleep_time = generateRandomTime(20,23);
    dailyRecord={
      "id": Index+id,
      "kidId": kidId,
      "userId": userId,
      "record_date": dateRange[Index],
      "wakeup_time": wakeup_time,
      "sleep_time": sleep_time,
      "sleep_hours":countSleepHours(sleep_time,wakeup_time),
      "create_at": `${dateRange[Index]} ${sleep_time}`
    };
    dailyRecordArr.push(dailyRecord);
    

    const breakfastOptions = [
      "燕麥片、葡萄",
      "吐司、柳橙汁",
      "漢堡、可樂",
      "煎蛋、牛奶",
      "玉米蛋餅、豆漿",
      "酸奶、水果沙拉",
      "三明治、冰淇淋",
      "牛奶、鳳梨酥",
      "火腿三明治、鮮奶",
      "燕麥粥、蘋果汁",
      "煎餃、紅茶",
      "法式吐司、柳橙汁",
      "鬆餅、楓糖漿",
      "培根蛋餅、咖啡",
      "水煮蛋、牛奶",
      "豆腐腸粉、豆漿",
      "沙拉、果汁",
      "魚排、綠茶",
      "炒麵、奶茶",
      "烤土司、咖啡"
    ];
    breakfastRecord={
      "id": Index+id,
      "daily_recordId": Index+id,
      "kidId": kidId,
      "userId": userId,
      "record_date": dateRange[id],
      "content": breakfastOptions[Math.floor(Math.random()*breakfastOptions.length)] ,
      "noBreadMilk": Math.random() < 0.5 ?"Y":"N",
      "noDessert": Math.random() < 0.5 ?"Y":"N",
      "create_at": `${dateRange[id]} ${sleep_time}`
    };
    breakfastRecordArr.push(breakfastRecord);

    const lunchOptions = [
      "牛肉麵",
      "炸雞飯",
      "麻辣燙",
      "素食沙拉",
      "三明治",
      "壽司",
      "炒麵",
      "烤肉",
      "薯條漢堡",
      "披薩",
      "鮭魚飯",
      "酸辣湯",
      "牛排",
      "咖哩飯",
      "餛飩湯",
      "墨西哥捲餅",
      "沙威瑪",
      "麵包盒餐",
      "炸魚薯條",
      "綠咖哩飯"
    ];
    lunchRecord={
      "id": Index+id,
      "daily_recordId": Index+id,
      "kidId": kidId,
      "userId": userId,
      "record_date": dateRange[Index],
      "content": lunchOptions[Math.floor(Math.random()*lunchOptions.length)] ,
      "noBreadMilk": Math.random() < 0.5 ?"Y":"N",
      "noDessert": Math.random() < 0.5 ?"Y":"N",
      "create_at": `${dateRange[Index]} ${sleep_time}`
    };
    lunchRecordArr.push(lunchRecord);

    const dinnerOptions = [
      "炒麵",
      "紅燒肉",
      "麻辣火鍋",
      "沙拉配牛排",
      "意大利面",
      "壽司",
      "燒烤",
      "炸雞",
      "比薩",
      "鮭魚餐",
      "冬瓜湯",
      "素食大餐",
      "烤魚",
      "咖哩飯",
      "湯圓湯",
      "墨西哥卷餅",
      "熱狗漢堡",
      "泰式炒飯",
      "麵包盒餐",
      "鰻魚飯"
    ];
    dinnerRecord={
      "id": Index+id,
      "daily_recordId": Index+id,
      "kidId": kidId,
      "userId": userId,
      "record_date": dateRange[Index],
      "content": dinnerOptions[Math.floor(Math.random()*dinnerOptions.length)] ,
      "noBreadMilk": Math.random() < 0.5 ?"Y":"N",
      "noDessert": Math.random() < 0.5 ?"Y":"N",
      "create_at": `${dateRange[Index]} ${sleep_time}`
    };
    dinnerRecordArr.push(dinnerRecord);
  }




  console.log(dailyRecordArr);
  console.log(breakfastRecordArr);
  console.log(lunchRecordArr);
  console.log(dinnerRecordArr);
  

  function generateRandomTime(startHour,endHour) {

    // 随机生成小时，介于 startHour 到 endHour 之间
    const randomHour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;

    // 随机生成分钟，要么是 00，要么是 30
    const randomMinute = Math.random() < 0.5 ? 0 : 30;

    // 格式化小时和分钟为字符串
    const formattedHour = String(randomHour).padStart(2, '0');
    const formattedMinute = String(randomMinute).padStart(2, '0');

    // 返回格式为 "HH:mm" 的时间字符串
    return `${formattedHour}:${formattedMinute}`;
  }

  
  function generateDateRange(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const dateList = [];
    const currentDate = new Date(startDate);
    const stopDate = new Date(endDate);

    while (currentDate <= stopDate) {
      dateList.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateList;
  }
}

  function getMonthDate(str,year=0,month=0){
    // 创建当前日期的 Date 对象
    const currentDate = (year==0&month==0)?new Date():new Date(year,month-1,1);
    // 加上 8 小时以调整时区
    currentDate.setHours(currentDate.getHours() + 8);
    // 获取当前月份的年份和月份
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // 获取本月的第一天（1 号）
    const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);
    // 加上 8 小时以调整时区
    firstDayOfCurrentMonth.setHours(firstDayOfCurrentMonth.getHours() + 8);
    // console.log(firstDayOfCurrentMonth);
    // 获取下个月的第一天（为了计算本月的最后一天）
    const nextMonth = currentMonth + 1;
    const nextMonthYear = currentYear + (nextMonth > 11 ? 1 : 0);
    const firstDayOfNextMonth = new Date(nextMonthYear, nextMonth % 12, 1);
    // 加上 8 小时以调整时区
    firstDayOfNextMonth.setHours(firstDayOfNextMonth.getHours() + 8);
    // 计算本月的最后一天（上个月的最后一天）
    const lastDayOfCurrentMonth = new Date(firstDayOfNextMonth - 1);
    // 加上 8 小时以调整时区
    lastDayOfCurrentMonth.setHours(lastDayOfCurrentMonth.getHours() + 8);
    // 格式化日期为 "YYYY-MM-DD" 形式
    const formattedFirstDay = firstDayOfCurrentMonth.toISOString().split('T')[0];
    const formattedLastDay = lastDayOfCurrentMonth.toISOString().split('T')[0];
    if(str=='firstDay')
      return formattedFirstDay
    if(str=='lastDay')
      return formattedLastDay

    return currentDate.toISOString().split('T')[0];
  }
    function countSleepHours(startTime,endTime){
    // 将时间字符串转换为日期对象
    if(endTime < startTime){
      let startDate = new Date(`2023-09-24 ${startTime}`);
      let endDate = new Date(`2023-09-25 ${endTime}`);
      // 计算第一天的时间长度（20:00 到 00:00）
      const firstDayPart = new Date(`2023-09-24 24:00`) - startDate;

      // 计算第二天的时间长度（00:00 到 07:00）
      const secondDayPart = endDate - new Date(`2023-09-25 00:00`);

      // 将两部分时间长度相加
      const totalDuration = firstDayPart + secondDayPart;
      
      // console.log(totalDuration / 3600000); // 将结果转换为小时
      return totalDuration / 3600000;
    }else{
      let startDate = new Date(`2023-09-25 ${startTime}`);
      let endDate = new Date(`2023-09-25 ${endTime}`);
      const totalDuration = endDate - startDate;
      // console.log(totalDuration / 3600000); // 将结果转换为小时
      return totalDuration / 3600000;
    }
  }
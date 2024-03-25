
// const priceForm = document.querySelector('#priceForm');
// const maxPriceInput = document.querySelector('#maxPrice');
// const maxOutput = document.querySelector('#maxOutput');

// maxPriceInput.addEventListener('input', function () {
//   maxOutput.textContent = '\\' + maxPriceInput.value;
// });

// priceForm.addEventListener('click', function (e) {
//   e.preventDefault();
//   const maxPrice = maxPriceInput.value;
//   alert(`최대 금액: ${maxPrice}원으로 검색합니다.`);
// });


// const decreaseBtn = document.querySelector('#decreaseBtn');
// const increaseBtn = document.querySelector('#increaseBtn');
// const personCount = document.querySelector('#personCount');

// let count = 1;

// decreaseBtn.addEventListener('click', () => {
//   if (count > 1) {
//     count--;
//     updateCount();
//   }
// });

// increaseBtn.addEventListener('click', () => {
//   count++;
//   updateCount();
// });

// function updateCount() {
//   personCount.textContent = count;
// }






// -------------------------------- 유저 관리 method --------------------------------
// 로그인 메소드 => 2_login.html
function signIn(userID, userPW) {

  let Users = getLocalStorage(1);
  let result = 0;

  for (let i = 0; i < Users.length; i++) {
    // 계정 상태 비활성화 여부 체크
    if (Users[i].User_status == "N") {
      result = 3;
      break;
    }

    if (userID == Users[i].User_id && userPW == Users[i].User_pw) {

      if (Users[i].User_id == "admin" && Users[i].User_pw == "admin") {
        result = 2;
        break;
      }
      let loginUserData = Users[i];
      SetLocalStorageLoginUserData(loginUserData); // localStorage 에 로그인된 계정 정보 별도 저장 
      result = 1;
      break;
    }

    // 로그인 실패
    if (i == Users.length - 1) {
      result = 0;
      break;
    }
  }
  return result;
}

// 회원가입 메소드 => 3_signup.html
function SignUp(newUser) {
  let Users = getLocalStorage(1);
  for (let i = 0; i < Users.length; i++) { // Users 의 0번째 idx 에 있는 Users 정보에 접근

    let isDuple = false;
    for (let k = 0; k < Users.length - i; k++) {

      // 회원가입 실패(중복되는 계정 내용)
      if (newUser.User_id == Users[k].User_id) {
        isDuple = true;
        alert("이미 존재하는 계정입니다.");
        return; // 중복 데이터를 확인했으니 뒷내용은 볼 필요없으므로 for문 종료
      }
    }

    if (!isDuple) {
      // 회원가입 성공
      Users.push(newUser);
      // let data = { "Users": Users }; // TRaM 의 key값으로 Users 에 넣어야함 -> 중간에 key값 Users 가 상실돼서 .length error 가 계속 났던 것
      SetLocalStorageNewUserData(Users);
      alert("회원가입 성공!");
      window.history.back();
      return;
    }
  }
}

// 로그인된 계정 정보
function getLoginAccount() {
  let data = JSON.parse(localStorage.getItem("loginUser"));
  if (data != null) {
    // TODO 홈페이지 제작완료되면 로그인된 정보 노출 안되게 처리
    console.log(`로그인된 정보\n[ ID : ${data.User_id} ]\n[ PW : ${data.User_pw} ]`)
    return data;
  }
}

// 로그인된 계정 정보를 localStorage 에 별도 저장
// TODO : reservation, payment 등 추후 변경 가능성 있음
function SetLocalStorageLoginUserData(newData) {
  localStorage.setItem("loginUser", JSON.stringify(newData));
  console.log(`TRaM 에 추가된 로그인된 계정 정보(loginUser)\n ID : ${JSON.parse(localStorage.getItem("loginUser")).User_id}, PW : ${JSON.parse(localStorage.getItem("loginUser")).User_pw}`);
}

// 새로운 회원정보 localStorage 에 추가
function SetLocalStorageNewUserData(newUser) {
  let data = { "Users": newUser }; // TRaM 의 key값으로 Users 에 넣어야함 -> 중간에 key값 Users 가 상실돼서 .length error 가 계속 났던 것
  localStorage.setItem("TRaM", JSON.stringify(data));
  console.log(`User Data 업데이트 : ${localStorage.getItem("TRaM")}`);
}

// 로그아웃 시 Object 의 로그인된 유저 정보인 loginUser 삭제
function LogOut() {
  localStorage.removeItem("loginUser");
}

function LoginAndOut(login) {
  login.addEventListener("click", function () {
    if (localStorage.getItem("loginUser")) {
      LogOut();
      alert("로그아웃이 완료되었습니다.");
      window.location.reload(true); // 현재 페이지 새로고침, ture : 캐시 무시하고 작동
    } else {
      window.open("2_login.html", "_self");
    }
  });
}


// -------------------------------- wishList data 관리 --------------------------------
// // TODO 찜된 상품 정보만 가져오기
// function favoriteProducts() {
//   let products = getLocalStorage(2);
// }



// -------------------------------- product data 관리 --------------------------------
// 검색된 상품들 중 '예약하기' 선택된 상품의 모든 정보를 localStorage 에 추가
function SetLocalStorageCheckedProduct(checkedProduct) {
  let data = { "product": checkedProduct }; // TRaM 의 key값으로 Users 에 넣어야함 -> 중간에 key값 Users 가 상실돼서 .length error 가 계속 났던 것
  localStorage.setItem("TRaM", JSON.stringify(data));
  console.log(`선택된 상품 Data 업데이트 : ${localStorage.getItem("TRaM")}`);
}




// -------------------------------- localStorage data 관리 --------------------------------
// TODO : reservation, payment 등 추후 변경 가능성 있음
// parameter 를 1, 2, 3 중에서 하나 입력 받으면
// Users, Reservation, Payment 중 하나의 JSON 가져옴
function getLocalStorage(select) {
  let getData = "";        // return 할 data

  if (select == 1) {       // Users JSON 가져오기
    getData = JSON.parse(localStorage.getItem("TRaM")).Users;

  } else if (select == 2) { // Reservation JSON 가져오기
    getData = JSON.parse(localStorage.getItem("TRaM")).Reservation;

  } else if (select == 3) { // Payment JSON 가져오기
    getData = JSON.parse(localStorage.getItem("TRaM")).Payment;

  } else {                  // select 가 숫자 1, 2, 3 이외 값을 받았을때 예외 처리
    alert("올바른 매개변수 값을 입력하세요.");
  }
  return getData;
}


// 로그인 계정 정보 저장하는 것과
// 새롭게 저장하는 계정 정보 구분하기


// 검색 화면에서 사용자가 선택한 상품의 정보 가져오기
function getSelectedProductInfo() {
  let data = JSON.parse(localStorage.getItem("ProductInfo"));
  console.log(`선택된 상품 정보\n | ID : ${data.id}\n | 상품명 : ${data.title}\n | 해쉬태그 : ${data.hashtags}\n | 주소 : ${data.address}\n | 지역명 : ${data.miniaddr} \n | 전화번호 : ${data.tel}\n | 찜 여부 : ${data.favorite}\n | 이미지 : ${data.img}`)
  return data;
}

// 찜 data를 localStorage 에 업데이트
function updateFavorite(favoriteData) {
  let arr = [favoriteData];
  localStorage.setItem("FavoriteList", JSON.stringify(arr));
  console.log(`찜 목록 상태 : ${JSON.parse(localStorage.getItem("FavoriteList"))[0].favorite}`)
}
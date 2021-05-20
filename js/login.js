const url = "https://vue3-course-api.hexschool.io/";

const usernameInput =  document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const form = document.querySelector('#form');
const loginBtn = document.querySelector('#login');
loginBtn.addEventListener('click', login);

function login(event) {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const data = {
    username,
    password
  }
  axios.post(`${url}admin/signin`, data) // 發出請求
    .then((res) => {
      if (res.data.success){
        // const token = res.data.token;
        // const expired = res.data.expired;
        const { token, expired } = res.data;
        console.log(token, expired);
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        window.location = 'products.html';
      }
    });
  // 以下為示範程式碼
  // const api = 'http://localhost:3000/admin/signin';
  // const user = {
  //   username: username.value,
  //   password: password.value,
  // }
  // axios.post(api, user).then((response) => {
  //   if(response.data.success){
  //     const { token, expired } = response.data;
  //     // 寫入 cookie token
  //     // expires 設置有效時間
  //     window.location = 'products.html';
  //   } else {
  //     alert(response.data.message);
  //   }
  // }).catch((error) => {
  //   console.log(error);
  // });
}

// form.addEventListener('submit', login) 
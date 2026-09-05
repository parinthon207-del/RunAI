const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

if(registerForm){
  registerForm.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const message = document.getElementById("registerMessage");
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("registerConfirm").value;

    if(password !== confirm){
      message.textContent = "รหัสผ่านไม่ตรงกัน";
      return;
    }

    try{
      const data = await apiRequest("/auth/register", {
        method:"POST",
        body:JSON.stringify({
          name:document.getElementById("registerName").value,
          email:document.getElementById("registerEmail").value,
          password
        })
      });
      localStorage.setItem("runai_token", data.token);
      window.location.href = "profile.html";
    }catch(error){ message.textContent = error.message; }
  });
}

if(loginForm){
  loginForm.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const message = document.getElementById("loginMessage");
    try{
      const data = await apiRequest("/auth/login", {
        method:"POST",
        body:JSON.stringify({
          email:document.getElementById("loginEmail").value,
          password:document.getElementById("loginPassword").value
        })
      });
      localStorage.setItem("runai_token", data.token);
      window.location.href = "history.html";
    }catch(error){ message.textContent = error.message; }
  });
}
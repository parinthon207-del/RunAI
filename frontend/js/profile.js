const profileForm = document.getElementById("profileForm");
requireLogin();

async function loadProfile(){
  try{
    const data = await apiRequest("/auth/me");
    const user = data.user;
    document.getElementById("profileName").value = user.name || "";
    document.getElementById("profileEmail").value = user.email || "";
    document.getElementById("profileAge").value = user.age || "";
    document.getElementById("profileHeight").value = user.height_cm || "";
    document.getElementById("profileWeight").value = user.weight_kg || "";
  }catch(error){
    document.getElementById("profileMessage").textContent = error.message;
  }
}

profileForm.addEventListener("submit", async (event)=>{
  event.preventDefault();
  const message = document.getElementById("profileMessage");
  try{
    await apiRequest("/auth/me", {
      method:"PUT",
      body:JSON.stringify({
        name:document.getElementById("profileName").value,
        age:Number(document.getElementById("profileAge").value) || null,
        heightCm:Number(document.getElementById("profileHeight").value) || null,
        weightKg:Number(document.getElementById("profileWeight").value) || null
      })
    });
    message.textContent = "บันทึกข้อมูลสำเร็จ";
  }catch(error){ message.textContent = error.message; }
});

loadProfile();
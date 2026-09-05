requireLogin();

const goalForm = document.getElementById("goalForm");

async function loadGoals(){
  const list = document.getElementById("goalList");
  try{
    const data = await apiRequest("/goals");
    if(!data.goals.length){
      list.innerHTML = '<p class="muted">ยังไม่มีเป้าหมาย</p>';
      return;
    }
    list.innerHTML = data.goals.map(goal => `
      <div class="simple-item">
        <strong>${escapeHtml(goal.goal_type)}</strong>
        <span>ระยะทาง: ${goal.target_distance_km ?? "-"} กม. • วันที่: ${goal.target_date ?? "-"}</span>
      </div>
    `).join("");
  }catch(error){ list.innerHTML = `<p class="muted">${error.message}</p>`; }
}

goalForm.addEventListener("submit", async (event)=>{
  event.preventDefault();
  const message = document.getElementById("goalMessage");
  try{
    await apiRequest("/goals", {
      method:"POST",
      body:JSON.stringify({
        goalType:document.getElementById("goalType").value,
        targetDistanceKm:Number(document.getElementById("goalDistance").value) || null,
        targetDate:document.getElementById("goalDate").value || null
      })
    });
    message.textContent = "บันทึกเป้าหมายสำเร็จ";
    goalForm.reset();
    loadGoals();
  }catch(error){ message.textContent = error.message; }
});

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}
loadGoals();
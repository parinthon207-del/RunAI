requireLogin();

const runForm = document.getElementById("runForm");
document.getElementById("runDate").value = new Date().toISOString().slice(0,10);

runForm.addEventListener("submit", async (event)=>{
  event.preventDefault();
  const message = document.getElementById("runMessage");

  const distance = Number(document.getElementById("runDistance").value);
  const minutes = Number(document.getElementById("runMinutes").value);
  const seconds = Number(document.getElementById("runSeconds").value);
  const durationSeconds = (minutes * 60) + seconds;

  if(distance <= 0 || durationSeconds <= 0){
    message.textContent = "กรุณาระบุระยะทางและเวลาที่มากกว่า 0";
    return;
  }

  const pace = (durationSeconds / 60) / distance;

  try{
    await apiRequest("/runs", {
      method:"POST",
      body:JSON.stringify({
        distanceKm:distance,
        durationSeconds,
        pace:Number(pace.toFixed(2)),
        runDate:document.getElementById("runDate").value,
        note:document.getElementById("runNote").value
      })
    });
    message.textContent = "บันทึกการวิ่งสำเร็จ";
    runForm.reset();
    document.getElementById("runDate").value = new Date().toISOString().slice(0,10);
  }catch(error){ message.textContent = error.message; }
});
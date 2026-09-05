requireLogin();

async function loadHistory(){
  const list = document.getElementById("historyList");
  try{
    const summary = await apiRequest("/history/summary");
    const s = summary.summary;

    document.getElementById("totalRuns").textContent = s.total_runs || 0;
    document.getElementById("totalDistance").textContent = Number(s.total_distance_km || 0).toFixed(1);
    document.getElementById("totalTime").textContent = Math.round(Number(s.total_duration_seconds || 0) / 60);
    document.getElementById("averageDistance").textContent = Number(s.average_distance_km || 0).toFixed(1);

    if(!summary.recentRuns.length){
      list.innerHTML = '<p class="muted">ยังไม่มีประวัติการวิ่ง</p>';
      return;
    }

    list.innerHTML = summary.recentRuns.map(run => `
      <div class="run-item">
        <strong>${Number(run.distance_km).toFixed(2)} กม.</strong>
        <small>${run.run_date} • เวลา ${formatDuration(run.duration_seconds)} • Pace ${run.pace ?? "-"} นาที/กม.</small>
      </div>
    `).join("");
  }catch(error){ list.innerHTML = `<p class="muted">${error.message}</p>`; }
}

function formatDuration(totalSeconds){
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2,"0")}`;
}

loadHistory();
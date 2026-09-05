async function loadHomeSummary(){
  const token = getToken();
  if(!token) return;

  try{
    const data = await apiRequest("/history/summary");
    document.getElementById("homeRuns").textContent = data.summary.total_runs || 0;
    document.getElementById("homeDistance").textContent = Number(data.summary.total_distance_km || 0).toFixed(1);
    document.getElementById("homeAverage").textContent = Number(data.summary.average_distance_km || 0).toFixed(1);
  }catch(error){
    console.log(error.message);
  }
}

loadHomeSummary();
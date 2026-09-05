const API_BASE_URL = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("runai_token");
}

async function apiRequest(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "เกิดข้อผิดพลาด");
  }

  return data;
}

function requireLogin() {
  if (!getToken()) {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("runai_token");
  window.location.href = "login.html";
}

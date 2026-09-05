# RunAI Web — Sprint 1

ชุด Frontend HTML/CSS/JavaScript ที่ทำขึ้นให้สอดคล้องกับ README ของโปรเจกต์ใน Sprint 1

## 4 ฟีเจอร์หลัก

- US-01 บัญชีและข้อมูลผู้ใช้งาน
- US-02 เป้าหมายการวิ่ง
- US-03 บันทึกประวัติการวิ่ง
- US-04 ดูประวัติและพัฒนาการ

ยังไม่รวม AI Training Plan, Quest และ Strava ตามขอบเขต Sprint 1

## การเชื่อม Backend

Frontend ตั้งค่า Backend API ไว้ที่:

http://localhost:5000/api

ดังนั้นให้เปิด Backend ก่อน:

```bash
cd backend
npm install
npm run dev
```

จากนั้นเปิดเว็บไซต์ผ่าน VS Code Live Server หรือ web server อื่น

> ไม่ควรเปิด HTML ด้วย file:// โดยตรง เพราะ browser อาจบล็อก request ไปยัง API

ถ้า Backend ใช้ port อื่น ให้แก้ค่า `API_BASE_URL` ใน `js/api.js`

## โครงสร้าง

```text
run-ai/
├── index.html
├── login.html
├── register.html
├── profile.html
├── goal.html
├── run.html
├── history.html
├── css/
│   └── style.css
├── js/
│   ├── api.js
│   ├── auth.js
│   ├── profile.js
│   ├── goal.js
│   ├── run.js
│   ├── history.js
│   └── main.js
└── README.md
```

## หมายเหตุ

Frontend นี้ออกแบบให้เป็น Sprint 1 และเชื่อมกับ API ที่มี endpoint:
- `/api/auth`
- `/api/goals`
- `/api/runs`
- `/api/history/summary`

ควรตรวจ `skill.md`, `REQ.md` และ `RunAI_DB.sql` ตัวจริงของทีมก่อน merge เข้าสาขาหลัก

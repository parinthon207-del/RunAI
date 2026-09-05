# RunAI Backend — Sprint 1

อ้างอิงจาก `README.md` ที่กำหนดให้ Sprint 1 มี 4 เรื่องหลัก:

1. US-01 บัญชีและข้อมูลผู้ใช้งาน
2. US-02 เป้าหมายการวิ่ง
3. US-03 บันทึกประวัติการวิ่ง
4. US-04 ดูประวัติและพัฒนาการ

Backend นี้ตั้งใจทำเฉพาะข้อมูลที่จำเป็นต่อ Sprint 1 และ **ยังไม่ทำ AI Training Plan / Quest** ซึ่ง README ระบุว่าเป็นงานสำหรับ Sprint ถัดไป

## Stack

- Node.js
- Express
- MySQL 8.x
- JWT สำหรับ session
- bcrypt สำหรับ hash password

## โครงสร้าง

```text
backend/
├── database/
│   └── sprint1.sql
├── src/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/auth.js
│   ├── routes/
│   └── server.js
├── .env.example
├── .gitignore
└── package.json
```

## ติดตั้ง

```bash
npm install
```

คัดลอก `.env.example` เป็น `.env` แล้วใส่ค่า MySQL

```bash
npm run dev
```

API จะอยู่ที่ `http://localhost:5000`

## API

### Auth / US-01

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/auth/me`

API ที่ต้องล็อกอินให้ส่ง:

```text
Authorization: Bearer <token>
```

### Goal / US-02

- `GET /api/goals`
- `POST /api/goals`

### Run / US-03

- `GET /api/runs`
- `POST /api/runs`

### History / US-04

- `GET /api/history/summary`

## ตัวอย่าง Register

```json
{
  "name": "Demo Runner",
  "email": "demo@example.com",
  "password": "123456"
}
```

## ตัวอย่าง Profile

```json
{
  "name": "Demo Runner",
  "age": 20,
  "heightCm": 170,
  "weightKg": 60
}
```

## ตัวอย่าง Goal

```json
{
  "goalType": "วิ่งเพื่อสุขภาพ",
  "targetDistanceKm": 5,
  "targetDate": "2026-12-31"
}
```

## ตัวอย่าง Run

```json
{
  "distanceKm": 5.24,
  "durationSeconds": 2058,
  "pace": 6.55,
  "runDate": "2026-09-05",
  "note": "วิ่งตอนเช้า"
}
```

## หมายเหตุสำคัญ

ในไฟล์ที่ได้รับตอนนี้มี `README.md` แต่ยังไม่มี `skill.md`, `REQ.md`, Proposal หรือ `RunAI_DB.sql` ตัวจริง ดังนั้น `database/sprint1.sql` ในชุดนี้เป็น **schema ขั้นต้นสำหรับ Sprint 1** ไม่ใช่การยืนยันว่าเป็น schema เดิมของทีม

ก่อน merge เข้าสาขาหลัก ควรเทียบกับ `skill.md`, `REQ.md` และ `coding/backend/database/RunAI_DB.sql` ของทีมก่อน

ยังไม่มี endpoint สำหรับ AI, Training Plan, Quest, Strava หรือการปรับแผนอัตโนมัติ เพราะทั้งหมดอยู่นอกขอบเขต Sprint 1 ตาม README ที่ได้รับ

const express = require('express');
const {
    getMassages,
    getMassage,
    createMassage,
    updateMassage,
    deleteMassage
} = require('../controllers/massages');

// ถ้าคุณมีระบบ Login และแบ่ง Role (ดูจากรูปคุณมีไฟล์ middleware/auth.js)
// สามารถนำเข้ามาใช้ป้องกัน Route ได้ตามนี้ครับ
const { protect, authorize } = require('../middleware/auth');

// สร้าง Router
const router = express.Router();

// การตั้งค่า Routes
router
    .route('/')
    .get(getMassages) // ดึงข้อมูลทั้งหมด (Public: ใครก็ดูได้)
    .post(protect, authorize('admin'), createMassage); // สร้างร้านใหม่ (Private: ต้องล็อกอิน และเป็น Admin เท่านั้น)

router
    .route('/:id')
    .get(getMassage) // ดึงข้อมูลร้านเดียว (Public)
    .put(protect, authorize('admin'), updateMassage) // แก้ไขข้อมูล (Private: Admin)
    .delete(protect, authorize('admin'), deleteMassage); // ลบข้อมูล (Private: Admin)

module.exports = router;
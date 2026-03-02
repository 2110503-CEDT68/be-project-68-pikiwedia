const express = require('express');
const { getMassages, getMassage, createMassage, updateMassage, deleteMassage } = require('../controllers/massages');

const router = express.Router({ mergeParams: true });

// auth middleware
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getMassages).post(protect, authorize('admin'), createMassage);
router.route('/:id').get(getMassage).put(protect, authorize('admin'), updateMassage).delete(protect, authorize('admin'), deleteMassage);

module.exports = router;
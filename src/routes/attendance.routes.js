const express = require('express');
const router = express.Router();
const { createPresensi, updatePresensi, getPresensiByAnak } = require('../controllers/presensi.controller');
const { protect, isGuruOrAdmin } = require('../middlewares/authMiddleware');

// Rute yang bisa diakses semua user yang login
router.get('/anak/:anakId', protect, getPresensiByAnak);

// Rute yang hanya bisa diakses oleh Guru atau Admin
router.post('/', protect, isGuruOrAdmin, createPresensi);
router.put('/:id', protect, isGuruOrAdmin, updatePresensi);

module.exports = router;
const Presensi = require('../models/Presensi');
const Child = require('../models/Child');

// Guru & Admin: Membuat catatan presensi baru (check-in)
exports.createPresensi = async (req, res) => {
    const { anakId, tanggal, status, checkIn } = req.body;
    try {
        const presensi = new Presensi({
            anak: anakId,
            tanggal,
            status,
            checkIn: status === 'hadir' ? checkIn : null,
            guru: req.user.id // Guru yang login
        });
        await presensi.save();
        res.status(201).json(presensi);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Guru & Admin: Update presensi (misal untuk check-out)
exports.updatePresensi = async (req, res) => {
    try {
        const presensi = await Presensi.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!presensi) return res.status(404).json({ message: 'Data presensi tidak ditemukan' });
        res.json(presensi);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Semua Role: Melihat presensi berdasarkan ID anak
exports.getPresensiByAnak = async (req, res) => {
    try {
        const presensi = await Presensi.find({ anak: req.params.anakId }).populate('guru', 'nama');
        res.json(presensi);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
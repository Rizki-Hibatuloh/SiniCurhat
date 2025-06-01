const express = require('express');
const router = express.Router();
const {
  getAllJournals,
  getJournalById,
  createJournal,
  updateJournal,
  deleteJournal,
  curhatAi
} = require('../controller/JournalController.js');


router.get('/', getAllJournals);
router.get('/:id', getJournalById);
router.post('/', createJournal);
router.put('/:id', updateJournal);
router.delete('/:id', deleteJournal);
router.post('/curhat', curhatAi);

module.exports = router;

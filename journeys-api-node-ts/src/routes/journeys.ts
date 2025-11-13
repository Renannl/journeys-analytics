import { Router } from 'express';
import { getAllJourneys } from '../services/journeyService';

const router = Router();

router.get('/', async (_req, res) => {
try {
const journeys = await getAllJourneys();
res.json(journeys);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to process journeys' });
}
});

export default router;
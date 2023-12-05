import { Router } from "express";

//Init router
const router = Router();

router.get('', async (req, res) => {
    res.send('Hello World!');
});

export default router;
export const saveNewSchedule = async (req, res, next) => {
    try {
        const { title, periodStart, periodEnd, isActive } = req.body;

        if (!title || !periodStart || !periodEnd || !isActive) {
            return res.status(400).json({ error: "Missing required fields" });
        }
    } catch {

    }
}
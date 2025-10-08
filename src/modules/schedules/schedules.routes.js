import express from 'express';
import * as ctrl from './schedules.controllers.js';

const router = express.Router();

/**
 * Schedules & Blocks Routes
 * --------------------------------
 */

// POST /schedules - create new schedule
router.post('/', ctrl.saveNewSchedule);

// GET /schedules - get list of schedules (optionally ?since, ?limit, ?cursor)
router.get('/', ctrl.getSchedules);

// GET /schedules/:id - get full schedule by id
router.get('/:id', ctrl.getScheduleById);

// PUT /schedules/:id - update schedule (metadata or bulk replace blocks)
router.put('/:id', ctrl.updateSchedule);

// DELETE /schedules/:id - soft delete schedule
router.delete('/:id', ctrl.deleteSchedule);

// POST /schedules/:id/blocks - add one or more blocks to a schedule
router.post('/:id/blocks', ctrl.addBlocks);

// PUT /schedules/:id/blocks/:blockId - update a specific block
router.put('/:id/blocks/:blockId', ctrl.updateBlock);

// DELETE /schedules/:id/blocks/:blockId - soft delete a specific block
router.delete('/:id/blocks/:blockId', ctrl.deleteBlock);

// POST /schedules/:id/ops - apply diff ops (add/update/delete multiple blocks)
router.post('/:id/ops', ctrl.applyOps);

export default router;
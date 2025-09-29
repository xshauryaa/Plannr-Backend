import * as ctrl from './schedules.controllers.js';

/**
 * Schedules & Blocks
 * --------------------------------
 * POST   /schedules                         → save new schedule
 */
app.post(" /schedules", ctrl.saveNewSchedule);

/**
 * GET    /schedules                         → get list of schedules (optionally ?since, ?limit, ?cursor)
 */

/** 
 * GET    /schedules/:id                     → get full schedule by id
 */

/**
 * PUT    /schedules/:id                     → update schedule (metadata or bulk replace blocks)
 */

/**
 * DELETE /schedules/:id                     → soft delete schedule
 */

/**
 * POST   /schedules/:id/blocks              → add one or more blocks to a schedule
 */

/**
 * PUT    /schedules/:id/blocks/:blockId     → update a specific block
 */

/**
 * DELETE /schedules/:id/blocks/:blockId     → soft delete a specific block
 */

/**
 * POST   /schedules/:id/ops                 → apply diff ops (add/update/delete multiple blocks)
 */
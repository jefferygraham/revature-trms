import Express from 'express';

import {
  getClaims,
  getClaim,
  deleteClaim,
  postClaim,
  updateClaim,
} from '../controllers/claims';

const router = Express.Router();

router.get('/', getClaims);

router.get('/:id', getClaim);

router.delete('/:id', deleteClaim);

router.post('/', postClaim);

router.patch('/:id', updateClaim);

export default router;

import { Response, Request, NextFunction } from 'express';
import logger from '../log';
import claimService from '../services/claim';

const getClaims = (req: Request, res: Response, next: NextFunction) => {
  claimService.getClaims().then((claims) => {
    res.send(JSON.stringify(claims));
  });
};

const getClaim = (req: Request, res: Response, next: NextFunction) => {
  claimService.getClaim(req.params.id).then((claim) => {
    res.send(JSON.stringify(claim));
  });
};

const deleteClaim = (req: Request, res: Response, next: NextFunction) => {
  logger.debug(req.body);
  claimService
    .deleteClaim(req.params.id)
    .then((data) => {
      logger.debug(data);
      res.sendStatus(200); // Created
    })
    .catch((err) => {
      logger.error(err);
      res.sendStatus(500); // Server error, sorry
    });
};

const postClaim = (req: Request, res: Response, next: NextFunction) => {
  logger.debug(req.body);
  claimService
    .addClaim(req.body)
    .then((data) => {
      logger.debug(data);
      res.sendStatus(201); // Created
    })
    .catch((err) => {
      logger.error(err);
      res.sendStatus(500); // Server error, sorry
    });
};

const updateClaim = (req: Request, res: Response, next: NextFunction) => {
  logger.debug(req.body);
  claimService
    .updateClaim(req.body)
    .then((data) => {
      logger.debug(data);
      res.sendStatus(201); // Created
    })
    .catch((err) => {
      logger.error(err);
      res.sendStatus(500); // Server error, sorry
    });
};

export { getClaims, getClaim, postClaim, deleteClaim, updateClaim };

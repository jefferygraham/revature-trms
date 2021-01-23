import {
  FetchClaimsAction,
  AddClaimAction,
  DeleteClaimAction,
  UpdateClaimAction,
} from './claims';

export enum ClaimActionTypes {
  fetchClaims = 'FETCH_CLAIMS',
  addClaim = 'ADD_CLAIM',
  deleteClaim = 'DELETE_CLAIM',
  updateClaim = 'UPDATE_CLAIM',
}

export type ClaimsAction =
  | FetchClaimsAction
  | AddClaimAction
  | DeleteClaimAction
  | UpdateClaimAction;

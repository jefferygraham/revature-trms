import { ClaimsAction, ClaimActionTypes } from '../actions/claimsTypes';
import { Claim } from '../models/claim';

export const claimsReducer = (state: Claim[] = [], action: ClaimsAction) => {
  switch (action.type) {
    case ClaimActionTypes.fetchClaims:
      return action.payload;
    case ClaimActionTypes.addClaim:
      return [...state, action.payload];
    case ClaimActionTypes.deleteClaim:
      return state.filter((claim: Claim) => claim.claimId !== action.payload);
    case ClaimActionTypes.updateClaim:
      const idx = state.findIndex(
        (claim: Claim) => claim.claimId === action.payload.claimId
      );
      return [...state.slice(0, idx), action.payload, ...state.slice(idx + 1)];
    default:
      return state;
  }
};

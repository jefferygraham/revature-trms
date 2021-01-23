import axios from 'axios';
import { Dispatch } from 'redux';

import { Claim } from '../models/claim';
import { ClaimActionTypes } from './claimsTypes';

export interface FetchClaimsAction {
  type: ClaimActionTypes.fetchClaims;
  payload: Claim[];
}

export interface AddClaimAction {
  type: ClaimActionTypes.addClaim;
  payload: Claim;
}

export interface DeleteClaimAction {
  type: ClaimActionTypes.deleteClaim;
  payload: string;
}

export interface UpdateClaimAction {
  type: ClaimActionTypes.updateClaim;
  payload: Claim;
}

const uri = `${process.env.REACT_APP_SERVER_URI}/claims`;

export const fetchClaims = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Claim[]>(uri);

    dispatch<FetchClaimsAction>({
      type: ClaimActionTypes.fetchClaims,
      payload: response.data,
    });
  };
};

export const addClaim = (claim: Claim) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.post<Claim>(uri, claim, {
      withCredentials: true,
    });

    dispatch<AddClaimAction>({
      type: ClaimActionTypes.addClaim,
      payload: response.data,
    });
  };
};

export const deleteClaim = (claimId: string) => {
  return async (dispatch: Dispatch) => {
    await axios.delete<Claim>(`${uri}/${claimId}`, {
      withCredentials: true,
    });

    dispatch<DeleteClaimAction>({
      type: ClaimActionTypes.deleteClaim,
      payload: claimId,
    });
  };
};

export const updateClaim = (claim: Claim) => {
  return async (dispatch: Dispatch) => {
    await axios.patch<Claim>(`${uri}/${claim.claimId}`, claim, {
      withCredentials: true,
    });

    dispatch<UpdateClaimAction>({
      type: ClaimActionTypes.updateClaim,
      payload: claim,
    });
  };
};

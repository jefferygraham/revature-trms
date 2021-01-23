import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { StoreState } from '../reducers';
import { User } from '../models/user';
import { getUser } from '../actions/authedUser';
import { LoginComponent } from './Login';
import { ClaimsListComponent } from './ClaimsList';
import { ReviewClaimsComponent } from './ReviewClaimList';
import { ViewClaimPageComponent } from './ViewClaimPage';
import { EditClaimPageComponent } from './EditClaimPage';
import { HomeComponent } from './Home';
import { NewClaimComponent } from './NewClaim';

interface AppProps {
  authedUser: User;
  getUser: Function;
}

const _App = (props: AppProps) => {
  return (
    <Router>
      <Route
        path='/'
        exact
        render={() =>
          props.authedUser.username ? <HomeComponent /> : <LoginComponent />
        }
      />
      <Route exact path='/applications' component={ClaimsListComponent} />
      <Route
        exact
        path='/applications/review'
        component={ReviewClaimsComponent}
      />
      <Route
        exact
        path='/applications/:claimId/view'
        component={ViewClaimPageComponent}
      />
      <Route
        exact
        path='/applications/:claimId/edit'
        component={EditClaimPageComponent}
      />
      <Route exact path='/applications/new' component={NewClaimComponent} />
    </Router>
  );
};

const mapStateToProps = ({ authedUser }: StoreState): { authedUser: User } => {
  return {
    authedUser,
  };
};

export const App = connect(mapStateToProps, {
  getUser,
})(_App);

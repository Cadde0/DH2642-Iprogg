// teamsPresenter.jsx
import React from 'react';
import TeamsView from '../views/teamsView';
import { observer } from 'mobx-react-lite';

// Observer
export default observer(function Teams(props) {
  const { model } = props;

  // Check if the teams promise is pending
  if (model.promiseState && model.promiseState.promise && !model.promiseState.data && !model.promiseState.error) {
    // Render a loading image or text while the promise is pending
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />
  }

  // Once the promise is resolved, render the TeamsView with the teamLogos
  return <TeamsView teams={model.teams} />;
});

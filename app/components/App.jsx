import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import LaneActions from '../actions/LaneActions';
import Lanes from './Lanes';

const App = ({LaneActions, lanes}) => {
  const addLane = () => {
    LaneActions.create({
      id: uuid.v4(),
      name: 'New Lane'
    });
  };

  return (
    <div>
      <button className="add-lane" onClick={addLane}>+</button>
      <Lanes lanes={lanes} />
    </div>
  );
}

export default connect(({lanes}) => ({
  lanes
}), {
  LaneActions
})(App);

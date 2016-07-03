import React from 'react';
import Lane from './Lane';

export default ({lanes}) => (
  <div className="lanes">{lanes.map(lane =>
    <Lane className="lane" id={lane.id} lane={lane} />
  )}</div>
);

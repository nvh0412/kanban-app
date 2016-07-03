import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';

const Lane = (({lane, notes, NoteAtions, ...props}) => {
  const addNote = (e) => {
    e.stopPropagation();

    const noteId = uuid.v4()

    NoteActions.create({
      id: noteId,
      task: 'New Task'
    });
    LaneActions.attachToLane({laneId: lane.id, noteId});
  }

  const deleteNote = (noteId, e) => {
    //Avoid bubbling to edit
    e.stopPropagation();
    NoteActions.delete(noteId);
    LaneActions.detachFromLane({laneID: lane.id , noteId});
  }

  const activateNoteEdit = (id) => {
    NoteActions.update({id, editing: true});
  }

  const editNote = (id, task) => {
    NoteActions.update({id, editing: false, task});
  }

  return (
    <div {...props}>
      <div className="lane-header">
        <div className="lane-add-note">
          <button className="add-note" onClick={ addNote }>+</button>
        </div>
        <div className="lane-name">{lane.name}</div>
      </div>
      <div>

        <Notes
          notes={selectNotesByIds(notes, lane.notes)}
          onDelete={deleteNote}
          onNoteClick={activateNoteEdit}
          onEdit={editNote}
        />
      </div>
    </div>
  );
});

function selectNotesByIds(allNotes, noteIds = []) {
  return noteIds.reduce((notes, id) =>
    notes.concat(
      allNotes.filter(note => note.id === id)
    )
  , []);
}

export default connect(({notes}) => (
  {notes}
), {
  NoteActions,
  LaneActions
})(Lane);

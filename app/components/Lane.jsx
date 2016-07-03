import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import LaneHeader from './LaneHeader';

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
      <LaneHeader lane={lane}/>
      <Notes
        notes={selectNotesByIds(notes, lane.notes)}
        onDelete={deleteNote}
        onNoteClick={activateNoteEdit}
        onEdit={editNote}
      />
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

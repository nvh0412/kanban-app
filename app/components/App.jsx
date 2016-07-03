import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {notes} = this.props;

    return (
      <div>
        <button className="add-note" onClick={ this.addNote }>+</button>
        <Notes
          notes={notes}
          onDelete={this.deleteNote}
          onNoteClick={this.activateNoteEdit}
          onEdit={this.editNote}
        />
      </div>
    )
  }

  addNote = () => {
    this.props.NoteActions.create({
      id: uuid.v4(),
      task: 'New Task'
    });
  }

  deleteNote = (id, e) => {
    //Avoid bubbling to edit
    e.stopPropagation();
    this.props.NoteActions.delete(id);
  }

  activateNoteEdit = (id) => {

    this.props.NoteActions.update({id, editing: true});
  }

  editNote = (id, task) => {
    this.props.NoteActions.update({id, editing: false, task});
  }
}

export default connect(({notes}) => ({
  notes
}), {
  NoteActions
})(App)

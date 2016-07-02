import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn React'
        }, {
          id: uuid.v4(),
           task: 'Do laundry'
        }
      ]
    }
  }

  render() {
    const {notes} = this.state;

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
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        editing: false,
        task: 'New Task'
      }])
    });
  }

  deleteNote = (id, e) => {
    //Avoid bubbling to edit
    e.stopPropagation();

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }

  activateNoteEdit = (id) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if (note.id === id) {
          note.editing = true;
        }

        return note;
      })
    });
  }

  editNote = (id, task) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if (note.id === id) {
          note.editing = false;
          note.task = task;
        }

        return note;
      })
    });
  }
}

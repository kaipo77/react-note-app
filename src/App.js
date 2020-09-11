import React from 'react';
//import logo from './logo.svg';
import './App.css';
import SidebarComponents from './sidebar/sidebar';
import EditorComponents from './editor/editor';
import SidebarItemComponents from './sidebaritem/sidebaritem';

const firebase = require('firebase');

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      selectedNoteIndex : null,
      selectedNote : null,
      notes : null
    }
  }
  render(){
    return(
    <div className= 'app-container'>
      <SidebarComponents 
      selectedNoteIndex={this.state.selectedNoteIndex} 
      notes ={this.state.notes} 
      deleteNote = {this.deleteNote}
      selectNote = {this.selectNote}
      newNote = {this.newNote}>
      </SidebarComponents>
      {
        this.state.selectedNote ?
        <EditorComponents selectedNote={this.state.selectedNote}
        selectedNoteIndex = {this.state.selectedNoteIndex}
        notes={this.state.notes}
        noteUpdate={this.noteUpdate}></EditorComponents> :
        null
      }
    </div>);
  }

  componentDidMount = () => {
    firebase.firestore().collection('notes').onSnapshot(serverUpdate => {
      const notes = serverUpdate.docs.map(_doc =>{
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      console.log(notes);
      this.setState({ notes : notes});
    });
  }

  selectNote =(note, index) => this.setState({
    selectedNoteIndex : index, 
    selectedNote : note
  });

  noteUpdate = (id, noteObj) => {
    firebase.firestore().collection('notes').doc(id).update({
      title : noteObj.title,
      body : noteObj.body,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  newNote = async (title) => {
    const note = {
      title : title,
      body : ''
    }
    const newFromDB = await firebase.firestore().collection('notes').add({
      title : note.title,
      body : note.body,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    });
    const newId = newFromDB.id;
    await this.setState({
      notes : [...this.state.notes, note]
    });

    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newId)[0]);
    this.setState({ selectedNote : this.state.notes[newNoteIndex], selectedNoteIndex : newNoteIndex});
  }

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    if(this.state.selectedNoteIndex === noteIndex){
      this.setState({ selectedNoteIndex : null, selectedNote : null });
    }
    else{
      if(this.state.notes.length > 1)
      {
      //this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1); 
      this.setState({ selectedNoteIndex : this.state.selectedNoteIndex,
      selectedNote : this.state.selectedNote});
    } 
      else
      this.setState({ selectedNoteIndex : null, selectedNote : null });
    }

    firebase.firestore().collection('notes').doc(note.id).delete();
    await this.setState({ notes : this.state.notes.filter(_note => _note !== note) });
    
  }

}

export default App;

import React,{useContext, useState} from 'react';
import NoteContext from '../context/notes/noteContext';



const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote} = context;

    const [note, setNote] = useState({title: "",description: "", tag: ""});

    const handleClick = (e)=>{
      // e.preventDefault();
      addNote(note.title, note.description, note.tag)
      props.showAlert("Note Added", "success")

    }

    const onchange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <h1>Add a Note</h1>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            TITLE
          </label>
          <input
            type="text"
            className="form-control form"
            id="title"
            name='title'
            aria-describedby="emailHelp"
            onChange={onchange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            DESCRIPTION
          </label>
          <input
            type="text"
            className="form-control form"
            id="description"
            name='description'
            aria-describedby="emailHelp"
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            TAG
          </label>
          <input
            type="text"
            className="form-control form"
            id="tag"
            name='tag'
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>
        <button type="submit" disabled={note.description.length<5 || note.description.length<5} onClick={handleClick} className="btn btn-outline-info my-3">
          Add Note +
        </button>
      </form>
    </div>
  )
}

export default AddNote

import React, {useContext} from 'react'
import NoteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
  const context = useContext(NoteContext)
    const {deleteNote} = context;
    const {note , updateNote} = props;
    const handleDelete = ()=>{
      deleteNote(note._id);
      props.showAlert("Note Deleted", "success")
    }
  return (
    <>
    <div className='col-md-3'>
       <div className="card my-4 text-bg-info mb-3" >
        <div className="card-header text-light" >{note.tag}</div>
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <div className="buttons d-flex flex-row-reverse">
            <i className="fa-solid fa-trash-can" onClick={handleDelete}></i>
            <i className ="fa-regular fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Noteitem

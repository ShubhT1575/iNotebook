import React, { useContext, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import NoteContext from "../context/notes/noteContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
      props.showAlert(" Login required", "danger");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    // e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note edited", "success");
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary  d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light text-dark">
              <form className="container">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    TITLE
                  </label>
                  <input
                    type="text"
                    className="form-control form"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onchange}
                    value={note.etitle}
                    minLength={5}
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
                    id="edescription"
                    name="edescription"
                    aria-describedby="emailHelp"
                    onChange={onchange}
                    value={note.edescription}
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
                    id="etag"
                    name="etag"
                    aria-describedby="emailHelp"
                    onChange={onchange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-outline-info"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container">
          {notes.length === 0 && (
            <div className="card text-center">
              <div className="card-header">Add Some Notes</div>
              <div className="card-body">
                <h5 className="card-title">
                  My Database has nothing to display here !! 🥲
                </h5>
              </div>
            </div>
          )}
        </div>
        {notes.map((notes) => {
          return (
            <Noteitem
              key={notes._id}
              updateNote={updateNote}
              note={notes}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;

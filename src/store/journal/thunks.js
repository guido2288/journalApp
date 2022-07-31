import { collection, deleteDoc, deleteField, doc, setDoc } from "firebase/firestore/lite";
import { FireBaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote } from "./";
import { deleteNoteById, savingNewNote, setNotes, setSaving, updateNote } from './journalSlice';
import { loadNotes } from "../../helpers";
import { async } from "@firebase/util";

export const startNewNote = () => {

  return async (dispatch, getState) => {

    dispatch(savingNewNote());

    const { uid } = getState().auth; // para grabar en firesbase se utiliza el uid

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FireBaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    // dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  }

};

export const startLoadingNotes = () => {

  return async (dispatch, getState) => {

    const { uid } = getState().auth;

    if (!uid) throw new Error('El UID del usuario no existe');

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes))

  }

};

export const startSaveNote = () => {
  return async (dispatch, getState) => {

    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);

    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));

  }
};


export const startDeletingNote = () => {

  return async (dispatch, getState) => {

    console.log(doc)

    const { uid } = getState().auth;

    const { active: note } = getState().journal;

    const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);

    await deleteDoc(docRef);


    dispatch(deleteNoteById(note.date));

  }

}





import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,  // Boolean para verificar si estoy guardando.
    messageSaved: '',
    notes: [],
    active: null
  },
  reducers: {
    savingNewNote: (state) => {

      state.isSaving = true;

    },
    addNewEmptyNote: (state, action) => {  //acction para crear nueva entrada

      state.notes.push(action.payload);
      state.isSaving = false;

    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';

    },
    setNotes: (state, action) => {

      state.notes = action.payload;

    },
    setSaving: (state) => {

      state.isSaving = true;
      state.messageSaved = '';

    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map(note => {

        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;

      });



      state.messageSaved = `${action.payload.title}, actualizada correctamente`;

    },

    clearNoteLogout: (state) => {

      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;

    },

    deleteNoteById: (state, action) => {

      state.active = null;
      state.notes = state.notes.filter(note => note.date !== action.payload);

      state.messageSaved = `Nota borrada correctamente`

    },

  }

});


// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearNoteLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} = journalSlice.actions;
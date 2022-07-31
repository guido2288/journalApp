import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { setActiveNote, startDeletingNote, startSaveNote } from "../../store/journal"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { doc } from "firebase/firestore/lite";

export const NoteView = () => {

  const dispatch = useDispatch();

  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);

  const { body, title, onInputChange, formState, date } = useForm(note);

  const dateString = useMemo(() => {

    const newDate = new Date(date);
    return newDate.toUTCString();

  }, [date]);

  useEffect(() => {

    dispatch(setActiveNote(formState));

  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    };

  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onDelete = () => {

    Swal.fire({
      title: 'Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Nota eliminada!',
        )
        dispatch(startDeletingNote())
      }
    })
  };


  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >

      <Grid item>

        <Typography fontSize={39} fontWeight="light" >{dateString}</Typography>

      </Grid>

      <Grid item>


        <Button
          disabled={isSaving}
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
        >

          <SaveOutlined xs={{ fontSize: 30, mr: 2 }} />
          Guardar

        </Button>

      </Grid>

      <Grid container>

        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          sx={{ mb: 2 }}
          fullWidth
          multiline
          placeholder="Qué sucedió en el día de hoy?"
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />

      </Grid>

      <Grid container justifyContent="end">

        <Button
          onClick={onDelete}
          sx={{ mt: 2 }}
          color="error"
        >
          <DeleteOutline />
          Borrar
        </Button>


      </Grid>


    </Grid>
  )
}

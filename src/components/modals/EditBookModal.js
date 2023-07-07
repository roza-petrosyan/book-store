import {
    Button, Dialog,
    DialogActions, DialogContent,
    DialogTitle, Grid, IconButton, TextField
} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import { useReducer, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../styles/EditBookModal.css'

function booksReducer(state, action) {
    switch (action.type) {
      case 'name': {
        return {
          ...state,
          name: action.payload,
        };
      }
      case 'description': {
        return {
          ...state,
          description: action.payload,
        };
      }
      case 'price': {
        return {
          ...state,
          price: action.payload,
        };
      }
      case 'discount': {
        return {
          ...state,
          discount: action.payload,
        };
      }
      case 'photo': {
        return {
          ...state,
          photo: action.payload,
        };
      }
      default:
        return state;
    }
  }

export default function EditBookModal({ open, setOpen, books, setBooks, editedBook}) {
    const [state, dispatch] = useReducer(booksReducer, 
        {
            name: editedBook.name,
            description: editedBook.description,
            price: editedBook.price,
            discount: editedBook.discount,
            photo: editedBook.photo,
        });
    const { name, description, price, discount, photo } = state;

    const [replace, setReplace] = useState(false);

    const handleClose = () => {
        setOpen(false)
        dispatch({ 
            type: 'name',
            payload: '', 
        })
        dispatch({ 
            type: 'description',
            payload: '', 
        })
        dispatch({ 
            type: 'price',
            payload: 0, 
        })
        dispatch({ 
            type: 'discount',
            payload: 0, 
        })

    };

    const handleName = (evt) => {
        dispatch({ 
            type: 'name',
            payload: evt.currentTarget.value, 
        })
    }
    const handleDescription = (evt) => {
        dispatch({ 
            type: 'description',
            payload: evt.currentTarget.value
         })
    }
    const handlePrice = (evt) => {
        dispatch({ 
            type: 'price',
            payload: evt.currentTarget.value, 
         })
    }

    const handleDiscount = (evt) => {
        dispatch({ 
            type: 'discount',
            payload: evt.currentTarget.value
         })
    }

    const uploader = (file) => {
        if (file.length !== 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                localStorage.setItem(file.name, reader.result)
            });
            reader.readAsDataURL(file);
        }
    }

    const handlePhoto = (file) => {
        if (file.length !== 0) {
            uploader(file[0])
            dispatch({ 
                type: 'photo',
                payload: file[0].name
            })
        }
    };

    const handlePhotoReplace = () => {
        return setReplace(true);
    }

    const handlePhotoRemove = (evt) => {
        dispatch({ 
            type: 'photo',
            payload: ''
        })
        handlePhotoReplace();

    }

    const handleSave = (evt) => {
        evt.preventDefault();
        
        let data = { name, description, price, discount, photo };
        fetch('http://localhost:8000/books/' + editedBook.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                const newBook = books.map(book => {
                    if (book.id === data.id) {
                        return {
                            ...book,
                            name: data.name,
                            description: data.description,
                            price: data.price,
                            discount: data.discount,
                            photo: data.photo
                        };
                    }
                    return book;
                });

                setBooks(newBook);
            })

        handleClose();
    }


    return (
        <Dialog
            role="dialog"
            fullWidth
            maxWidth="md"
            open={open}
            onClose={handleClose}
            aria-labelledby="dialog-title-edit"
            aria-describedby="dialog-description-edit"
        >
            <DialogTitle style={{ cursor: 'move', textAlign: "center", fontFamily: "'Playfair Display', serif"}} id="dialog-title-edit">
                <Grid container>
                    <Grid item xs={10}>
                        Edit Book
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton aria-label="close" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers id="dialog-description-edit">
                <Grid container sx={{ padding: "15px" }}>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="editName"
                            label="Name"
                            sx={{ width: "100%", paddingBottom: "10px" }}
                            value={name}
                            onChange={handleName}
                            type="text"
                            helperText={name.length > 200 ? "Name is too long" : ""}
                            error={name.length > 200}
                        />
                        <TextField
                            required
                            id="editDesc"
                            label="Description"
                            multiline
                            rows={5}
                            sx={{ width: "100%", paddingBottom: "10px" }}
                            value={description}
                            onChange={handleDescription}
                            type="text"
                            helperText={description.length > 400 ? "Description is too long" : ""}
                            error={description.length > 400}
                        />
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="editPrice"
                                    label="Price"
                                    sx={{ paddingRight: "10px" }}
                                    value={price}
                                    onChange={handlePrice}
                                    type="number"
                                    helperText={price < 0 ? "Price can not be less than 0" : ""}
                                    error={price < 0}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="editDiscount"
                                    label="Discount"
                                    value={discount}
                                    onChange={handleDiscount}
                                    type="number"
                                    helperText={discount < 0 || discount > 100 ? "Discount can not be less than 0 and more than 100" : ""}
                                    error={discount < 0 || discount > 100}
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={6} sx={{ paddingLeft: "100px" }}>
                        <Grid container item>
                            { !replace
                                ? <img src={localStorage.getItem(editedBook.photo)} alt="editPhoto" style={{ width: "250px", height: "280px" }} />
                                
                                :<DropzoneArea
                                    acceptedFiles={['image/*']}
                                    showPreviews={false}
                                    showPreviewsInDropzone={true}
                                    maxFileSize={5000000}
                                    onChange={handlePhoto}
                                    onClose={handleClose}
                                    dropzoneText="CLICK HERE OR DRAG AND DROP TO UPLOAD THE IMAGE"
                                    filesLimit={1}
                                    className={styles.dropZone}
                                    />
                             }
                        </Grid>
                        <Grid container item sx={{paddingTop: "10px"}}>
                            <Grid item xs={6} >
                                <Button onClick={handlePhotoRemove} 
                                disabled={replace}
                                sx={{ color: "white", backgroundColor: "#C34A2C", ":hover": {
                                        bgcolor: "beige",
                                        color: "black",
                                    }
                                }}>
                                    REMOVE
                                </Button>

                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={handlePhotoReplace} sx={{ color: "black", backgroundColor: "white" }}>
                                    REPLACE
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container >
                    <Grid item xs={6} sx={{ textAlign: "center"}}>
                        <Button autoFocus onClick={handleClose} sx={{ color: "black" }}>
                            CANCEL
                        </Button>

                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "center", backgroundColor: "#f0f0d0", paddingRight: "15px"}}>
                        <Button onClick={handleSave} sx={{ color: "black" }}
                            disabled={name.length === 0 || description.length === 0 || !price || !photo}>
                            SAVE</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}
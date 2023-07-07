import { 
    Button, Dialog, DialogActions, DialogContent, 
    DialogTitle, Grid, IconButton, TextField
} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../styles/AddBookModal.css';

export default function AddBookModal({ open, setOpen, books, setBooks }) {
    const id = new Date().getTime();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [photo, setPhoto] = useState('');


    const handleClose = () => {
        setOpen(false)
        setName('');
        setDescription('');
        setPrice(0);
        setDiscount(0);
    };

    const handleName = (evt) => {
        setName(evt.target.value);
    }
    const handleDescription = (evt) => {
        setDescription(evt.target.value);
    }
    const handlePrice = (evt) => {
        setPrice(evt.target.value);
    }

    const handleDiscount = (evt) => {
        setDiscount(evt.target.value);
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
            setPhoto(file[0].name);
        }
    };
    const handleSave = (evt) => {
        evt.preventDefault();
        const newList = books.concat({ id, name, description, price, discount, photo });
       
        setBooks(newList);
        let data = { id, name, description, price, discount, photo };
        fetch("http://localhost:8000/books", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        handleClose();
    }


    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={handleClose}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle style={{ cursor: 'move', textAlign: "center", fontFamily: "'Playfair Display', serif"}} id="dialog-title">
                <Grid container>
                    <Grid item xs={10}>
                        Add Book
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton aria-label="close" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers id="dialog-content">
                <Grid container sx={{ padding: "15px" }}>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="name"
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
                            id="desc"
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
                                    id="price"
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
                                    id="discount"
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
                    <Grid item xs={6} sx={{paddingLeft: "80px", paddingRight: "80px"}}>
                        <DropzoneArea
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
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container >
                    <Grid item xs={6} sx={{ textAlign: "center" }}>
                        <Button autoFocus onClick={handleClose} sx={{ color: "black"}}>
                            CANCEL
                        </Button>

                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "center", backgroundColor: "#f0f0d0" }}>
                        <Button onClick={handleSave} sx={{ color: "black", paddingRight: "15px" }}
                            disabled={name.length === 0 || description.length === 0 || !price || !photo}>
                            SAVE</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}
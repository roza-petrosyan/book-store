import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddBookModal from './modals/AddBookModal';
import Books from './Books';



export default function Body() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleSearch = (evt) => {
        setSearchTerm(evt.target.value);
        if (evt.target.value.length > 2) {
            const filteredBooks = books.filter(
                (book) => {
                    return book.name.includes(evt.target.value)
                        || book.description.includes(evt.target.value)
                        // || book.price == evt.target.value
                        // || book.discount == evt.target.value
                }
            );
            setBooks(filteredBooks);
        }
        if(evt.target.value === '') {
            fetch("http://localhost:8000/books")
            .then(res => {
                return res.json();
            })
            .then(data => {
                setBooks(data)
            });
        }
    }

    return (
        <Grid container sx={{ padding: "30px" }}>
            <Grid item xs={10}>
                <TextField
                    id="search"
                    type="search"
                    label="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ width: 600 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={2}>
                <Button onClick={handleOpen} style={{ color: "black", backgroundColor: "#f0f0d1", width: "160px", marginTop: "10px", fontFamily: "'Playfair Display', serif" }}>Add Book</Button>
                <AddBookModal id="add-book" open={open} setOpen={setOpen} books={books} setBooks={setBooks} />
            </Grid>
            <Grid item xs={12}>
                <Books books={books} setBooks={setBooks} />
            </Grid>
        </Grid>

    );
}
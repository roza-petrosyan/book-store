import { Card, CardHeader, CardMedia, CardContent, Grid, Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';
import EditBookModal from './modals/EditBookModal';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';


export default function BookList({ books, setBooks }) {
    const [open, setOpen] = useState(false);
    const [editedBook, setEditedBook] = useState({});

    const navigate = useNavigate();
    function handleOpenEdit(book) {
        setOpen(true);
        setEditedBook(book);
    };

    function handleRemove(id) {
        fetch('http://localhost:8000/books/' + id, {
            method: 'DELETE',
        })
            .then(data => {
                const newBooks = books.filter(
                    (book) => book.id !== id
                );
                setBooks(newBooks);
            });
    }

    function handleViewBook(book) {
        navigate({
            pathname: "/view-book",
            search: createSearchParams({
                name: book.name,
                description: book.description,
                price: book.price,
                discount: book.discount,
                photo: book.photo
            }).toString()
        })
    }

    return (
        <Grid container sx={{ paddingTop: "20px" }}>
            {
                books.map((book) => {
                    return (
                        <Grid item xs={3} key={book.id} sx={{ width: "100%", marginBottom: "15px" }}>
                            <Card sx={{ maxWidth: "250px", width: "250px", padding: "10px" }}>
                                <CardHeader
                                    avatar={
                                        book.discount > 0 ?
                                            <Avatar sx={{ bgcolor: red[500], width: "65px", height: "30px", borderRadius: "28%" }} aria-label="recipe">
                                                <div >-{book.discount} % </div>
                                            </Avatar>
                                            : null
                                    }
                                    action={
                                        <div>
                                            <IconButton aria-label="edit" onClick={() => handleOpenEdit(book)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="close" onClick={() => handleRemove(book.id)}>
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                    }
                                />
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={localStorage.getItem(book.photo)}
                                    sx={{ objectFit: "contain", cursor: "pointer" }}
                                    onClick={() => handleViewBook(book)}
                                />
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={8}>
                                            <div color="text.secondary">
                                                {book.name}
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div color="black">
                                                {book.discount > 0 ?
                                                    <div>
                                                        <div style={{ textDecoration: "line-through", textDecorationColor: "red" }}>{book.price} $</div>
                                                        <div style={{ color: "red", display: "inline-block" }}>{book.price - (book.price * book.discount) / 100} $</div>
                                                    </div>
                                                    : <div>
                                                        <div>{book.price} $</div>
                                                        <div style={{ display: "inline-block" }}></div>
                                                    </div>}
                                            </div>
                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })
            }
            {open && editedBook !== {} ? <EditBookModal open={open} setOpen={setOpen} books={books} setBooks={setBooks} editedBook={editedBook} /> : ''}
        </Grid>
    )
}
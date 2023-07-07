import { useEffect } from "react"
import BookList from "./BookList";

export default function Books({ books, setBooks }) {
    useEffect(() => {
        fetch("http://localhost:8000/books")
            .then(res => {
                return res.json();
            })
            .then(data => {
                setBooks(data)
            });
    }, [])
    return (
        <div>
            {books && <BookList books={books} setBooks={setBooks} title="All books" />}
        </div>
    )
}
import { getAllBookByAuthor,getAllAuthorIncludeBook ,createAuthor} from "../controller/author.js";
import express from "express";
import { createBook } from "../controller/book.js";

const router = express.Router();
router.get('/author',getAllBookByAuthor)
router.post('/createBook',createBook)
router.get('/authorIncludeBook', getAllAuthorIncludeBook);
router.post('/createAuthor', createAuthor);

export default router;
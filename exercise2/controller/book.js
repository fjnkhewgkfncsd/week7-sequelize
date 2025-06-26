import {Author} from '../models/main.js'
const createBook = async (req,res) => {
    const {title, author, publicationYear, page} = req.body;
    try {
        console.log('Creating book with data:', req.body);
        const authorExists = await Author.findOne({
            where : {name : author}
        })
        const result = await authorExists.createBook({
            title,
            authorId : authorExists.authorId,
            publicationYear,
            page
        })
        res.json({
            book : result,
            success : true
        })
    } catch (error) {
        console.error('error in create Book',error)
        res.status(500).json({
            error : 'Internal Server Error'
        })
    }
}


export {createBook};
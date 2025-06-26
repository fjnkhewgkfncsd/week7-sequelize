import {Author,Book} from '../models/main.js'
const getAllBookByAuthor = async (req,res) => {
    const {author} = req.body;
    try {
        const books  = await Author.findAll({
            where : {
                name : author
            },
            include : {
                model : Book
            }
        })
        if(books.length === 0){
            return res.status(404).json({
                message : 'No books found for this author',
                success : false
            })
        }else{
            return res.json({books})
        }
    } catch (error) {
        console.error(error)
    }
}

const getAllAuthorIncludeBook = async (req,res) => {
    try {
        const result = await Author.findAll({
            include : {
                model : Book
            }
        })
        if(result.length === 0){
            return res.status(404).json({
                massage : 'No authors found',
                success : false
            })
        }
        res.json({
            authors : result,
            success : true
        })
    } catch (error) {
        res.status(500).json({
            error : 'Internal Server Error'
        })
    }
}

const createAuthor = async (req,res) => {
    const {name,birthday} = req.body;
    try {
        const author = await Author.create({
            name,
            birthday
        })
        res.json({
            author,
            success : true
        })
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({
            error : 'Internal Server Error'
        })
    }
}
export {getAllBookByAuthor, getAllAuthorIncludeBook,createAuthor};
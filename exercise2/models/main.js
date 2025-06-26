import {Author} from './author.js'
import {Book} from './book.js'

Author.hasMany(Book,{foreignKey: 'authorId'})
Book.belongsTo(Author,{foreignKey: 'authorId'});

export {Author, Book};
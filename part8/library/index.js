require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const authors = require('./data/authors');
const books = require('./data/books');

const { DB_USERNAME, DB_PASSWORD, DB_CLOUD_URI, DB_NAME } = process.env;

const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLOUD_URI}/${DB_NAME}?retryWrites=true&w=majority`;

(async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('connected to MongoDB');

        // clearing up database
        await Author.deleteMany({});
        await Book.deleteMany({});

        // populating database with mock data

        const insertedAuthors = await Author.insertMany(authors);

        const booksWithAuthorId = books.map((book) => {
            return {
                ...book,
                author: insertedAuthors.find((author) => {
                    return author.name === book.author;
                })._id,
            };
        });

        await Book.insertMany(booksWithAuthorId);
    } catch (error) {
        console.log('error connection to MongoDB:', error.message);
    }
})();

const typeDefs = gql`
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }
    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]
        ): Book
        editAuthor(name: String!, born: Int!): Author
    }
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }
`;

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author });

                return Book.find({
                    author: author._id,
                    genres: { $in: args.genre },
                }).populate('author');
            } else if (args.author) {
                const author = await Author.findOne({ name: args.author });

                return Book.find({ author: author._id }).populate('author');
            } else if (args.genre) {
                return Book.find({
                    genres: { $in: args.genre },
                }).populate('author');
            } else {
                return Book.find({}).populate('author');
            }
        },
        allAuthors: async () => {
            const authors = await Author.find({});

            return authors.map(async (author) => {
                const bookCount = await Book.find({
                    author: author._id,
                }).countDocuments();

                return {
                    name: author.name,
                    id: author._id,
                    born: author.born,
                    bookCount,
                };
            });
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            let author = await Author.findOne({ name: args.author });

            if (!author) {
                author = new Author({ name: args.author });

                await author.save();
            }

            const newBook = new Book({ ...args, author: author._id });
            await newBook.save();

            newBook.author = author;

            return newBook;
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name });

            if (author) {
                author.born = args.born;
                await author.save();

                return author;
            }
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

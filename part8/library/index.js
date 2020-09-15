require('dotenv').config();
const {
    ApolloServer,
    UserInputError,
    AuthenticationError,
    gql,
} = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const authors = require('./data/authors');
const books = require('./data/books');
const jwt = require('jsonwebtoken');

const {
    JWT_SECRET,
    DB_USERNAME,
    DB_PASSWORD,
    DB_CLOUD_URI,
    DB_NAME,
} = process.env;

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
        await User.deleteMany({});

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
        me: User
    }
    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]
        ): Book
        editAuthor(name: String!, born: Int!): Author
        createUser(username: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
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
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    type Token {
        value: String!
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
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const { currentUser } = context;

            if (!currentUser) {
                throw new AuthenticationError('not authenticated');
            }

            let author = await Author.findOne({ name: args.author });

            if (!author) {
                try {
                    author = new Author({ name: args.author });

                    await author.save();
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    });
                }
            }

            const newBook = new Book({ ...args, author: author._id });

            try {
                await newBook.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }

            newBook.author = author;

            return newBook;
        },
        editAuthor: async (root, args, context) => {
            const { currentUser } = context;

            if (!currentUser) {
                throw new AuthenticationError('not authenticated');
            }

            const author = await Author.findOne({ name: args.name });

            if (author) {
                author.born = args.born;
                try {
                    await author.save();
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    });
                }

                return author;
            }
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            });

            try {
                await user.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }

            return user;
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== 'secred') {
                throw new UserInputError('wrong credentials');
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, JWT_SECRET) };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;

        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

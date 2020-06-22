const mongoose = require("mongoose");

// mongoose DB connection
const url = process.env.MONGODB_URI;
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then((res) => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });

mongoose.set("useFindAndModify", false);

const PersonSchema = new mongoose.Schema(
    {
        date: { type: Date, default: Date.now },
        name: { type: String, required: true },
        number: { type: String, required: true },
    },
    { collection: "persons" }
);

PersonSchema.set("toJSON", {
    transform: function (doc, obj) {
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
    },
});

const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;

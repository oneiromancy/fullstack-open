const mongoose = require("mongoose");

if (process.argv.length <= 2) {
    console.log(
        "Please provide the password as an argument: node mongo.js <password>"
    );
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://crypto:${password}@cluster0-medqv.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const PersonSchema = new mongoose.Schema(
    {
        date: { type: Date, default: Date.now },
        name: { type: String, required: true },
        number: { type: String, required: true },
    },
    { collection: "persons" }
);

const Person = mongoose.model("Person", PersonSchema);

if (process.argv.length === 3) {
    console.log("phonebook");

    Person.find({}).then((res) => {
        res.forEach((person) => {
            console.log(person.name, person.number);
        });
        mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
    const name = process.argv[3].toString();
    const number = process.argv[4].toString();

    const newPerson = new Person({ name, number });
    newPerson.save().then((res) => {
        console.log("person saved");
        mongoose.connection.close();
    });
}

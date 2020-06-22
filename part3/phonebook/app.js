require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

// parses incoming requests that have JSON payloads
app.use(express.json());

// serves build version of create react app
app.use(express.static("build"));

// HTTP request logger
morgan.token("body", (req, res) => {
    return JSON.stringify(req.body);
});

app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body"
    )
);

app.use(cors());

app.get("/info", (req, res) => {
    Person.find({})
        .countDocuments()
        .then((personsLength) => {
            const phonebookEntriesMsg = `Number of phonebook entries: ${personsLength}`;
            const requestTimeMsg = `Time of request: ${new Date().toUTCString()}`;

            return res.send(`
			<div>
				<p>${phonebookEntriesMsg}</p>
				<p>${requestTimeMsg}</p>
			</div>
		`);
        })
        .catch((error) => next(error));
});

app.get("/api/persons", (req, res) => {
    Person.find({})
        .select("id name number")
        .then((persons) => {
            return res.json({ persons });
        })
        .catch((error) => next(error));

    // When the response is sent in the JSON format, the toJSON method
    // of each object in the array is called automatically by the JSON.stringify method.
});

app.get("/api/persons/:id", (req, res) => {
    const { id } = req.params;

    Person.findById(id)
        .select("id name number")
        .then((person) => {
            if (!person) return res.status(404).end();

            return res.json({ person });
        })
        .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res) => {
    const { number } = req.body;
    const updatedPerson = { number };

    const { id } = req.params;

    Person.findByIdAndUpdate(id, updatedPerson, {
        new: true,
    })
        .select("id name number")
        .then((person) => {
            return res.json({ person });
        })
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
    const { id } = req.params;

    Person.deleteOne({ _id: id })
        .then(() => {
            return res.status(204).end();
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;

    if (!name || !number)
        return res.status(400).json({ error: "Name and/or number is missing" });

    Person.findOne({ name })
        .select("id name number")
        .then((person) => {
            if (person) {
                person.number = number;
                person.save().then((person) => {
                    return res.json({ person });
                });
            } else {
                const newPerson = new Person({ name, number });
                newPerson.save().then((person) => {
                    return res.json({
                        person: {
                            id: person.id,
                            name: person.name,
                            number: person.number,
                        },
                    });
                });
            }
        })
        .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    if (err.name === "CastError" && err.kind == "ObjectId") {
        return res.status(400).send({ error: "malformatted id" });
    }

    next(err);
};

// handler of requests with result to errors
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

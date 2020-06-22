const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

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
    const phonebookEntriesMsg = `Number of phonebook entries: ${db.persons.length}`;
    const requestTimeMsg = `Time of request: ${new Date().toUTCString()}`;

    return res.send(`
		<div>
			<p>${phonebookEntriesMsg}</p>
			<p>${requestTimeMsg}</p>
		</div>
	`);
});

app.get("/api/persons", (req, res) => {
    res.json({ persons: db.persons });
});

app.post("/api/persons", (req, res) => {
    const person = { ...req.body };

    const { isValidPerson, errors } = validatePerson(db, person);

    if (!isValidPerson) return res.status(400).json({ errors });

    let randomId = getRandomInt(1000);

    do {
        personExists = db.persons.find((person) => {
            return person.id == randomId;
        });
        randomId = getRandomInt(1000);
    } while (personExists);

    person.id = randomId;
    db.persons = db.persons.concat(person);

    rewriteDB(db);

    res.json({ person });
});

app.get("/api/persons/:id", (req, res) => {
    const { id } = req.params;

    const person = db.persons.find((person) => {
        return person.id == id;
    });

    if (!person) return res.status(404).end();

    return res.json({
        person: db.persons.find((person) => {
            return person.id == id;
        }),
    });
});

app.put("/api/persons/:id", (req, res) => {
    const body = req.body;
    const { id } = req.params;

    db.persons.map((person) => {
        if (person.id == id) {
            person.number = body.number ? body.number : person.number;
        }

        return person;
    });

    rewriteDB(db);

    res.json({
        person: db.persons.find((person) => {
            return person.id == id;
        }),
    });
});

app.delete("/api/persons/:id", (req, res) => {
    const { id } = req.params;

    db.persons = db.persons.filter((person) => {
        return person.id != id;
    });

    rewriteDB(db);

    return res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Importing DB connection
const db = require("./db/connect");

// Importing Routes:
const authRoutes = require("./routes/auth.routes");
const contactsRoutes = require("./routes/contacts.routes");
const leadsRoutes = require("./routes/leads.routes");
const servicesRequestRoutes = require("./routes/servicesRequest.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();
db(); //Establishing DB connection

app.use(express.json());
app.use(cors());

// Adding Custom Middleware
app.use("/api", authRoutes);
app.use("/api", contactsRoutes);
app.use("/api", leadsRoutes);
app.use("/api", servicesRequestRoutes);
app.use("/api", usersRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to our CRM Application!')
});

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});
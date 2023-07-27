import { app } from "./app.js"; // Import the 'app' instance from app.js

// Import and require mysql2
import mysql from 'mysql2';

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '030119Kent**',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee_tracker database.`)
);

// Query database
db.query('SELECT * FROM employee_tracker', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

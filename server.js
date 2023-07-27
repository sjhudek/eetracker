import { app } from "./app.js"; // Import the 'app' instance from app.js
import { Department, Role, Employee } from "./index.js";
const database = require("./database");
const sequelize = database.sequelize;

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start the server and database connection
async function startServer() {
  try {
    // Sync models with database
    await sequelize.authenticate();
    await sequelize.sync();

    console.log(`Connected to the database.`);

    // Call the function to start the application
    await startApp();

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

// Call the function to start the server
startServer();

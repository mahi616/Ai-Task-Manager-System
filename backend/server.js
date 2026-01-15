const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('./config/db');
// const settingsRoutes = require('./routes/settingsRoutes');


dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: "https://aitaskmanagersystem.vercel.app",
    methods:['GET','POST','PUT','DELETE'],
    credentials: true
}));
app.use(express.json()); // Body parser

// Routes
app.use('/api/tasks', require('./routes/taskRoutes')); // ✅
app.use('/api/auth', require('./routes/authRoutes'));  // ✅
app.use("/api/settings", require('./routes/settingsRoutes'));
app.use("/api/ai", require("./routes/aiRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

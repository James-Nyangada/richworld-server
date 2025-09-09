const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require("./config/dbConnect")
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const radioRoutes = require('./routes/radio')
const consentRoutes = require('./routes/consentRoutes');
const presenterRoutes = require('./routes/presenterRoutes');
const showRoutes = require('./routes/showRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const blogRoutes = require("./routes/blogRoutes")
const packageRoutes = require("./routes/packageRoutes")
const testimonialRoutes = require("./routes/testimonialRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const cors = require('cors');


dbConnect();

const app = express();

// ✅ Enable CORS (allow requests from frontend origin)
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://wowradio.live',
    'https://www.wowradio.live',
    "https://admin.richworldsafaris.com",
    'https://admin.wowradio.live',
  ],// change to actual domain in prod
  credentials: true // if you need cookies/auth headers
}));

//middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Add this before your routes to debug
app.use((req, res, next) => {
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Raw body:', req.body);
    
    // If it's text but should be JSON, try parsing it
    if (req.headers['content-type'] === 'text/plain' && typeof req.body === 'string') {
        try {
            req.body = JSON.parse(req.body);
            console.log('Parsed body:', req.body);
        } catch (e) {
            console.log('Failed to parse as JSON:', e.message);
        }
    }
    next();
});

//routes
app.use("/api/auth", authRoutes);
app.use ("/api/users", userRoutes);
app.use('/api/consents', consentRoutes);
app.use("/api/radio", radioRoutes); // ✅ register the radio routes here
app.use('/api/presenters', presenterRoutes); // ✅ register the presenter routes
app.use('/api/shows', showRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use("/api/blogs", blogRoutes) // ✅ register the blog routes
app.use("/api/packages", packageRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/bookings", bookingRoutes);


// root test route
app.get('/', (req, res) => {
  res.send('API is running');
});


//start server

const PORT = process.env.PORT || 4001;

app.listen(PORT, "0.0.0.0",()=>{
    console.log(`Server is running on port ${PORT}`)
})
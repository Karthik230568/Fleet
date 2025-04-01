require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 15; // Increase max listeners
const app = require('./app');
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please:
        1. Stop any other server using port ${port}, or
        2. Use 'taskkill /F /IM node.exe' to stop all Node processes`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
    }
});
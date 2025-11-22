
const https = require('https');

const data = JSON.stringify({
    service_id: 'service_789y2za',
    template_id: 'bxiutza',
    user_id: 'gLnXTfHh1jRfvZ7cz',
    template_params: {
        name: 'Test',
        email: 'test@test.com',
        message: 'Test'
    }
});

const options = {
    hostname: 'api.emailjs.com',
    path: '/api/v1.0/email/send',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();

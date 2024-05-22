const myLogger = (options = { upperCase: true }) => {
    return (req, res, next) => {
        const { upperCase } = options;
        const timestamp = new Date().toISOString();
        const method = req.method;
        const url = upperCase ? req.url.toUpperCase() : req.url.toLowerCase();
        const ip = req.ip;
        console.log(`[${timestamp}] ${method} ${url} from ${ip}`);
        console.log('Request Body:', req.body);
        console.log('Request Query:', req.query);
        console.log('Request Params:', req.params);
        console.log('Request Headers:', req.headers);
        next();
    };
};

module.exports = myLogger;
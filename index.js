const express = require("express");
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const morgan = require("morgan");

app = express();
const port = 3005;

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const tokens = new Map();

const clearOldTokens = () => {
    const keys = tokens.keys();

    for (let key of keys) {
        const tokenEcxpiration = tokens.get(key);
        if (tokenEcxpiration && tokenEcxpiration < Date.now()) {
            tokens.delete(key);
        }
    }
};

const validateToken = (token) => {
    const tokenExpiration = tokens.get(token);

    if (!tokenExpiration) {
        return false;
    }

    if (tokenExpiration < Date.now()) {
        tokens.delete(token);
        return false;
    }

    return true;
};

const encrypt = (message, token) => {
    const encryptedMessage = CryptoJS.AES.encrypt(message, token);
    return encryptedMessage.toString();
};

const decrypt = (encryptedMessage, token) => {
    const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, token);

    return decryptedMessage.toString(CryptoJS.enc.Utf8);
};

app.listen(port, () => {
    console.log("Server running on port ${port}");
});

app.get("/", (_, res) => {
    res.send("Hello World!");
});

app.get("/generate_new_token", (_, res) => {
    const expiration_date = Date.now() + (60 * 60 * 1000) // Fecha actual mas una hora en ms

    const token = crypto.randomBytes(64).toString("base64");
    tokens.set(token, expiration_date)

    res.status(200).send({
        message: "Token generated successfully",
        token
    });
});

app.post("/validate_token", (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).send({
            error: "No token provided in request"
        });
    }

    const valid = validateToken(token);

    if (!valid) {
        return res.status(401).send({
            error: "Invalid token"
        });
    }

    res.status(200).send({
        message: "Token is valid"
    });
});

app.post("/deactivate_token", (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).send({
            error: "No token provided in request"
        });
    }

    tokens.delete(token);

    res.status(200).send({
        message: "Token deactivated"
    });
});

app.post("/encrypt_message", (req, res) => {
    const { token, message } = req.body;

    if (!token || !message) {
        return res.status(400).send({
            error: "message and token parameters are required"
        });
    }

    const valid = validateToken(token);
    if (!valid) {
        return res.status(401).send({
            error: "Invalid token"
        });   
    }

    const encryptedMessage = encrypt(message, token);

    res.status(200).send({
        message: "Successfully encrypted message",
        encryptedMessage
    });
});

app.post("/decrypt_message", (req, res) => {
    const { token, encryptedMessage } = req.body;

    if (!token || !encryptedMessage) {
        return res.status(400).send({
            error: "message and token parameters are required"
        });
    }

    const valid = validateToken(token);
    if (!valid) {
        return res.status(401).send({
            error: "Invalid token"
        });   
    }

    const decryptedMessage = decrypt(encryptedMessage, token);

    res.status(200).send({
        message: "Message decrypted successfully",
        decryptedMessage
    });
});

setInterval(clearOldTokens, 60 * 60 * 1000);
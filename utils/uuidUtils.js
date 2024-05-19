const uuid = require('uuid');

function generateUuid() {
    return uuid.v4();
}

function validateUuid(uuidString) {
    return uuid.validate(uuidString);
}

function versionUuid(uuidString) {
    return uuid.version(uuidString);
}

module.exports = {
    generateUuid,
    validateUuid,
    versionUuid
};
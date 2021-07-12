const FileType = require('file-type');

const fs = require('fs');

exports.readFileType = async function (file)  {
    try {
        const mime = await FileType.fromBuffer(file);

        return mime;
    } catch (error) {
        return error;
    }
    
}
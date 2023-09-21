const File = require('../models/file');
const path = require('path');

const uploadFile = async (req, res) => {
  let files = [];
  let uploadsPath;

  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        message: 'No hay archivos seleccionados para subir'
      });
    }

    for (const fileFieldName in req.files) {
      const file = req.files[fileFieldName];
      const newFileName = Date.now() + file.name;
      uploadsPath = __dirname + '/../../uploads/' + newFileName;

      file.mv(uploadsPath);

      const fileDB = await File.create({ nombre: newFileName });
      await fileDB.save();

      files.push(fileDB);
    }

    res.status(200).json({
      ok: true,
      files
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error'
    });
  }
}

const downloadFile = async (req, res) => {
  const { filename } = req.params;
  const filePath = __dirname + `/../../uploads/${filename}`;

  try {
    const fileExtension = path.extname(filePath);
    
    console.log(fileExtension);

    let mimeType = 'application/octet-stream';

    if (fileExtension === '.pdf') {
      mimeType = 'application/pdf';
    } else if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
      mimeType = 'image/jpeg';
    } else if (fileExtension === '.png') {
      mimeType = 'image/png';
    }else if (fileExtension === '.xlsx') {
      mimeType = 'application/excel';
    }

    res.setHeader('Content-Type', mimeType);

    res.download(filePath, filename);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error'
    });
  }
};


module.exports = {
  uploadFile,
  downloadFile
}
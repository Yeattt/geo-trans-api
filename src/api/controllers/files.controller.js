const File = require('../models/file');

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
    res.download(filePath, filename);

    res.status(200).json({
      ok: true,
      message: 'Archivo descargado correctamente'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error'
    });
  }
}

module.exports = {
  uploadFile,
  downloadFile
}
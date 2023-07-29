const File = require('../models/file');

const uploadFile = async (req, res) => {
  let file;
  let uploadsPath;

  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        message: 'No hay archivos seleccionados para subir'
      });
    }

    file = req.files.file;
    file.name = Date.now() + file.name;
    uploadsPath = __dirname + '/uploads' + file.name;

    file.mv(uploadsPath, async (err) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      const fileDB = await File.create({ name: file.name });
      await fileDB.save();

      res.status(200).json({
        ok: true,
        message: 'Archivo subido correctamente'
      });
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
  uploadFile
}
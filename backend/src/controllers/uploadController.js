async function uploadImage(req, res) {
  res.status(200).json({ message: "Image uploaded successfully" });
}
async function uploadImages(req, res) {
  res.status(200).json({ message: "Images uploaded successfully" });
}

async function uploadSpreadsheet(req, res) {
  res.status(200).json({ message: "Spreadsheet uploaded successfully" });
}

async function uploadSpreadsheets(req, res) {
  res.status(200).json({ message: "Spreadsheets uploaded successfully" });
}

export { uploadImage, uploadImages, uploadSpreadsheet, uploadSpreadsheets };

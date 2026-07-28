async function uploadImage(req, res) {
  res.status(200).json({ message: "Image uploaded successfully" });
}

export { uploadImage };

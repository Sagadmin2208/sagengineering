import React, { useState, useEffect } from "react";


const styles = {
  container: { maxWidth: "800px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" },
  form: { padding: "20px", border: "1px solid #007bff", borderRadius: "8px", backgroundColor: "#f7faff", marginBottom: "30px" },
  inputGroup: { marginBottom: "15px" },
  label: { display: "block", marginBottom: "5px", fontWeight: "bold" },
  input: { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" },
  button: { padding: "10px 15px", border: "none", borderRadius: "4px", backgroundColor: "#007bff", color: "white", cursor: "pointer" },
  list: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "15px", listStyle: "none", padding: 0 },
  card: { border: "1px solid #ddd", borderRadius: "8px", padding: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", textAlign: "center", position: "relative" },
  messageSuccess: { color: "#28a745", backgroundColor: "#d4edda", padding: "10px", borderRadius: "4px", marginBottom: "10px" },
  messageError: { color: "#dc3545", backgroundColor: "#f8d7da", padding: "10px", borderRadius: "4px", marginBottom: "10px" },
  deleteButton: { position: "absolute", top: "5px", right: "5px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", padding: "5px 10px", cursor: "pointer", fontSize: "0.8em" },
};

function HomeImagesManager() {
  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, isError });
    setTimeout(() => setMessage(""), 5000);
  };

  // Fetch all images
  const fetchImages = async () => {
    try {
      const res = await fetch("/api/homepage");
      const data = await res.json();
      if (data.success) setImages(data.images);
      else showMessage(data.message || "Failed to fetch images", true);
    } catch (err) {
      showMessage(err.message || "Network error", true);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle file input
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submit
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      showMessage("Please select an image", true);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch("/api/homepage", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        showMessage("Image uploaded successfully!");
        setImageFile(null);
        document.getElementById("imageFile").value = "";
        fetchImages();
      } else {
        showMessage(data.message || "Error uploading image", true);
      }
    } catch (err) {
      showMessage(err.message || "Network error", true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/homepage?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        showMessage("Image deleted successfully!");
        fetchImages();
      } else {
        showMessage(data.message || "Error deleting image", true);
      }
    } catch (err) {
      showMessage(err.message || "Network error", true);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1>🏠 Home Images</h1>

      {message && (
        <p style={message.isError ? styles.messageError : styles.messageSuccess}>
          {message.text}
        </p>
      )}

      {/* Upload Form */}
      <form onSubmit={handleUpload} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="imageFile">Select Image</label>
          <input type="file" id="imageFile" accept="image/*" onChange={handleFileChange} style={styles.input} />
          {imageFile && <small>Selected: {imageFile.name}</small>}
        </div>
        <button type="submit" style={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {/* List of Images */}
      <h2>📄 Uploaded Images</h2>
      {images.length > 0 ? (
        <ul style={styles.list}>
          {images.map((img) => (
            <li key={img.id} style={styles.card}>
              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(img.id)}
                disabled={deletingId === img.id}
              >
                {deletingId === img.id ? "Deleting..." : "Delete"}
              </button>
              <img src={img.imageUrl} alt={`Image ${img.id}`} style={{ width: "100%", borderRadius: "4px", marginBottom: "10px" }} />
              <p style={{ fontSize: "0.8em", color: "#666" }}>Created: {new Date(img.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No images uploaded yet.</p>
      )}
    </div>
  );
}

export default HomeImagesManager;
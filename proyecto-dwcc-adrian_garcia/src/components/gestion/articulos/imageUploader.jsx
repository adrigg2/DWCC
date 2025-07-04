export default function ImageUploader({ setFile }) {
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    return (
        <>
            <label htmlFor="imagen" className="block text-white-700">Imagen (opcional):</label>
            <input type="file" id="imagen" name="imagen" accept=".png, .jpg, .jpeg" onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </>
    )
}
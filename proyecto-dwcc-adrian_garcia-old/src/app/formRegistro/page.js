import styles from "../page.module.css";

export default function FormRegistro() {
  return (
    <div className={styles.page}>
        <main className={styles.main}>
            <form>
                <label>
                    Nombre:
                    <input type="text" name="nombre" />
                </label>
                <label>
                    Apellido:
                    <input type="text" name="apellido" />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" />
                </label>
                <label>
                    Contraseña:
                    <input type="password" name="contrasena" />
                </label>
                <button type="submit">Registrarse</button>
            </form>
        </main>
    </div>
  );
}

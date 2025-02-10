import React, { useState } from 'react';
import './RegisterPage.css';
function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleRegister = async () => {
        console.log("Register invoked")
    }
return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <div className="register-card p-4 border rounded">
                    <h2 className="text-center mb-4 font-weight-bold">Registrar</h2>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Nombre</label>
                        <input
                            id="firstName"
                            type="text"
                            className="form-control"
                            placeholder="Ingresa tu nombre"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    {/* apellido */}
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Apellido</label>
                        <input
                            id="lastName"
                            type="text"
                            className="form-control"
                            placeholder="Ingresa tu apellido"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    {/* correo electrónico */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input
                            id="email"
                            type="text"
                            className="form-control"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Registrar</button>
                    <p className="mt-4 text-center">
                        ¿Ya eres miembro? <a href="/app/login" className="text-primary">Iniciar sesión</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
);
}
export default RegisterPage;
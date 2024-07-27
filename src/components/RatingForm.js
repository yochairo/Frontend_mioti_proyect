import React, { useState } from 'react';

const RatingForm = () => {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/text', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            setRating(Math.round(data.puntuacion * 100) / 100); 
        } catch (error) {
            setError('Hubo un problema con la solicitud');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rating-form">
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Escribe tu texto aquí..."
                    maxLength="8192"  
                    required 
                />
                <button type="submit" disabled={loading}>Enviar</button>
            </form>
            {loading && <p>Cargando...</p>}
            {error && <p className="error">{error}</p>}
            {rating !== null && <p>Rating: {rating}</p>}
        </div>
    );
};

export default RatingForm;

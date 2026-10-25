import { useState } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { FORMSPREE_ENDPOINT } from '../data.js';

export default function LeadForm({ subject = 'Nuevo contacto SACREPS', buttonLabel = 'Enviar mensaje' }) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append('_subject', subject);
    setStatus('sending');
    setError('');
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('No se pudo enviar. Inténtalo de nuevo o escríbenos por WhatsApp.');
      setStatus('sent');
      form.reset();
    } catch (submitError) {
      setError(submitError.message);
      setStatus('idle');
    }
  }

  if (status === 'sent') return <div className="form-success"><Check size={22} /><div><strong>Mensaje recibido.</strong><span>El equipo SACREPS se pondrá en contacto contigo.</span></div></div>;

  return <form className="lead-form" onSubmit={handleSubmit}><div className="form-two"><label>Tu nombre<input name="Nombre" autoComplete="name" required placeholder="¿Cómo te llamas?" /></label><label>Correo electrónico<input name="Email" type="email" autoComplete="email" required placeholder="tu@correo.com" /></label></div><label>Quiero conversar sobre<select name="Interés" defaultValue="Comunidad"><option>Comunidad</option><option>Entrenar en SACREPS</option><option>Colaboraciones</option><option>Productos y pedidos</option><option>Symmetry y servicios</option><option>Otro</option></select></label><label>Cuéntanos un poco<textarea name="Mensaje" rows="4" required placeholder="Escribe tu mensaje..." /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <><LoaderCircle className="spin" size={16} /> Enviando</> : <>{buttonLabel}<ArrowRight size={16} /></>}</button><small className="privacy-note">Al enviar autorizas a SACREPS a contactarte para responder esta solicitud.</small></form>;
}
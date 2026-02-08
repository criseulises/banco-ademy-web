import React from 'react';
import { colors } from '@/styles/colors';

export default function Contacto() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
          Contacto
        </h1>
        <p className="text-gray-600 mt-2">
          ¿Necesitas ayuda? Estamos aquí para ti
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Canales de Contacto */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
            Canales de Atención
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.grey50 }}>
              <div className="text-2xl top-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold" style={{ color: colors.textPrimary }}>
                  Teléfono
                </h3>
                <p style={{ color: colors.textSecondary }}>809-555-ADEMI (23364)</p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Lun-Vie: 8:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.grey50 }}>
              <div className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold" style={{ color: colors.textPrimary }}>
                  Email
                </h3>
                <p style={{ color: colors.textSecondary }}>atencion@bancoademi.com</p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Respuesta en 24 horas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.grey50 }}>
              <div className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold" style={{ color: colors.textPrimary }}>
                  Chat en línea
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Disponible 24/7
                </p>
                <button
                  className="mt-2 px-4 py-2 rounded-lg text-white font-semibold text-sm"
                  style={{ backgroundColor: colors.primary }}
                >
                  Iniciar Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
            Envíanos un Mensaje
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                Asunto
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                style={{ borderColor: colors.border }}
              >
                <option>Selecciona un asunto</option>
                <option>Consulta General</option>
                <option>Problema Técnico</option>
                <option>Reclamo</option>
                <option>Sugerencia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                Mensaje
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-2 border rounded-lg"
                style={{ borderColor: colors.border }}
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg text-white font-bold flex items-center justify-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>

      {/* Sucursales */}
      <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          Nuestras Sucursales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg" style={{ borderColor: colors.border }}>
            <h3 className="font-bold mb-2" style={{ color: colors.textPrimary }}>
              Sucursal Principal
            </h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Av. Winston Churchill #1100<br />
              Santo Domingo, D.N.<br />
              Tel: 809-555-0001
            </p>
          </div>
          <div className="p-4 border rounded-lg" style={{ borderColor: colors.border }}>
            <h3 className="font-bold mb-2" style={{ color: colors.textPrimary }}>
              Sucursal Santiago
            </h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Av. 27 de Febrero #250<br />
              Santiago de los Caballeros<br />
              Tel: 809-555-0002
            </p>
          </div>
          <div className="p-4 border rounded-lg" style={{ borderColor: colors.border }}>
            <h3 className="font-bold mb-2" style={{ color: colors.textPrimary }}>
              Sucursal La Romana
            </h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Calle Duarte #45<br />
              La Romana<br />
              Tel: 809-555-0003
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

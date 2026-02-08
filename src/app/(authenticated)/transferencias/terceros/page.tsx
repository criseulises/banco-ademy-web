'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { colors } from '@/styles/colors';
import { useRouter, useSearchParams } from 'next/navigation';

interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: string;
  currency: string;
  balance: number;
  availableBalance: number;
  nickname: string;
  status: string;
}

interface Beneficiary {
  id: string;
  userId: string;
  type: string;
  name: string;
  nickname: string;
  accountNumber: string;
  bankName: string;
}

type Step = 'form' | 'confirm' | 'success';
type Metodo = 'ACH' | 'LBTR';

const TAX_RATE = 0.0015;
const LBTR_FEE = 100;
const ACH_FEE = 0;

function formatCurrency(amount: number) {
  return `RD$ ${amount.toLocaleString('es-DO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatInputAmount(raw: string): string {
  if (!raw) return '';
  const [intPart, decPart] = raw.split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
}

function AccountSelect({
  label,
  value,
  onChange,
  accounts,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  accounts: Account[];
  placeholder: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = accounts.find((a) => a.id === value);

  return (
    <div>
      <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
        {label}
      </label>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-all text-left bg-white"
          style={{ borderColor: error ? colors.error : colors.border }}
        >
          <span style={{ color: selected ? colors.textPrimary : colors.textHint }}>
            {selected
              ? `${selected.nickname} - ${selected.accountNumber.slice(-4)}`
              : placeholder}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: colors.primary, flexShrink: 0 }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && accounts.length > 0 && (
          <div
            className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border"
            style={{ borderColor: colors.border }}
          >
            {accounts.map((account) => (
              <button
                key={account.id}
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                onClick={() => {
                  onChange(account.id);
                  setOpen(false);
                }}
              >
                <div className="font-semibold text-sm" style={{ color: colors.textPrimary }}>
                  {account.nickname}
                </div>
                <div className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
                  **** {account.accountNumber.slice(-4)} · {formatCurrency(account.availableBalance)}
                </div>
              </button>
            ))}
          </div>
        )}
        {error && (
          <p className="text-sm mt-1" style={{ color: colors.error }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

function BeneficiarySelect({
  label,
  value,
  onChange,
  beneficiaries,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  beneficiaries: Beneficiary[];
  placeholder: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = beneficiaries.find((b) => b.id === value);

  return (
    <div>
      <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
        {label}
      </label>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-all text-left bg-white"
          style={{ borderColor: error ? colors.error : colors.border }}
        >
          <span style={{ color: selected ? colors.textPrimary : colors.textHint }}>
            {selected ? `${selected.name} - ${selected.accountNumber.slice(-4)}` : placeholder}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: colors.primary, flexShrink: 0 }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && beneficiaries.length > 0 && (
          <div
            className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border"
            style={{ borderColor: colors.border }}
          >
            {beneficiaries.map((ben) => (
              <button
                key={ben.id}
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                onClick={() => {
                  onChange(ben.id);
                  setOpen(false);
                }}
              >
                <div className="font-semibold text-sm" style={{ color: colors.textPrimary }}>
                  {ben.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
                  **** {ben.accountNumber.slice(-4)} · {ben.bankName}
                </div>
              </button>
            ))}
          </div>
        )}
        {error && (
          <p className="text-sm mt-1" style={{ color: colors.error }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default function TransferenciasTerceros() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<Step>('form');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [monto, setMonto] = useState('');
  const [concepto, setConcepto] = useState('');
  const [metodo, setMetodo] = useState<Metodo>('ACH');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const beneficiarioParam = searchParams.get('beneficiario');

  useEffect(() => {
    Promise.all([
      fetch('/mock_data/accounts.json').then((r) => r.json()),
      fetch('/mock_data/beneficiaries.json').then((r) => r.json()),
    ])
      .then(([accountsData, beneficiariesData]) => {
        setAccounts(
          accountsData.accounts.filter(
            (acc: Account) => acc.userId === 'user_001' && acc.status === 'ACTIVE'
          )
        );
        const filteredBens = beneficiariesData.beneficiaries.filter(
          (b: Beneficiary) =>
            b.userId === 'user_001' && (b.type === 'CUENTA_ADEMI' || b.type === 'OTRA_CUENTA')
        );
        setBeneficiaries(filteredBens);
        if (beneficiarioParam) {
          const found = filteredBens.find((b: Beneficiary) => b.id === beneficiarioParam);
          if (found) setDestino(found.id);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const parsedAmount = parseFloat(monto) || 0;
  const tax = parsedAmount * TAX_RATE;
  const fee = metodo === 'LBTR' ? LBTR_FEE : ACH_FEE;
  const total = parsedAmount + tax + fee;

  const origenAccount = accounts.find((a) => a.id === origen);
  const destinoBeneficiary = beneficiaries.find((b) => b.id === destino);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!origen) newErrors.origen = 'Selecciona una cuenta origen';
    if (!destino) newErrors.destino = 'Selecciona un beneficiario destino';
    if (!monto || parsedAmount <= 0) newErrors.monto = 'Ingresa un monto válido';
    if (parsedAmount > 0 && origenAccount && parsedAmount > origenAccount.availableBalance)
      newErrors.monto = 'Fondos insuficientes';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) setStep('confirm');
  };

  const handleProceder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const now = new Date();
      setTransactionDate(
        now.toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' })
      );
      setTransactionRef(`2025${Date.now().toString().slice(-8)}`);
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  const handleReset = () => {
    setStep('form');
    setOrigen('');
    setDestino('');
    setMonto('');
    setConcepto('');
    setMetodo('ACH');
    setErrors({});
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: colors.primary }}
          />
          <p style={{ color: colors.textSecondary }}>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            Transferencia a tercero
          </h1>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AccountSelect
              label="Origen"
              value={origen}
              onChange={(id) => {
                setOrigen(id);
                setErrors((prev) => ({ ...prev, origen: '' }));
              }}
              accounts={accounts}
              placeholder="Selecciona un producto origen"
              error={errors.origen}
            />

            <BeneficiarySelect
              label="Destino"
              value={destino}
              onChange={(id) => {
                setDestino(id);
                setErrors((prev) => ({ ...prev, destino: '' }));
              }}
              beneficiaries={beneficiaries}
              placeholder="Selecciona un producto destino"
              error={errors.destino}
            />

            {/* Monto */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: colors.textPrimary }}
              >
                Monto
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ color: colors.grey500 }}
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Digite el monto a transferir"
                  value={formatInputAmount(monto)}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9.]/g, '');
                    setMonto(val);
                    setErrors((prev) => ({ ...prev, monto: '' }));
                  }}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all"
                  style={{ borderColor: errors.monto ? colors.error : colors.border }}
                />
              </div>
              {errors.monto && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {errors.monto}
                </p>
              )}
            </div>

            {/* Concepto */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: colors.textPrimary }}
              >
                Concepto
              </label>
              <input
                type="text"
                placeholder="Escribe un comentario"
                value={concepto}
                onChange={(e) => setConcepto(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-all"
                style={{ borderColor: colors.border }}
              />
            </div>
          </div>

          {/* Método */}
          <div className="mt-6">
            <label className="block text-sm font-semibold mb-3" style={{ color: colors.textPrimary }}>
              Método
            </label>
            <div className="flex gap-3">
              {(['ACH', 'LBTR'] as Metodo[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMetodo(m)}
                  className="px-5 py-2 rounded-lg border-2 font-semibold transition-all text-sm"
                  style={{
                    borderColor: metodo === m ? colors.secondary : colors.border,
                    color: metodo === m ? colors.secondary : colors.textSecondary,
                    backgroundColor: 'white',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: colors.secondary, color: 'white' }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="px-8 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>

      {/* ── Confirm Dialog ── */}
      {step === 'confirm' && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setStep('form')}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                Confirmar
              </h2>
              <button
                onClick={() => setStep('form')}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: colors.textPrimary }}
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <hr style={{ borderColor: colors.border }} />

            <div className="py-4 space-y-3">
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Origen</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {origenAccount
                    ? `${origenAccount.nickname} - ${origenAccount.accountNumber.slice(-4)}`
                    : '—'}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Destino</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {destinoBeneficiary
                    ? `${destinoBeneficiary.name} - ${destinoBeneficiary.accountNumber.slice(-4)}`
                    : '—'}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Concepto</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {concepto || '—'}
                </span>
              </div>
            </div>

            <div className="border-t border-dashed" style={{ borderColor: colors.border }} />

            <div className="py-4 space-y-3">
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Monto</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>
                  {formatCurrency(parsedAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Impuesto</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>
                  {formatCurrency(tax)}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Cargo por {metodo}</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>
                  {formatCurrency(fee)}
                </span>
              </div>
            </div>

            <div className="border-t border-dashed" style={{ borderColor: colors.border }} />

            <div className="flex justify-between py-4">
              <span className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                Total
              </span>
              <span className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                {formatCurrency(total)}
              </span>
            </div>

            <hr style={{ borderColor: colors.border }} />

            <button
              type="button"
              onClick={handleProceder}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl font-bold text-lg mt-6 transition-all hover:opacity-90 disabled:opacity-70"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Procesando...
                </span>
              ) : (
                'Proceder'
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── Success Dialog ── */}
      {step === 'success' && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 animate-scale-in">
            <div className="flex justify-end mb-2">
              <button
                onClick={handleReset}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: colors.textPrimary }}
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div
                className="w-16 h-16 rounded-full border-4 flex items-center justify-center mb-3"
                style={{ borderColor: colors.primary }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ color: colors.primary }}
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Transacción completada
              </p>
              <p className="text-3xl font-bold mt-1" style={{ color: colors.textPrimary }}>
                {formatCurrency(parsedAmount)}
              </p>
            </div>

            <hr style={{ borderColor: colors.border }} />

            <div className="py-4 space-y-3">
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Origen</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {origenAccount
                    ? `${origenAccount.nickname} - ${origenAccount.accountNumber.slice(-4)}`
                    : '—'}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Destino</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {destinoBeneficiary
                    ? `${destinoBeneficiary.name} - ${destinoBeneficiary.accountNumber.slice(-4)}`
                    : '—'}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Concepto</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {concepto || '—'}
                </span>
              </div>
            </div>

            <div className="border-t border-dashed" style={{ borderColor: colors.border }} />

            <div className="py-4 space-y-3">
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Fecha</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>
                  {transactionDate}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Número de referencia</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {transactionRef}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-4 rounded-xl font-bold text-lg mt-4 flex items-center justify-center gap-3 transition-all hover:opacity-90"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              Compartir recibo de transacción
              <Image
                src="/icon/tabler/tabler-icon-share-3.svg"
                alt="Compartir"
                width={22}
                height={22}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

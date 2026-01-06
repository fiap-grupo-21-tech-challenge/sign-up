"use client";

import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";

import { registerUser } from '@grupo21/utils'
import { FormEvent, useState } from "react";

export default function SignUp() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) return setError("Informe seu nome completo.");
    if (!email.trim()) return setError("Informe um e-mail válido.");
    if (password.length < 6)
      return setError("A senha deve ter pelo menos 6 caracteres.");
    if (password !== confirm) return setError("As senhas não conferem.");
    if (!accepted)
      return setError(
        "É necessário aceitar os Termos de Uso e a Política de Privacidade."
      );

    setSubmitting(true);
    try {
      await registerUser({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });
      window.location.href = 'dashboard';
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Não foi possível criar sua conta.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16">
      <header className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-8">
        {/* <Logo /> */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800"
        >
          <FiArrowLeft className="shrink-0" />
          Voltar ao início
        </a>
      </header>

      <main className="mx-auto w-full max-w-md px-4">
        <section
          className={`rounded-2xl bg-white p-6 shadow-lg shadow-gray-500/50 sm:p-8`}
        >
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold sm:text-3xl">Criar sua conta</h1>
            <p className="mt-1 text-slate-500">Comece a gerenciar suas finanças hoje</p>
          </div>


          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block text-sm font-bold">Nome completo</label>
            <input
              className="custom-input"
              placeholder="Seu nome completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              autoComplete="name"
              required
            />

            <label className="block text-sm font-bold">E-mail</label>
            <input
              className="custom-input"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
            />

            <label className="block text-sm font-bold">Senha</label>
            <input
              className="custom-input"
              placeholder="Crie uma senha segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
            />

            <label className="block text-sm font-bold">Confirmar senha</label>
            <input
              className="custom-input"
              placeholder="Confirme sua senha"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
            />

            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-1"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span>
                Aceito os{" "}
                <a href="#" className="underline">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="#" className="underline">
                  Política de Privacidade
                </a>
              </span>
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="button-primary"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? "Criando conta..." : "Criar Conta"}
            </button>
          </form>

          <div className="mt-6 border-t pt-4 text-center text-sm text-slate-600">
            <>
              Já tem uma conta?{" "}
              <a
                href="/Login"
                className="font-medium text-blue-600 hover:underline"
              >
                Fazer login
              </a>
            </>
          </div>
        </section>

        <div
          className={`rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 mt-6`}
        >
          <div className="flex items-start gap-3">
            <FiCheckCircle className="mt-0.5" />
            <div>
              <p className="font-medium">Seus dados estão seguros</p>
              <p>Usamos criptografia de ponta para proteger suas informações pessoais e
                financeiras.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data, isLoading, refetch } = trpc.siteAccess.check.useQuery(undefined, {
    retry: false,
  });

  const verify = trpc.siteAccess.verify.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (err) => {
      setError(err.message === "Falsches Passwort" ? "Falsches Passwort. Bitte erneut versuchen." : "Ein Fehler ist aufgetreten.");
    },
  });

  // Still loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-cme-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // No password required or already granted
  if (!data?.required || data?.granted) {
    return <>{children}</>;
  }

  // Show password form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    verify.mutate({ password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_RGB_433c645f.png"
              alt="CME Control Motion Electronics"
              className="h-10 w-auto"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-2">
              Geschützter Bereich
            </h1>
            <p className="text-sm text-slate-500">
              Diese Website befindet sich in der Vorschau. Bitte geben Sie das Passwort ein, um fortzufahren.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Passwort eingeben"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cme-blue/50 focus:border-cme-blue transition-colors"
                autoFocus
                autoComplete="off"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={verify.isPending || !password}
              className="w-full py-3 px-4 rounded-lg bg-cme-blue text-white font-medium hover:bg-cme-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {verify.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Wird geprüft...
                </>
              ) : (
                "Zugang erhalten"
              )}
            </button>
          </form>

          {/* Footer hint */}
          <p className="text-xs text-slate-400 text-center mt-6">
            CME Control Motion Electronics GmbH
          </p>
        </div>
      </div>
    </div>
  );
}

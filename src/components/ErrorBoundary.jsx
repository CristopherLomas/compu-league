import React, { Component } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      localStorage.removeItem('compu_league_gamertag');
    } catch {}
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07090E] text-white flex flex-col items-center justify-center p-4 font-sans select-none">
          <div className="max-w-md w-full bg-[#0C111A] border-4 border-black p-6 shadow-brutal-pink text-center space-y-4">
            <div className="w-14 h-14 bg-[#1A0A10] border-2 border-[#FF0055] text-[#FF0055] flex items-center justify-center mx-auto shadow-brutal-black">
              <AlertCircle className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="bg-black text-[#FF0055] border border-[#FF0055] px-2.5 py-0.5 font-pixel text-[9px] uppercase">
                ★ ERROR DE CARGA ★
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white font-display pt-2">
                COMPU LEAGUE
              </h2>
              <p className="text-slate-300 text-xs font-cyber leading-relaxed">
                Ocurrió un problema temporal al renderizar la interfaz. Puedes recargar o regresar al inicio.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                onClick={this.handleReload}
                className="btn-arcade-press py-2.5 px-5 bg-[#FFE600] text-black font-pixel font-black text-xs uppercase tracking-wider border-2 border-black flex items-center justify-center gap-2 cursor-pointer shadow-brutal-yellow"
              >
                <RefreshCw className="w-3.5 h-3.5 stroke-[3]" />
                <span>RECARGAR</span>
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="btn-arcade-press py-2.5 px-5 bg-black text-[#00F0FF] font-pixel text-xs uppercase tracking-wider border-2 border-[#00F0FF] flex items-center justify-center gap-2 cursor-pointer shadow-brutal-cyan"
              >
                <span>IR AL INICIO</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

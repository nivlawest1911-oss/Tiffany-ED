'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-black/40 backdrop-blur-xl border border-red-500/20 rounded-3xl">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Neural Link Interrupted</h2>
          <p className="text-gray-400 mb-8 max-w-md">
            We've encountered an unexpected discontinuity in the neural interface. Your state is preserved, but a reboot is required.
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)]"
          >
            <RefreshCcw className="w-4 h-4" />
            Re-initialize Interface
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

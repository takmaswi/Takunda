'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('3D Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-screen fixed top-0 left-0 z-0 flex items-center justify-center bg-dark-bg">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gradient-gold mb-2">
                3D Scene Error
              </h2>
              <p className="text-gray-400 text-sm">
                The 3D visualization failed to load. Please refresh the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-3 bg-accent-gold text-dark-bg rounded-lg font-semibold hover:bg-accent-gold/90 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

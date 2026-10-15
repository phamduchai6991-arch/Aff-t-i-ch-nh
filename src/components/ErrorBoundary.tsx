import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = window.location.pathname;
    } catch {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl">
              !
            </div>
            <h1 className="text-xl font-bold text-slate-100">Đã xảy ra lỗi tải trang</h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Trang web gặp sự cố nhỏ khi khởi tạo dữ liệu trong trình duyệt của bạn. Bạn vui lòng tải lại trang hoặc khôi phục dữ liệu ban đầu.
            </p>
            {this.state.error && (
              <div className="text-left bg-slate-950 p-3 rounded-lg text-xs font-mono text-red-400 overflow-x-auto max-h-32">
                {this.state.error.message || 'Lỗi không xác định'}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg font-semibold text-sm transition-all"
              >
                Tải lại trang
              </button>
              <button
                onClick={this.handleResetStorage}
                className="flex-1 py-2.5 px-4 bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 rounded-lg font-semibold text-sm transition-all"
              >
                Xóa bộ nhớ đệm
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

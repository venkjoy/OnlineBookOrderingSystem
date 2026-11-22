import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ padding: 32, fontFamily: "sans-serif" }}>
        <h1 style={{ color: "#b91c1c", fontSize: 24, fontWeight: 700 }}>Something crashed</h1>
        <pre style={{ marginTop: 16, whiteSpace: "pre-wrap", background: "#fef2f2", padding: 16, borderRadius: 8 }}>
          {String(this.state.error?.stack || this.state.error)}
        </pre>
      </div>
    );
  }
}
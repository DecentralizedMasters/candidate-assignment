interface ErrorDisplayProps {
  error: string | null;
}

const ErrorDisplay = ({ error }: ErrorDisplayProps) =>
  error ? <div className="error">{error}</div> : null;

export default ErrorDisplay;

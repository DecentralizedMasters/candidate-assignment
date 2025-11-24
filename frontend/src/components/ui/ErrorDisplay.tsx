interface ErrorDisplayProps {
  error: string | null;
}

const ErrorDisplay = ({ error }: ErrorDisplayProps) =>
   error ? <div className="error">{String(error).replace(/<[^>]*>/g, '')}</div> : null;
export default ErrorDisplay;

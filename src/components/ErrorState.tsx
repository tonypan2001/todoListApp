import type { ErrorStateProps } from "../types/components/errorstate.types";
import Spinner from "./Spinner";
export default function ErrorState(props: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 p-4">
      <p className="text-[var(--primary-error-color)] dark:text-red-300 mb-3">{props.message}</p>
      <button
        type="button"
        onClick={props.onRetry}
        disabled={props.loading}
        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 bg-[var(--primary-background)] text-[var(--primary-text-color)] hover:bg-gray-100 disabled:opacity-60"
      >
        {props.loading ? <Spinner /> : null}
        <span>{props.loading ? "Retrying..." : "Retry"}</span>
      </button>
    </div>
  );
}

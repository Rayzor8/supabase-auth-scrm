import supabase from "../../supabase-client";
import type { SaleMetrics } from "../../types";
import { useActionState } from "react";

type AddformProps = {
  metrics: SaleMetrics[];
};

type PrevState = {
  name: string;
  success: boolean;
  message: string;
  error: string | null;
};

export default function AddForm({ metrics }: AddformProps) {
  const initialState: PrevState = {
    name: "",
    success: false,
    message: "",
    error: null,
  };

  const [state, submitAction, isPending] = useActionState(
    formAction,
    initialState,
  );

  async function formAction(_prevState: PrevState, formData: FormData) {
    const newDeal = {
      name: String(formData.get("name")),
      value: Number(formData.get("value")),
    };

    try {
      const { error } = await supabase.from("sales_deals").insert(newDeal);
      if (error) {
        console.error("Error Inserting metrics:", error);
        throw new Error("Failed to insert new deal");
      }

      return {
        name: newDeal.name,
        success: true,
        message: "New deal added successfully",
        error: null,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      return {
        name: newDeal.name,
        success: false,
        message: "",
        error: errorMessage,
      };
    }
  }

  const generateOptions = () => {
    const options = metrics.map((metric) => ({
      label: metric.name,
      value: metric.name,
    }));
    return options;
  };

  return (
    <div className="form-container">
      <form
        aria-label="Add new sales deal"
        aria-describedby="form-description"
        action={submitAction}
      >
        <div id="form-description" className="sr-only">
          Use this form to add a new sales deal. Select a sales rep and enter
          the amount.
        </div>

        <label htmlFor="deal-name">
          Name:
          <select
            id="deal-name"
            name="name"
            defaultValue={metrics[0].name ?? ""}
            aria-required="true"
            aria-invalid={state.error ? "true" : "false"}
            disabled={isPending}
          >
            {metrics &&
              generateOptions().map((option) => (
                <option value={option.value ?? ""} key={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </label>

        <label htmlFor="deal-value">
          Amount: $
          <input
            id="deal-value"
            type="number"
            name="value"
            defaultValue={0}
            className="amount-input"
            min="10"
            step="10"
            aria-required="true"
            aria-invalid={state.error ? "true" : "false"}
            aria-label="Deal amount in dollars"
            disabled={isPending}
          />
        </label>

        <button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending ? "Pending..." : "Add deal"}
        </button>
      </form>

      {state.error && (
        <p role="alert" className="error-message">
          {state.error as string}
        </p>
      )}

      {state.success && (
        <p role="status" className="success-message">
          {state.name} {state.message}
        </p>
      )}
    </div>
  );
}

export type InputProps =
  | {
      label?: string;
      error?: string;
      className?: string;
      placeholder?: string;
      defaultValue?: string;
      useTextArea?: false;
      onChange?: React.ChangeEventHandler<HTMLInputElement>;
    }
  | {
      label?: string;
      error?: string;
      className?: string;
      placeholder?: string;
      defaultValue?: string;
      useTextArea: true;
      onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    };

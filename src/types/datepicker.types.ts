export type DatePickerProps = {
  value?: string;
  error?: string;
  onChange: (date: string) => void;
  allowPast?: boolean; // true = เลือกอดีตได้, false = เลือกอดีตไม่ได้
  className?: string;
};

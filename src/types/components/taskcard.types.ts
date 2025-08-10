export type TaskCardProps = {
    title: string;
    description: string;
    date: string;
    icon?: string; // emoji เช่น "📌"
    isDone: boolean;
    onToggleDone: () => void;
    onEdit: () => void;
    onDelete: () => void;
};
export type TaskCardProps = {
    title: string;
    description: string;
    icon?: string; // emoji เช่น "📌"
    isDone: boolean;
    onToggleDone: () => void;
    onEdit: () => void;
    onDelete: () => void;
};
export type TaskCardProps = {
    title: string;
    description: string;
    icon?: string; // emoji เช่น "📌"
    onEdit: () => void;
    onDelete: () => void;
};
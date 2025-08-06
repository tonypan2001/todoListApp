export type DropdownProps = {
    label?: string;
    items: string[];
    onSelect?: (item: string) => void;
}
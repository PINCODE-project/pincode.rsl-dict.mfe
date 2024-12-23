export interface Field {
    name: string;
    type: string;
    defaultValue?: string;
    description?: string;
    required?: boolean;
}
export interface FieldGroupProps {
    title: string;
    description?: string;
    fields: Field[];
    className?: string;
}
export declare function FieldGroup({ title, description, fields, className }: FieldGroupProps): import("react/jsx-runtime").JSX.Element;

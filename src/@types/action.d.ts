export interface Action {
    id: number;
    information_id: FormDataEntryValue | number | undefined;
    description: FormDataEntryValue | undefined;
    date: string;
}
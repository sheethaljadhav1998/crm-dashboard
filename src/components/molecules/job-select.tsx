"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/select";
import { JOB_TITLES } from "@/constants";

type Props = {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    id?: string;
    invalid?: boolean;
    disabled?: boolean;
    className?: string;
};

export function JobSelect({ value, onChange, onBlur, id, invalid, disabled, className }: Props) {
    const options = value && !JOB_TITLES.includes(value) ? [value, ...JOB_TITLES] : JOB_TITLES;

    return (
        <Select value={value || undefined} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger
                id={id}
                aria-invalid={invalid}
                onBlur={onBlur}
                className={className ?? "w-full bg-white/80"}
            >
                <SelectValue placeholder="Select a job title" />
            </SelectTrigger>
            <SelectContent>
                {options.map((title) => (
                    <SelectItem key={title} value={title}>
                        {title}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
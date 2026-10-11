"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder }: Props) {
    return (
        <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="h-11 rounded-full bg-card pl-11 pr-10 shadow-sm"
            />
            {value && (
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full"
                >
                    <X />
                </Button>
            )}
        </div>
    );
}

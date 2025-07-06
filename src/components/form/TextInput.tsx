import React from "react";

interface ITextInputProps {
    helperText?: string;
    label: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    placeholder?: string,
    value: string,
}

export function TextInput({ helperText, label, name, onChange, placeholder, value }: ITextInputProps) {
    return (
        <div>
            <div className="text-gray-700 uppercase text-sm font-bold">{label}</div>

            <input
                className="mt-2 w-full shadow-sm border rounded-sm py-2 px-3 text-gray-700 leading-tight focus:outline-hidden focus:shadow-outline"
                id={name}
                name={name}
                onChange={onChange}
                placeholder={placeholder || label}
                type="text"
                value={value}
            />

            {helperText && (
                <p className="mt-1 text-gray-500 text-xs">{helperText}</p>
            )}
        </div>
    );
}

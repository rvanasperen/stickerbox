import React from 'react';

interface ITextInputProps {
    helperText?: string;
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    placeholder?: string;
    value: string;
}

export function TextInput({ helperText, label, name, onChange, placeholder, value }: ITextInputProps) {
    return (
        <div>
            <div className="text-sm font-bold text-gray-700 uppercase">{label}</div>

            <input
                className="focus:shadow-outline mt-2 w-full rounded-sm border px-3 py-2 leading-tight text-gray-700 shadow-sm focus:outline-hidden"
                id={name}
                name={name}
                onChange={onChange}
                placeholder={placeholder || label}
                type="text"
                value={value}
            />

            {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
        </div>
    );
}

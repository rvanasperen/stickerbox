import React from 'react';

interface ITextInputProps {
    helperText?: string;
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    placeholder?: string;
    value: string;
    type?: string;
    min?: number;
    max?: number;
}

export function TextInput({ helperText, label, name, onChange, placeholder, value, type = 'text', min, max }: ITextInputProps) {
    return (
        <div>
            <label htmlFor={name} className="mb-1 block text-sm font-bold text-blue-700 uppercase">
                {label}
            </label>

            <input
                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-700 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                id={name}
                name={name}
                onChange={onChange}
                placeholder={placeholder || label}
                type={type}
                min={min}
                max={max}
                value={value}
            />

            {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
        </div>
    );
}

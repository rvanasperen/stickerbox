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
        <div className="mb-4">
            <label htmlFor={name} className="text-primary-dark mb-1 block text-sm font-bold uppercase">
                {label}
            </label>

            <input
                className="text-text focus:border-primary-light focus:ring-primary-light focus:ring-opacity-50 w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm transition-all focus:ring-2 focus:outline-none"
                id={name}
                name={name}
                onChange={onChange}
                placeholder={placeholder || label}
                type="text"
                value={value}
            />

            {helperText && <p className="text-text-light mt-1 text-xs">{helperText}</p>}
        </div>
    );
}

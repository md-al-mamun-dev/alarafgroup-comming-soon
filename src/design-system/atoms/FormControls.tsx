import React from "react";
import { ChevronDown } from "lucide-react";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export function FormInput({ label, required, className = "", ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-corp-dark block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        required={required}
        className={`w-full px-4 py-3 rounded-[7px] border border-corp-border text-sm text-corp-dark placeholder-corp-muted bg-white focus:outline-none focus:ring-2 focus:ring-corp-dark focus:border-transparent transition-all ${className}`}
        {...props}
      />
    </div>
  );
}

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  options: { label: string; value: string }[];
  placeholder?: string;
}

export function FormSelect({
  label,
  required,
  options,
  placeholder = "Select an option",
  className = "",
  ...props
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-corp-dark block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          required={required}
          className={`w-full px-4 py-3 rounded-[7px] border border-corp-border text-sm text-corp-dark bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-corp-dark focus:border-transparent transition-all pr-10 cursor-pointer ${className}`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-corp-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
}

export function FormTextarea({
  label,
  required,
  rows = 4,
  className = "",
  ...props
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-corp-dark block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 rounded-[7px] border border-corp-border text-sm text-corp-dark placeholder-corp-muted bg-white focus:outline-none focus:ring-2 focus:ring-corp-dark focus:border-transparent transition-all resize-none ${className}`}
        {...props}
      />
    </div>
  );
}


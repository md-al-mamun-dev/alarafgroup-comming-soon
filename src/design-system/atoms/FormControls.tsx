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
        className={`w-full px-4 py-3 rounded-[7px] border border-corp-border text-sm text-corp-dark placeholder-corp-muted bg-white focus:outline-none focus:border-[#8C7B5E] focus:ring-1 focus:ring-[#8C7B5E]/30 focus:shadow-[0_2px_8px_rgba(140,123,94,0.08)] hover:border-corp-muted/60 transition-all duration-200 ${className}`}
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
          className={`w-full px-4 py-3 rounded-[7px] border border-corp-border text-sm text-corp-dark bg-white appearance-none focus:outline-none focus:border-[#8C7B5E] focus:ring-1 focus:ring-[#8C7B5E]/30 focus:shadow-[0_2px_8px_rgba(140,123,94,0.08)] hover:border-corp-muted/60 transition-all duration-200 pr-10 cursor-pointer ${className}`}
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
        className={`w-full px-4 py-3 rounded-[7px] border border-corp-border text-sm text-corp-dark placeholder-corp-muted bg-white focus:outline-none focus:border-[#8C7B5E] focus:ring-1 focus:ring-[#8C7B5E]/30 focus:shadow-[0_2px_8px_rgba(140,123,94,0.08)] hover:border-corp-muted/60 transition-all duration-200 resize-none ${className}`}
        {...props}
      />
    </div>
  );
}


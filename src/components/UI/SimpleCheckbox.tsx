export function SimpleCheckbox({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void; }) {
    return (
        <label className="self-end text-sm flex items-center space-x-1">
            <input
                className="w-4 h-4 form-checkbox text-red-600 bg-red-300 red-ring rounded"
                type="checkbox"
                checked={value}
                onChange={(event) => onChange(event.target.checked)}
            />
            <span className="select-none">{label}</span>
        </label>
    );
}

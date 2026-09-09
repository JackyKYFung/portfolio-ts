interface TechTagsProps {
    label: string;
    variant: 'glass' | 'solid';
    className?: string;   
}

export function TechTags({ label, variant = 'glass', className = '' }: TechTagsProps) {

    const baseStyles = "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full select-none";

    const variants = {
        glass: "bg-slate-900/60 border border-white/15 text-slate-200 shadow-sm",
        solid: "bg-slate-800 border border-slate-700 text-slate-300",
    }
    
    return (
        <div className={`${baseStyles} ${variants[variant]} ${className}`}>
            {label}
        </div>
    )
}
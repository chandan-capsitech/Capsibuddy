import type { FaqOption } from "../types/faq";

type Props = {
    options: FaqOption[];
    onSelect: (question: string, escalate?: boolean) => void;
};

const OptionGrid = ({ options, onSelect }: Props) => {
    // Append the "Talk to someone" option
    const allOptions: (FaqOption & { escalate?: boolean })[] = [
        ...options,
        { question: "Talk to someone", escalate: true },
    ];

    return allOptions.length > 0 ? (
        <div class="flex flex-col items-end gap-2 my-2 mx-2">
            {allOptions.map((opt, idx) => (
                <button
                    key={idx}
                    onClick={() => onSelect(opt.question, opt.escalate)}
                    class="rounded-3xl border p-1 sm:p-2 font-normal text-xs sm:text-sm cursor-pointer transition border-[#A3B9FA] bg-[#FFFFFF] text-[#6D6CC4] hover:bg-indigo-50 active:bg-indigo-100"
                    aria-label={opt.escalate ? "Talk to someone" : opt.question}
                    type="button"
                >
                    {opt.question}
                </button>
            ))}
        </div>
    ) : null;
};

export default OptionGrid;
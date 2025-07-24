import type { FaqOption } from "../types/faq";

type Props = {
    options: FaqOption[];
    onSelect: (question: string) => void;
};

const OptionGrid = ({ options, onSelect }: Props) =>
    options.length > 0 ? (
        <div class="flex flex-col items-end gap-2 my-2 mx-2">
            {options.map((opt, idx) => (
                <button
                    key={idx}
                    onClick={() => onSelect(opt.question)}
                    class=" rounded-3xl border border-[#A3B9FA] p-2 bg-[#FFFFFF] text-[#6D6CC4] font-normal text-sm hover:bg-indigo-50 active:bg-indigo-100 transition cursor-pointer"
                >
                    {opt.question}
                </button>
            ))}
            <button class=" rounded-3xl border border-[#A3B9FA] p-2 bg-[#FFFFFF] text-[#6D6CC4] font-normal text-sm hover:bg-indigo-50 active:bg-indigo-100 transition cursor-pointer">
                Talk to someone
            </button>
        </div>
    ) : null;

export default OptionGrid;
import type { FunctionalComponent } from "preact";
import type { FaqOption } from "../types/types";

interface Props {
    options: FaqOption[];
    onSelect: (question: string) => void;
}

const OptionGrid: FunctionalComponent<Props> = ({ options, onSelect }) => (
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 mt-6">
        {options.map((opt, idx) => (
            <button
                key={idx}
                type="button"
                onClick={() => onSelect(opt.Question)}
                class="rounded-lg border border-indigo-400 p-4 text-indigo-700 font-semibold text-left shadow hover:bg-indigo-50 transition focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
                {opt.Question}
            </button>
        ))}
    </div>
);

export default OptionGrid;
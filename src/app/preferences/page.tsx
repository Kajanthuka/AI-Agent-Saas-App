import {
    Bell,
    Bot,
    Clock,
    Languages,
    Mail,
    Moon,
    Palette,
    Save,
    SlidersHorizontal,
} from "lucide-react";
import type { ElementType } from "react";

const preferenceCards = [
    {
        title: "Email Preferences",
        description: "Control how emails are sorted, highlighted, and reviewed.",
        icon: Mail,
        options: [
            "Show urgent emails first",
            "Group emails by sender",
            "Highlight unchecked emails",
        ],
    },
    {
        title: "AI Preferences",
        description: "Choose how AI replies and tasks are generated.",
        icon: Bot,
        options: [
            "Auto-generate replies",
            "Create tasks from urgent emails",
            "Use professional reply tone",
        ],
    },
    {
        title: "Notifications",
        description: "Manage alerts for emails, tasks, and suggested replies.",
        icon: Bell,
        options: [
            "New email alerts",
            "Task reminders",
            "AI reply ready alerts",
        ],
    },
];

export default function PreferencesPage() {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-950">Preferences</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage your app preferences here.
                    </p>
                </div>

                <section className="grid gap-6 xl:grid-cols-3">
                    {preferenceCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.title}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                    <Icon size={22} />
                                </div>

                                <h2 className="text-lg font-semibold text-slate-950">
                                    {card.title}
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {card.description}
                                </p>

                                <div className="mt-5 space-y-3">
                                    {card.options.map((option) => (
                                        <label
                                            key={option}
                                            className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 px-3 py-3"
                                        >
                                            <span className="text-sm font-medium text-slate-700">
                                                {option}
                                            </span>

                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="h-4 w-4 accent-emerald-700"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                    <PreferenceSection title="Appearance" icon={Palette}>
                        <div className="space-y-4">
                            <PreferenceSelect
                                label="Theme"
                                icon={Moon}
                                options={["Light", "Dark", "System"]}
                            />

                            <PreferenceSelect
                                label="Accent color"
                                icon={SlidersHorizontal}
                                options={["Emerald", "Blue", "Purple"]}
                            />

                            <PreferenceSelect
                                label="Layout density"
                                icon={SlidersHorizontal}
                                options={["Comfortable", "Compact"]}
                            />
                        </div>
                    </PreferenceSection>

                    <PreferenceSection title="Regional Settings" icon={Clock}>
                        <div className="space-y-4">
                            <PreferenceSelect
                                label="Timezone"
                                icon={Clock}
                                options={["Europe/London", "UTC", "America/New_York"]}
                            />

                            <PreferenceSelect
                                label="Language"
                                icon={Languages}
                                options={["English", "Spanish", "French"]}
                            />

                            <PreferenceSelect
                                label="Date format"
                                icon={Clock}
                                options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]}
                            />
                        </div>
                    </PreferenceSection>
                </section>

                <div className="flex justify-end">
                    <button
                        type="button"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 text-sm font-medium text-white transition hover:bg-emerald-800"
                    >
                        <Save size={18} />
                        Save preferences
                    </button>
                </div>
            </div>
        </main>
    );
}

type PreferenceSectionProps = {
    title: string;
    icon: ElementType;
    children: React.ReactNode;
};

function PreferenceSection({
    title,
    icon: Icon,
    children,
}: PreferenceSectionProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
                <Icon size={22} className="text-emerald-700" />
                <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            </div>

            {children}
        </div>
    );
}

type PreferenceSelectProps = {
    label: string;
    icon: ElementType;
    options: string[];
};

function PreferenceSelect({ label, icon: Icon, options }: PreferenceSelectProps) {
    return (
        <label className="block rounded-xl border border-slate-200 px-3 py-3">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Icon size={16} className="text-emerald-700" />
                {label}
            </span>

            <select className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                {options.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </label>
    );
}

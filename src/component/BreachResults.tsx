import { AlertTriangle, Calendar, ExternalLink } from "lucide-react";

interface BreachProps {
    breach: {
        Name: string;
        Title: string;
        Domain: string;
        BreachDate: string;
        Description: string;
        LogoPath: string;
        DataClasses: string[];
    };
}

export default function BreachResult({ breach }: BreachProps) {
    return (
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-red-500 mb-4 hover:bg-white/5 transition-colors">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Logo Placeholder or Image if allowed */}
                <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-gray-500">
                    {breach.LogoPath ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={breach.LogoPath} alt={breach.Name} className="w-12 h-12 object-contain filter invert" />
                    ) : (
                        breach.Name.charAt(0)
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white">{breach.Title}</h3>
                            <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                                <GlobeIcon domain={breach.Domain} />
                                <span>{breach.Domain}</span>
                                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                <Calendar className="w-3 h-3" /> {breach.BreachDate}
                            </div>
                        </div>
                        <div className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded text-xs font-bold uppercase flex items-center gap-1">
                            <AlertTriangle size={12} /> Leaked
                        </div>
                    </div>

                    <div
                        className="text-gray-300 text-sm mt-3 leading-relaxed opacity-80"
                        dangerouslySetInnerHTML={{ __html: breach.Description }}
                    />

                    <div className="mt-4 flex flex-wrap gap-2">
                        {breach.DataClasses.map((item) => (
                            <span key={item} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-secondary font-medium">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function GlobeIcon({ domain }: { domain: string }) {
    // Simple icon placeholder
    return (
        <ExternalLink className="w-3 h-3" />
    );
}

import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { aiGenerate, type AISection } from "@/lib/ai";
import type { Resume } from "@/lib/resume-types";
import { toast } from "sonner";

type Props = {
  section: AISection;
  resume: Resume;
  context?: string;
  onResult: (text: string) => void;
  label?: string;
};

export function AIGenerateButton({ section, resume, context, onResult, label = "AI Generate" }: Props) {
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const text = await aiGenerate(section, resume, context);
      onResult(text);
      toast.success("AI suggestion applied");
    } catch {
      toast.error("Couldn't generate. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={run}
      disabled={loading}
      className="border-brand/40 text-brand hover:bg-brand/10 hover:text-brand"
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Sparkles className="h-3.5 w-3.5" />
      )}
      {label}
    </Button>
  );
}

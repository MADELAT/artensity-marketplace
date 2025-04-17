import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Tag {
  name: string;
  usage_count: number;
}

export default function PopularTagsCard() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function fetchPopularTags() {
      const { data, error } = await supabase
        .from("tags")
        .select("name, usage_count")
        .order("usage_count", { ascending: false })
        .limit(10);

      if (!error && data) {
        setTags(data);
      }
    }

    fetchPopularTags();
  }, []);

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Etiquetas más usadas</h3>
      </div>
      <div className="space-y-2">
        {tags.map((tag) => (
          <div key={tag.name} className="flex justify-between items-center">
            <span className="text-sm">{tag.name}</span>
            <span className="text-sm font-semibold">{tag.usage_count}</span>
          </div>
        ))}
        {tags.length === 0 && (
          <p className="text-sm text-muted-foreground">Sin datos aún.</p>
        )}
      </div>
    </div>
  );
}

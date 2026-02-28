import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";

// ============================================
// API HOOKS FOR PORTFOLIO
// ============================================

export function usePreviews() {
  return useQuery({
    queryKey: [api.previews.list.path],
    queryFn: async () => {
      const res = await fetch(api.previews.list.path, { credentials: "include" });
      if (!res.ok) throw new Error('Failed to fetch previews');
      const data = await res.json();
      return api.previews.list.responses[200].parse(data);
    },
  });
}

export function useFaqs() {
  return useQuery({
    queryKey: [api.faqs.list.path],
    queryFn: async () => {
      const res = await fetch(api.faqs.list.path, { credentials: "include" });
      if (!res.ok) throw new Error('Failed to fetch FAQs');
      const data = await res.json();
      return api.faqs.list.responses[200].parse(data);
    },
  });
}

export function useStats() {
  return useQuery({
    queryKey: [api.stats.get.path],
    queryFn: async () => {
      const res = await fetch(api.stats.get.path, { credentials: "include" });
      if (!res.ok) throw new Error('Failed to fetch stats');
      const data = await res.json();
      return api.stats.get.responses[200].parse(data);
    },
    // Refresh stats periodically
    refetchInterval: 10000, 
  });
}

export function useIncrementStats() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.stats.increment.path, {
        method: api.stats.increment.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error('Failed to increment stats');
      const data = await res.json();
      return api.stats.increment.responses[200].parse(data);
    },
    onSuccess: (newData) => {
      // Optimistically update the cache with the new view count
      queryClient.setQueryData([api.stats.get.path], newData);
    },
  });
}

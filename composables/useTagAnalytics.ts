import { computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';
import type { TagAnalytics, Tag } from '~/types/lead';

export function useTagAnalytics() {
  const store = useLeadsStore();

  const analytics = computed<TagAnalytics[]>(() => {
    const leads = store.leads;
    const now = new Date();
    // For realistic mock calculations, let's say "current month" is within last 30 days
    const currentMonthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const prevMonthStart = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    return store.globalTags.map((tag: Tag) => {
      const taggedLeads = leads.filter((l) => l.tags.includes(tag.name));
      const usage = taggedLeads.length;

      const convertedLeads = taggedLeads.filter((l) => l.status === 'won');
      const conversionRate = usage > 0 ? (convertedLeads.length / usage) * 100 : 0;

      const revenue = convertedLeads.reduce((sum, l) => sum + (l.value || 0), 0);

      const currentMonthLeads = taggedLeads.filter((l) => new Date(l.createdAt) >= currentMonthStart).length;
      const prevMonthLeads = taggedLeads.filter(
        (l) => new Date(l.createdAt) >= prevMonthStart && new Date(l.createdAt) < currentMonthStart
      ).length;

      const growth = prevMonthLeads > 0 ? ((currentMonthLeads - prevMonthLeads) / prevMonthLeads) * 100 : (currentMonthLeads > 0 ? 100 : 0);

      const engagement = taggedLeads.reduce((sum, l) => {
        const notesCount = l.notes?.length || 0;
        const activitiesCount = l.activities?.length || 0;
        return sum + notesCount * 2 + activitiesCount;
      }, 0);

      return {
        tag: tag.name,
        revenue,
        growth,
        usage,
        conversionRate,
        engagement,
      };
    });
  });

  const getTagRevenue = computed(() => [...analytics.value].sort((a, b) => b.revenue - a.revenue));
  const getTagGrowth = computed(() => [...analytics.value].sort((a, b) => b.growth - a.growth));
  const getTagUsage = computed(() => [...analytics.value].sort((a, b) => b.usage - a.usage));
  const getTagConversionRate = computed(() => [...analytics.value].sort((a, b) => b.conversionRate - a.conversionRate));
  const getTagEngagement = computed(() => [...analytics.value].sort((a, b) => b.engagement - a.engagement));

  const totalRevenue = computed(() => analytics.value.reduce((sum, t) => sum + t.revenue, 0));
  const totalLeadsWithTags = computed(() => analytics.value.reduce((sum, t) => sum + t.usage, 0));
  
  const mostPopularTags = computed(() => getTagUsage.value.slice(0, 3));
  const fastestGrowingTags = computed(() => getTagGrowth.value.slice(0, 3));

  return {
    analytics,
    getTagRevenue,
    getTagGrowth,
    getTagUsage,
    getTagConversionRate,
    getTagEngagement,
    mostPopularTags,
    fastestGrowingTags,
    totalRevenue,
    totalLeadsWithTags,
  };
}

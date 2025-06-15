
import { supabase } from '../integrations/supabase/client.js';

export const clipboardOperations = {
  async getClipboardContent(areaName) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Return empty string if user is not authenticated
        return '';
      }

      const { data, error } = await supabase
        .from('clipboard_areas')
        .select('content')
        .eq('user_id', user.id)
        .eq('area_name', areaName)
        .maybeSingle();

      if (error) {
        console.error('Error getting clipboard content:', error);
        return '';
      }

      return data?.content || '';
    } catch (error) {
      console.error('Error getting clipboard content:', error);
      return '';
    }
  },

  async updateClipboardContent(areaName, content) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('User not authenticated, cannot save clipboard content');
        return;
      }

      // Use upsert to either insert or update the record
      const { error } = await supabase
        .from('clipboard_areas')
        .upsert({
          user_id: user.id,
          area_name: areaName,
          content: content
        }, {
          onConflict: 'user_id,area_name'
        });

      if (error) {
        console.error('Error updating clipboard content:', error);
      }
    } catch (error) {
      console.error('Error updating clipboard content:', error);
    }
  },

  subscribeToClipboardChanges(areaName, callback) {
    const channel = supabase
      .channel(`clipboard_${areaName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clipboard_areas',
          filter: `area_name=eq.${areaName}`
        },
        (payload) => {
          if (payload.new && payload.new.content !== undefined) {
            callback(payload.new.content);
          }
        }
      )
      .subscribe();

    // Return unsubscribe function
    return () => {
      supabase.removeChannel(channel);
    };
  }
};

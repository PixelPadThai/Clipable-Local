
import { supabase } from '../integrations/supabase/client.js';

export const clipboardOperations = {
  async createRoom() {
    try {
      // Generate a new room code
      const { data, error } = await supabase.rpc('generate_room_code');
      
      if (error) {
        console.error('Error generating room code:', error);
        return null;
      }

      const roomCode = data;

      // Create initial clipboard areas for the room
      const { error: insertError } = await supabase
        .from('clipboard_rooms')
        .insert([
          { room_code: roomCode, area_name: 'area_1', content: '' },
          { room_code: roomCode, area_name: 'area_2', content: '' }
        ]);

      if (insertError) {
        console.error('Error creating room areas:', insertError);
        return null;
      }

      return roomCode;
    } catch (error) {
      console.error('Error creating room:', error);
      return null;
    }
  },

  async joinRoom(roomCode) {
    try {
      // Check if room exists by trying to get one of its areas
      const { data, error } = await supabase
        .from('clipboard_rooms')
        .select('room_code')
        .eq('room_code', roomCode)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error checking room:', error);
        return false;
      }

      if (!data) {
        // Room doesn't exist, create it
        const { error: insertError } = await supabase
          .from('clipboard_rooms')
          .insert([
            { room_code: roomCode, area_name: 'area_1', content: '' },
            { room_code: roomCode, area_name: 'area_2', content: '' }
          ]);

        if (insertError) {
          console.error('Error creating room areas:', insertError);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error joining room:', error);
      return false;
    }
  },

  async getClipboardContent(roomCode, areaName) {
    try {
      if (!roomCode) return '';

      const { data, error } = await supabase
        .from('clipboard_rooms')
        .select('content')
        .eq('room_code', roomCode)
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

  async updateClipboardContent(roomCode, areaName, content) {
    try {
      if (!roomCode) return;

      // Update last_accessed when content is updated
      const { error } = await supabase
        .from('clipboard_rooms')
        .upsert({
          room_code: roomCode,
          area_name: areaName,
          content: content,
          last_accessed: new Date().toISOString()
        }, {
          onConflict: 'room_code,area_name'
        });

      if (error) {
        console.error('Error updating clipboard content:', error);
      }
    } catch (error) {
      console.error('Error updating clipboard content:', error);
    }
  },

  subscribeToClipboardChanges(roomCode, areaName, callback) {
    if (!roomCode) return () => {};

    const channel = supabase
      .channel(`clipboard_${roomCode}_${areaName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clipboard_rooms',
          filter: `room_code=eq.${roomCode}.and.area_name=eq.${areaName}`
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

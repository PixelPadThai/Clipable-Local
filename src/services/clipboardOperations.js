import { supabase } from '../integrations/supabase/client.js';

export const clipboardOperations = {
  async createRoom() {
    let roomCode = null;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      attempts++;
      const { data: generatedCode, error: rpcError } = await supabase.rpc('generate_room_code');
      
      if (rpcError) {
        console.error('Error generating room code:', rpcError);
        continue;
      }

      // Try to insert the new room
      const { error: insertError } = await supabase
        .from('clipboard_rooms')
        .insert([
          { room_code: generatedCode, area_name: 'area_1', content: '' },
          { room_code: generatedCode, area_name: 'area_2', content: '' }
        ]);

      if (!insertError) {
        roomCode = generatedCode;
        break; // Success!
      }

      // If it's not a unique constraint violation, then it's an unexpected error.
      if (insertError.code !== '23505') {
        console.error('Error creating room areas:', insertError);
        return null;
      }
      // Otherwise, it's a collision, and the loop will retry.
    }
    
    if (!roomCode) {
      console.error('Failed to create a unique room after multiple attempts.');
    }

    return roomCode;
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
      
      // If data is null, the room doesn't exist.
      return !!data;
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

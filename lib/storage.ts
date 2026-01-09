/**
 * LocalStorage wrapper for Phase 1
 * This will be replaced with Supabase in Phase 2
 */

export const storage = {
  /**
   * Save data to localStorage
   */
  save: async <T>(key: string, data: T): Promise<void> => {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
      throw error;
    }
  },

  /**
   * Load data from localStorage
   */
  load: async <T>(key: string): Promise<T | null> => {
    try {
      const jsonData = localStorage.getItem(key);
      if (!jsonData) return null;
      return JSON.parse(jsonData) as T;
    } catch (error) {
      console.error(`Error loading from localStorage (${key}):`, error);
      return null;
    }
  },

  /**
   * Update specific item in array stored in localStorage
   */
  update: async <T extends { id: string }>(
    key: string,
    id: string,
    updatedItem: Partial<T>
  ): Promise<void> => {
    try {
      const data = await storage.load<T[]>(key);
      if (!data) throw new Error(`No data found for key: ${key}`);

      const index = data.findIndex((item) => item.id === id);
      if (index === -1) throw new Error(`Item not found: ${id}`);

      data[index] = { ...data[index], ...updatedItem };
      await storage.save(key, data);
    } catch (error) {
      console.error(`Error updating localStorage (${key}, ${id}):`, error);
      throw error;
    }
  },

  /**
   * Delete specific item from array stored in localStorage
   */
  delete: async <T extends { id: string }>(key: string, id: string): Promise<void> => {
    try {
      const data = await storage.load<T[]>(key);
      if (!data) throw new Error(`No data found for key: ${key}`);

      const filtered = data.filter((item) => item.id !== id);
      await storage.save(key, filtered);
    } catch (error) {
      console.error(`Error deleting from localStorage (${key}, ${id}):`, error);
      throw error;
    }
  },

  /**
   * Clear specific key from localStorage
   */
  clear: async (key: string): Promise<void> => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error clearing localStorage (${key}):`, error);
      throw error;
    }
  },
};

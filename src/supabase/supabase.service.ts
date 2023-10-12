import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  constructor() {}

  private supabaseClientInstance: SupabaseClient;

  async getClient(): Promise<SupabaseClient> {
    if (this.supabaseClientInstance) {
      return this.supabaseClientInstance;
    }

    this.supabaseClientInstance = createClient(
      'https://mdttalbjettowwtmzfrx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kdHRhbGJqZXR0b3d3dG16ZnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0MjAxODAsImV4cCI6MjAwNTk5NjE4MH0.neNDcYMeCP3h39TJVY2hR7EXjuJrbkHVWqf-th4gzFs',
    );

    return this.supabaseClientInstance;
  }
}

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient;

    private supabaseUrl = 'https://hgbgtsmyozlbgopmflyp.supabase.co';
    private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnYmd0c215b3psYmdvcG1mbHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMTg5ODksImV4cCI6MjA3OTg5NDk4OX0.LoVWass_FghpJ1k4WHI-mCSYv7hMTbqxAWvAZIIj2uM';

    constructor() {
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }

    async insertContact(data: any) {
        const { error } = await this.supabase
            .from('Contactos')
            .insert(data);

        if (error) {
            throw error;
        }
    }
}

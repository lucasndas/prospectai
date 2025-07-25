import { createClient } from '@supabase/supabase-js';

// Essas variáveis devem ser definidas em um arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sua_chave_anonima_do_supabase';

// Função para validar se uma string é uma URL válida
const isValidUrl = (urlString: string): boolean => {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
};

// Verifica se as variáveis de ambiente estão configuradas corretamente
export const isSupabaseConfigured = 
  supabaseUrl !== 'https://example.supabase.co' && 
  supabaseAnonKey !== 'sua_chave_anonima_do_supabase' &&
  isValidUrl(supabaseUrl);

// Cria o cliente Supabase apenas se as variáveis estiverem configuradas
let supabaseClient;

try {
  // Cria o cliente apenas se o Supabase estiver configurado corretamente
  if (isSupabaseConfigured) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    throw new Error('Supabase não está configurado corretamente');
  }
} catch (error) {
  console.error('Erro ao criar cliente Supabase:', error);
  // Cria um cliente com métodos vazios para evitar erros
  supabaseClient = {
    auth: {
      getUser: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') }),
      signInWithOAuth: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') }),
      signUp: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => Promise.resolve({ data: [], error: new Error('Supabase não configurado') }),
      insert: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') }),
      order: () => ({ limit: () => Promise.resolve({ data: [], error: new Error('Supabase não configurado') }) })
    }),
    storage: {
      from: () => ({
        list: () => Promise.resolve({ data: [], error: new Error('Supabase não configurado') }),
        upload: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') }),
        createSignedUrl: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') })
      })
    },
    functions: {
      invoke: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') })
    },
    channel: () => ({
      on: () => ({ subscribe: () => {} }),
      subscribe: () => {}
    }),
    removeChannel: () => {}
  };
}

export const supabase = supabaseClient;
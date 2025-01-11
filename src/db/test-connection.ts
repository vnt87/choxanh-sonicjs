import { D1Database } from '@cloudflare/workers-types';

interface Env {
  D1: D1Database;
}

export default {
  async fetch(request: Request, env: Env) {
    try {
      // Test query
      const result = await env.D1.prepare('SELECT 1 as test').first();
      
      return new Response(JSON.stringify({
        success: true,
        result
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};

import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => new Response("Thanks for checking in - I'm healthy 💚💚");

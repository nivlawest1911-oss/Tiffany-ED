/**
 * EdIntel Physical Empty Sentinel
 * This file is used by Webpack's NormalModuleReplacementPlugin to replace 
 * server-only modules during the client-side bundle generation.
 */

// Mock Prisma
export const PrismaClient = class {
    constructor() { }
    $connect() { return Promise.resolve(); }
    $disconnect() { return Promise.resolve(); }
};

// Mock Auth
export const auth = {
    handler: () => new Response(null, { status: 200 }),
    getSession: async () => null,
    api: {},
    options: {}
};

export const handlers = {
    GET: () => new Response(null, { status: 200 }),
    POST: () => new Response(null, { status: 200 })
};

// Mock Lucide Icons (Social Fallbacks)
// These prevent "Attempted import error" if barrel optimization leaks these names

const EmptyIcon = () => null;
export const Facebook = EmptyIcon;
export const Linkedin = EmptyIcon;
export const Github = EmptyIcon;
export const Twitter = EmptyIcon;
export const Instagram = EmptyIcon;
export const Youtube = EmptyIcon;

// Default export
const Empty = {};
export default Empty;

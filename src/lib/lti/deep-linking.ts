import { SignJWT, importPKCS8 } from 'jose';

export interface DeepLinkContentItem {
  type: 'ltiResourceLink' | 'html' | 'link' | 'file';
  title: string;
  url: string;
  custom?: Record<string, string>;
  thumbnail?: { url: string; width?: number; height?: number };
  text?: string;
  lineItem?: {
    label: string;
    scoreMaximum: number;
    resourceId?: string;
    tag?: string;
  };
}

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

export const EDINTEL_DEEP_LINK_RESOURCES: DeepLinkContentItem[] = [
  {
    type: 'ltiResourceLink',
    title: 'EdIntel Sovereign Dashboard',
    url: `${getBaseUrl()}/dashboard`,
    custom: { view: 'teacher-dashboard' },
    text: 'Main teacher workspace with class overview, at-risk alerts, and AI Multiplier access.',
  },
  {
    type: 'ltiResourceLink',
    title: 'Tiffany-ED Lesson Planner (AI Multiplier)',
    url: `${getBaseUrl()}/tiffany-ed`,
    custom: { view: 'tiffany-ed' },
    text: 'AI-powered lesson scaffold and rubric feedback engine.',
    lineItem: { label: 'Tiffany-ED Activity', scoreMaximum: 100, tag: 'lesson_scaffold' },
  },
  {
    type: 'ltiResourceLink',
    title: 'Student Grouping & Tier Analysis',
    url: `${getBaseUrl()}/grouping`,
    custom: { view: 'grouping' },
    text: 'Automatic evidence-based grouping with Tier 1/2/3 recommendations.',
  },
  {
    type: 'ltiResourceLink',
    title: 'Science of Reading Progress Monitor',
    url: `${getBaseUrl()}/progress`,
    custom: { view: 'progress' },
    text: 'ALCOS-aligned phonics, fluency, and comprehension progress charts.',
    lineItem: { label: 'Reading Progress Check', scoreMaximum: 100, tag: 'progress_insight' },
  },
  {
    type: 'ltiResourceLink',
    title: 'Parent Portal (Family View)',
    url: `${getBaseUrl()}/parent-portal`,
    custom: { view: 'parent-portal' },
    text: 'FERPA-compliant parent view showing real-time student progress.',
  },
];

export interface BuildDeepLinkJwtParams {
  deepLinkReturnUrl: string;
  clientId: string;
  items: DeepLinkContentItem[];
  privateKeyPem: string;
  deploymentId?: string;
}

export async function buildDeepLinkResponseJwt(
  params: BuildDeepLinkJwtParams
): Promise<string> {
  const privateKey = await importPKCS8(params.privateKeyPem, 'RS256');

  const contentItems = params.items.map((item) => {
    const base: Record<string, unknown> = {
      type: item.type,
      title: item.title,
    };

    if (item.type === 'ltiResourceLink') {
      base.url = item.url;
      if (item.custom) base.custom = item.custom;
      if (item.text) base.text = item.text;
      if (item.thumbnail) base.thumbnail = item.thumbnail;
      if (item.lineItem) base.lineItem = item.lineItem;
    } else if (item.type === 'link' || item.type === 'html') {
      base.url = item.url;
      if (item.text) base.text = item.text;
    }

    return base;
  });

  return new SignJWT({
    'https://purl.imsglobal.org/spec/lti/claim/message_type': 'LtiDeepLinkingResponse',
    'https://purl.imsglobal.org/spec/lti/claim/version': '1.3.0',
    'https://purl.imsglobal.org/spec/lti/claim/deployment_id': params.deploymentId ?? 'default',
    'https://purl.imsglobal.org/spec/lti-dl/claim/content_items': contentItems,
  })
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuer(params.clientId)
    .setAudience(params.deepLinkReturnUrl)
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(privateKey);
}

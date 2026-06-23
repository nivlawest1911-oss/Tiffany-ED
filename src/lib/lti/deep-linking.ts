/**
 * LTI 1.3 Advantage – Deep Linking (Content Item Selection)
 *
 * Allows teachers to select specific EdIntel views to embed inside
 * Canvas/Clever/Google Classroom. The LMS calls EdIntel's deep link
 * endpoint, the teacher picks a resource, and EdIntel returns a signed
 * JWT that the LMS embeds as a permanent launch link.
 *
 * Spec: https://www.imsglobal.org/spec/lti-dl/v2p0
 */

export interface DeepLinkContentItem {
  /** LTI resource link (most common for EdIntel views) */
  type: 'ltiResourceLink' | 'html' | 'link' | 'file';
  /** Friendly title shown in the LMS activity list */
  title: string;
  /** Target URL for the resource (must be absolute in production) */
  url: string;
  /** Optional custom params forwarded to EdIntel on launch */
  custom?: Record<string, string>;
  /** Optional thumbnail for richer LMS UI */
  thumbnail?: { url: string; width?: number; height?: number };
  /** Descriptive text for the LMS */
  text?: string;
  /** Line item to auto-create in the gradebook */
  lineItem?: {
    label: string;
    scoreMaximum: number;
    resourceId?: string;
    tag?: string;
  };
}

/** Static catalogue of EdIntel resources available for Deep Linking */
export const EDINTEL_DEEP_LINK_RESOURCES: DeepLinkContentItem[] = [
  {
    type: 'ltiResourceLink',
    title: 'EdIntel Sovereign Dashboard',
    url: '/dashboard',
    custom: { view: 'teacher-dashboard' },
    text: 'Main teacher workspace with class overview, at-risk alerts, and AI Multiplier access.',
  },
  {
    type: 'ltiResourceLink',
    title: 'Tiffany-ED Lesson Planner (AI Multiplier)',
    url: '/tiffany-ed',
    custom: { view: 'tiffany-ed' },
    text: 'AI-powered lesson scaffold and rubric feedback engine — ALCOS + Science of Reading aligned.',
    lineItem: { label: 'Tiffany-ED Activity', scoreMaximum: 100, tag: 'lesson_scaffold' },
  },
  {
    type: 'ltiResourceLink',
    title: 'Student Grouping & Tier Analysis',
    url: '/grouping',
    custom: { view: 'grouping' },
    text: 'Automatic evidence-based grouping with Tier 1/2/3 recommendations.',
  },
  {
    type: 'ltiResourceLink',
    title: 'Science of Reading Progress Monitor',
    url: '/progress',
    custom: { view: 'progress' },
    text: 'ALCOS-aligned phonics, fluency, and comprehension progress charts.',
    lineItem: { label: 'Reading Progress Check', scoreMaximum: 100, tag: 'progress_insight' },
  },
  {
    type: 'ltiResourceLink',
    title: 'Parent Portal (Family View)',
    url: '/parent-portal',
    custom: { view: 'parent-portal' },
    text: 'FERPA-compliant parent view showing real-time student progress.',
  },
];

export interface BuildDeepLinkJwtParams {
  /** Return URL provided by the LMS in the deep linking launch */
  deepLinkReturnUrl: string;
  /** Client ID of the LTI platform */
  clientId: string;
  /** Selected content items to embed */
  items: DeepLinkContentItem[];
  /** EdIntel private key (PEM) for signing the response JWT */
  privateKeyPem: string;
  /** Deployment ID from the launch token */
  deploymentId?: string;
}

/**
 * Builds and signs the Deep Linking Response JWT to send back to the LMS.
 * The LMS uses this to register the selected resources as embedded activities.
 */
export async function buildDeepLinkResponseJwt(
  params: BuildDeepLinkJwtParams
): Promise<string> {
  const { SignJWT, importPKCS8 } = await import('jose');
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
    'https://purl.imsglobal.org/spec/lti/claim/message_type':
      'LtiDeepLinkingResponse',
    'https://purl.imsglobal.org/spec/lti/claim/version': '1.3.0',
    'https://purl.imsglobal.org/spec/lti/claim/deployment_id':
      params.deploymentId ?? 'default',
    'https://purl.imsglobal.org/spec/lti-dl/claim/content_items': contentItems,
  })
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuer(params.clientId)
    .setAudience(params.deepLinkReturnUrl)
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(privateKey);
}

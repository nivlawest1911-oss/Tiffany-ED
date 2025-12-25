export const shareToSocial = async (platform: "twitter" | "linkedin", studentName: string, achievement: string) => {
  const message = `${studentName} just reached a new level of Cognitive Fitness on EdIntel! Achievement: ${achievement}`;
  const url = `https://eduintel.web.app/vision`;
  
  const platforms = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
  };
  
  window.open(platforms[platform], "_blank");
};

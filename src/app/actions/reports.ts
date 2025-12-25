export const ENTITY_MAP = {
  FED: "U.S. Department of Education | Washington, D.C.",
  STATE: "Alabama State Department of Education | Montgomery, AL",
  DISTRICT: "Mobile County Public Schools | 1 Magnum Pass",
  SCHOOL: "Continuous Learning Center | 1870 Pleasant Ave"
};

export const generateSovereignHeader = () => {
  return `OFFICIAL REPORT: ${ENTITY_MAP.SCHOOL} under the authority of ${ENTITY_MAP.DISTRICT}, ${ENTITY_MAP.STATE}, and ${ENTITY_MAP.FED}`;
};


CREATE TABLE IF NOT EXISTS "lti_line_items" (
  "id" TEXT NOT NULL,
  "platformId" TEXT NOT NULL,
  "resourceLinkId" TEXT,
  "lineItemUrl" TEXT,
  "label" TEXT NOT NULL,
  "scoreMaximum" DOUBLE PRECISION NOT NULL DEFAULT 100,
  "resourceId" TEXT,
  "tag" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "lti_line_items_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "lti_line_items_platformId_fkey"
    FOREIGN KEY ("platformId") REFERENCES "lti_platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "lti_line_items_platformId_idx" ON "lti_line_items"("platformId");
CREATE INDEX IF NOT EXISTS "lti_line_items_resourceLinkId_idx" ON "lti_line_items"("resourceLinkId");

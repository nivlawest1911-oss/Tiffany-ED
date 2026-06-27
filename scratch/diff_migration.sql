-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "aal_level" AS ENUM ('aal1', 'aal2', 'aal3');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('TEACHER', 'ADMIN', 'COUNSELOR', 'STUDENT', 'SUPERINTENDENT', 'EXECUTIVE', 'PRINCIPAL');

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "eventType" TEXT NOT NULL,
    "eventCategory" TEXT NOT NULL,
    "eventAction" TEXT NOT NULL,
    "eventLabel" TEXT,
    "latency" DOUBLE PRECISION,
    "tokensUsed" INTEGER,
    "gcpCost" DOUBLE PRECISION,
    "metadata" JSONB,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_insights" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "school_id" TEXT,
    "date" DATE NOT NULL,
    "time_saved_hours" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "lessons_created" INTEGER NOT NULL DEFAULT 0,
    "students_engaged" INTEGER NOT NULL DEFAULT 0,
    "assessments_created" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_insights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatar_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avatar_id" TEXT,
    "avatarName" TEXT NOT NULL,
    "avatarRole" TEXT NOT NULL,
    "engine" TEXT NOT NULL DEFAULT 'duix',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "latencyAvg" DOUBLE PRECISION,
    "conversationLog" JSONB NOT NULL,
    "userSentiment" TEXT,
    "gcpSessionId" TEXT,
    "vertexAiModel" TEXT NOT NULL DEFAULT 'gemini-1.5-pro',
    "cloudRunEndpoint" TEXT,
    "thoughtSignatures" JSONB,

    CONSTRAINT "avatar_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "system_prompt" TEXT NOT NULL,
    "voice_id" TEXT NOT NULL,
    "avatar_image_url" TEXT,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avatars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companion_certificates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "creator_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "tier" TEXT NOT NULL DEFAULT 'NOVICE',
    "persona" JSONB DEFAULT '{}',
    "voice_id" TEXT DEFAULT 'eleven_labs_default',
    "avatar_id" TEXT DEFAULT 'heygen_default',
    "master_system_prompt" TEXT NOT NULL DEFAULT '',
    "district_id" TEXT DEFAULT 'MOBILE_COUNTY_AL',
    "metadata" JSONB DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),

    CONSTRAINT "companion_certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_messages" (
    "id" TEXT NOT NULL,
    "session_id" TEXT,
    "user_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "feedback" INTEGER,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversation_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district_nodes" (
    "id" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'optimal',
    "health" DOUBLE PRECISION NOT NULL DEFAULT 95.0,
    "active_swarms" INTEGER NOT NULL DEFAULT 0,
    "last_pulse" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "vaultCompliance" DOUBLE PRECISION NOT NULL DEFAULT 100.0,
    "vaultDocumentCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "district_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "districts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "health" DOUBLE PRECISION NOT NULL DEFAULT 98.0,
    "last_pulse" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "evidenceFolderId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "gcpBucketPath" TEXT NOT NULL,
    "gcpSignedUrl" TEXT,
    "urlExpiresAt" TIMESTAMP(3),
    "encrypted" BOOLEAN NOT NULL DEFAULT true,
    "accessLevel" TEXT NOT NULL DEFAULT 'private',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidence_folders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "gradeLevel" TEXT,
    "specialEdStatus" TEXT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "aiSummary" TEXT,
    "riskLevel" TEXT,
    "complianceScore" DOUBLE PRECISION,

    CONSTRAINT "evidence_folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generated_content_hub" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "prompt" TEXT NOT NULL,
    "content" JSONB,
    "legacy_content" TEXT,
    "subject" TEXT,
    "grade_level" TEXT,
    "media_urls" TEXT[],
    "ai_model" TEXT,
    "tokens_used" INTEGER,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "generated_content_hub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "generatorId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "professorVideoUrl" TEXT,
    "avatarEngine" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "generations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "graph_edges" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "properties" JSONB,
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "graph_edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "graph_nodes" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "properties" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "graph_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "companion_id" UUID,
    "owner_id" TEXT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" vector,
    "metadata" JSONB DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "knowledge_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legacy_ledger" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "directive" TEXT NOT NULL,
    "logic" TEXT NOT NULL,
    "swarm_context" JSONB NOT NULL,
    "outcome" TEXT,
    "learnings" TEXT,
    "is_immutable" BOOLEAN NOT NULL DEFAULT true,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "legacy_ledger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "evidenceFolderId" TEXT,
    "avatarSessionId" TEXT,
    "observationType" TEXT NOT NULL,
    "observationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER,
    "description" TEXT NOT NULL,
    "context" TEXT,
    "interventions" TEXT,
    "aiAnalysis" TEXT,
    "suggestedActions" JSONB,
    "legalCompliance" BOOLEAN NOT NULL DEFAULT false,
    "hasAudio" BOOLEAN NOT NULL DEFAULT false,
    "hasVideo" BOOLEAN NOT NULL DEFAULT false,
    "hasImages" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "observations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tier" TEXT NOT NULL DEFAULT 'SCHOOL_SITE',
    "trial_started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trial_starts_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trial_ends_at" TIMESTAMP(3) NOT NULL,
    "is_trial_converted" BOOLEAN NOT NULL DEFAULT false,
    "usage_tokens" INTEGER NOT NULL DEFAULT 0,
    "address" TEXT,
    "contact_email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_items" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "folder_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schools" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "district_name" TEXT,
    "state" TEXT,
    "zip_code" TEXT,
    "admin_id" TEXT,
    "stripe_customer_id" TEXT,
    "subscription_tier" TEXT NOT NULL DEFAULT 'free',
    "max_users" INTEGER NOT NULL DEFAULT 5,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semantic_caches" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "hit_count" INTEGER NOT NULL DEFAULT 0,
    "last_hit_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "semantic_caches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strategic_vault" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "content" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "strategic_vault_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "school_id" TEXT,
    "stripe_subscription_id" TEXT NOT NULL,
    "stripe_price_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "current_period_start" TIMESTAMP(3) NOT NULL,
    "current_period_end" TIMESTAMP(3) NOT NULL,
    "cancel_at_period_end" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "signup_fee_paid" BOOLEAN NOT NULL DEFAULT false,
    "trial_ends_at" TIMESTAMP(3),
    "trial_started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_feedback" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "type" TEXT NOT NULL,
    "rating" INTEGER,
    "message" TEXT,
    "context_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stripeUrl" TEXT NOT NULL,

    CONSTRAINT "tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_ledger" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "wallet_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'DEBIT',
    "description" TEXT,
    "generation_type" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_ledger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token_wallets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "monthly_limit" INTEGER NOT NULL DEFAULT 1000,
    "daily_limit" INTEGER NOT NULL DEFAULT 100,
    "tokens_used_this_month" INTEGER NOT NULL DEFAULT 0,
    "tokens_used_today" INTEGER NOT NULL DEFAULT 0,
    "last_reset_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requires_upsell" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "token_wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usage_tracking" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "month" DATE NOT NULL,
    "conversations_count" INTEGER NOT NULL DEFAULT 0,
    "messages_count" INTEGER NOT NULL DEFAULT 0,
    "content_generated" INTEGER NOT NULL DEFAULT 0,
    "images_generated" INTEGER NOT NULL DEFAULT 0,
    "videos_generated" INTEGER NOT NULL DEFAULT 0,
    "voice_minutes" INTEGER NOT NULL DEFAULT 0,
    "tokens_used" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "usage_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerk_id" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'TEACHER',
    "district" TEXT,
    "school" TEXT,
    "school_site" TEXT,
    "position" TEXT,
    "bio" TEXT,
    "organization_id" TEXT,
    "school_id" TEXT,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "subscription_tier" TEXT NOT NULL DEFAULT 'free',
    "subscription_status" TEXT NOT NULL DEFAULT 'inactive',
    "usage_tokens" INTEGER NOT NULL DEFAULT 10,
    "xp_points" INTEGER NOT NULL DEFAULT 0,
    "trial_started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trial_ends_at" TIMESTAMP(3),
    "is_trial_converted" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "tier_id" TEXT,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3),
    "password" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "lastUplinkAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vault_audits" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vault_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vault_documents" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "fileType" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "isEncrypted" BOOLEAN NOT NULL DEFAULT true,
    "securityLevel" TEXT NOT NULL DEFAULT 'confidential',
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "encrypted_content" TEXT,
    "encryption_iv" TEXT,

    CONSTRAINT "vault_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vault_ocr" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "extractedText" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vault_ocr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "student_sis_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "grade_level" TEXT NOT NULL,
    "school_id" TEXT,
    "lexile_level" INTEGER,
    "lexile_history" JSONB,
    "ell_status" TEXT,
    "native_language" TEXT,
    "sped_status" TEXT,
    "dyslexia_flag" BOOLEAN NOT NULL DEFAULT false,
    "intervention_tier" TEXT,
    "ala_skill_profile" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screener_results" (
    "id" TEXT NOT NULL,
    "student_profile_id" TEXT NOT NULL,
    "screener_platform" TEXT NOT NULL,
    "assessment_window" TEXT NOT NULL,
    "assessment_date" TIMESTAMP(3) NOT NULL,
    "composite_score" DOUBLE PRECISION,
    "risk_level" TEXT,
    "skill_scores" JSONB NOT NULL,
    "raw_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "screener_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "differentiated_materials" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "student_profile_id" TEXT,
    "title" TEXT NOT NULL,
    "source_input" TEXT NOT NULL,
    "target_lexile" INTEGER NOT NULL,
    "output_lexile" INTEGER,
    "dok_level" INTEGER NOT NULL DEFAULT 2,
    "content_type" TEXT NOT NULL,
    "generated_content" JSONB NOT NULL,
    "academic_standard" TEXT,
    "subject" TEXT,
    "grade_level" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "exported_to" TEXT,
    "tokens_used" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "differentiated_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading_improvement_plans" (
    "id" TEXT NOT NULL,
    "student_profile_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "school_year" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "deficit_areas" JSONB NOT NULL,
    "intervention_program" TEXT,
    "daily_materials" JSONB,
    "progress_notes" JSONB,
    "parent_notified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reading_improvement_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district_listening" (
    "id" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,
    "snapshot_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title_i_revenue" DOUBLE PRECISION,
    "erate_cat2_budget" DOUBLE PRECISION,
    "virtual_readiness" INTEGER,
    "hardware_score" DOUBLE PRECISION,
    "broadband_mbps" DOUBLE PRECISION,
    "teacher_training_pct" DOUBLE PRECISION,
    "edtech_tools" JSONB,
    "enrollment_total" INTEGER,
    "free_reduced_pct" DOUBLE PRECISION,
    "ela_proficiency_pct" DOUBLE PRECISION,
    "math_proficiency_pct" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "district_listening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "infra_monitors" (
    "id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "device_type" TEXT NOT NULL,
    "device_name" TEXT NOT NULL,
    "location" TEXT,
    "status" TEXT NOT NULL DEFAULT 'normal',
    "metrics" JSONB,
    "alert_threshold" JSONB,
    "last_heartbeat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "infra_monitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "infra_alerts" (
    "id" TEXT NOT NULL,
    "monitor_id" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metric_snapshot" JSONB,
    "acknowledged" BOOLEAN NOT NULL DEFAULT false,
    "acknowledged_by" TEXT,
    "resolved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "infra_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "actorRole" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT,
    "details" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "sessionId" TEXT,
    "outcome" TEXT NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educator_ai_interactions" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "studentId" TEXT,
    "classId" TEXT,
    "interactionType" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "aiResponse" TEXT NOT NULL,
    "standardsAligned" TEXT[],
    "rubricCriteria" JSONB,
    "modelUsed" TEXT,
    "tokensUsed" INTEGER,
    "sessionId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "educator_ai_interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lti_platforms" (
    "id" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "deploymentId" TEXT,
    "platformName" TEXT,
    "jwksUrl" TEXT NOT NULL,
    "authTokenUrl" TEXT NOT NULL,
    "authLoginUrl" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "lti_platforms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "analytics_events_eventType_timestamp_idx" ON "analytics_events"("eventType", "timestamp");

-- CreateIndex
CREATE INDEX "analytics_events_userId_timestamp_idx" ON "analytics_events"("userId", "timestamp");

-- CreateIndex
CREATE INDEX "analytics_insights_date_idx" ON "analytics_insights"("date");

-- CreateIndex
CREATE INDEX "analytics_insights_school_id_idx" ON "analytics_insights"("school_id");

-- CreateIndex
CREATE INDEX "analytics_insights_user_id_idx" ON "analytics_insights"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "avatar_sessions_gcpSessionId_key" ON "avatar_sessions"("gcpSessionId");

-- CreateIndex
CREATE INDEX "avatar_sessions_gcpSessionId_idx" ON "avatar_sessions"("gcpSessionId");

-- CreateIndex
CREATE INDEX "avatar_sessions_userId_startedAt_idx" ON "avatar_sessions"("userId", "startedAt");

-- CreateIndex
CREATE INDEX "idx_companion_certificates_created" ON "companion_certificates"("created_at" DESC);

-- CreateIndex
CREATE INDEX "idx_companion_certificates_creator" ON "companion_certificates"("creator_id");

-- CreateIndex
CREATE INDEX "idx_companion_certificates_district" ON "companion_certificates"("district_id");

-- CreateIndex
CREATE INDEX "conversation_messages_session_id_idx" ON "conversation_messages"("session_id");

-- CreateIndex
CREATE INDEX "conversation_messages_user_id_idx" ON "conversation_messages"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "district_nodes_district_id_name_key" ON "district_nodes"("district_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "districts_name_key" ON "districts"("name");

-- CreateIndex
CREATE INDEX "documents_evidenceFolderId_idx" ON "documents"("evidenceFolderId");

-- CreateIndex
CREATE INDEX "documents_fileType_idx" ON "documents"("fileType");

-- CreateIndex
CREATE INDEX "evidence_folders_category_riskLevel_idx" ON "evidence_folders"("category", "riskLevel");

-- CreateIndex
CREATE INDEX "evidence_folders_userId_studentId_idx" ON "evidence_folders"("userId", "studentId");

-- CreateIndex
CREATE INDEX "generated_content_hub_type_idx" ON "generated_content_hub"("type");

-- CreateIndex
CREATE INDEX "generated_content_hub_user_id_idx" ON "generated_content_hub"("user_id");

-- CreateIndex
CREATE INDEX "generations_generatorId_idx" ON "generations"("generatorId");

-- CreateIndex
CREATE INDEX "generations_userId_createdAt_idx" ON "generations"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "graph_edges_sourceId_idx" ON "graph_edges"("sourceId");

-- CreateIndex
CREATE INDEX "graph_edges_targetId_idx" ON "graph_edges"("targetId");

-- CreateIndex
CREATE INDEX "graph_edges_type_idx" ON "graph_edges"("type");

-- CreateIndex
CREATE INDEX "graph_nodes_label_idx" ON "graph_nodes"("label");

-- CreateIndex
CREATE INDEX "idx_knowledge_embeddings" ON "knowledge_documents"("embedding");

-- CreateIndex
CREATE INDEX "knowledge_documents_embedding_idx" ON "knowledge_documents"("embedding");

-- CreateIndex
CREATE INDEX "knowledge_documents_embedding_idx1" ON "knowledge_documents"("embedding");

-- CreateIndex
CREATE INDEX "legacy_ledger_user_id_idx" ON "legacy_ledger"("user_id");

-- CreateIndex
CREATE INDEX "observations_evidenceFolderId_idx" ON "observations"("evidenceFolderId");

-- CreateIndex
CREATE INDEX "observations_observationType_idx" ON "observations"("observationType");

-- CreateIndex
CREATE INDEX "observations_userId_observationDate_idx" ON "observations"("userId", "observationDate");

-- CreateIndex
CREATE INDEX "saved_items_user_id_idx" ON "saved_items"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "saved_items_user_id_content_id_key" ON "saved_items"("user_id", "content_id");

-- CreateIndex
CREATE UNIQUE INDEX "schools_stripe_customer_id_key" ON "schools"("stripe_customer_id");

-- CreateIndex
CREATE INDEX "schools_admin_id_idx" ON "schools"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_stripe_subscription_id_key" ON "subscriptions"("stripe_subscription_id");

-- CreateIndex
CREATE INDEX "subscriptions_school_id_idx" ON "subscriptions"("school_id");

-- CreateIndex
CREATE INDEX "subscriptions_user_id_idx" ON "subscriptions"("user_id");

-- CreateIndex
CREATE INDEX "system_feedback_created_at_idx" ON "system_feedback"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tiers_name_key" ON "tiers"("name");

-- CreateIndex
CREATE INDEX "token_ledger_wallet_id_timestamp_idx" ON "token_ledger"("wallet_id", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "token_wallets_user_id_key" ON "token_wallets"("user_id");

-- CreateIndex
CREATE INDEX "usage_tracking_user_id_idx" ON "usage_tracking"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "usage_tracking_user_id_month_key" ON "usage_tracking"("user_id", "month");

-- CreateIndex
CREATE UNIQUE INDEX "users_clerk_id_key" ON "users"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_subscription_id_key" ON "users"("stripe_subscription_id");

-- CreateIndex
CREATE INDEX "users_clerk_id_idx" ON "users"("clerk_id");

-- CreateIndex
CREATE INDEX "users_district_school_idx" ON "users"("district", "school");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_organization_id_idx" ON "users"("organization_id");

-- CreateIndex
CREATE INDEX "users_school_id_idx" ON "users"("school_id");

-- CreateIndex
CREATE INDEX "vault_audits_documentId_idx" ON "vault_audits"("documentId");

-- CreateIndex
CREATE INDEX "vault_documents_userId_idx" ON "vault_documents"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "vault_ocr_documentId_key" ON "vault_ocr"("documentId");

-- CreateIndex
CREATE INDEX "student_profiles_school_id_idx" ON "student_profiles"("school_id");

-- CreateIndex
CREATE INDEX "student_profiles_grade_level_lexile_level_idx" ON "student_profiles"("grade_level", "lexile_level");

-- CreateIndex
CREATE UNIQUE INDEX "student_profiles_user_id_student_sis_id_key" ON "student_profiles"("user_id", "student_sis_id");

-- CreateIndex
CREATE INDEX "screener_results_student_profile_id_assessment_window_idx" ON "screener_results"("student_profile_id", "assessment_window");

-- CreateIndex
CREATE INDEX "screener_results_screener_platform_idx" ON "screener_results"("screener_platform");

-- CreateIndex
CREATE INDEX "differentiated_materials_user_id_idx" ON "differentiated_materials"("user_id");

-- CreateIndex
CREATE INDEX "differentiated_materials_student_profile_id_idx" ON "differentiated_materials"("student_profile_id");

-- CreateIndex
CREATE INDEX "differentiated_materials_target_lexile_idx" ON "differentiated_materials"("target_lexile");

-- CreateIndex
CREATE INDEX "reading_improvement_plans_student_profile_id_idx" ON "reading_improvement_plans"("student_profile_id");

-- CreateIndex
CREATE INDEX "district_listening_district_id_snapshot_date_idx" ON "district_listening"("district_id", "snapshot_date");

-- CreateIndex
CREATE INDEX "infra_monitors_school_id_device_type_idx" ON "infra_monitors"("school_id", "device_type");

-- CreateIndex
CREATE INDEX "infra_monitors_status_idx" ON "infra_monitors"("status");

-- CreateIndex
CREATE INDEX "infra_alerts_monitor_id_idx" ON "infra_alerts"("monitor_id");

-- CreateIndex
CREATE INDEX "infra_alerts_severity_acknowledged_idx" ON "infra_alerts"("severity", "acknowledged");

-- CreateIndex
CREATE INDEX "audit_logs_timestamp_idx" ON "audit_logs"("timestamp");

-- CreateIndex
CREATE INDEX "audit_logs_actorId_idx" ON "audit_logs"("actorId");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_resourceType_resourceId_idx" ON "audit_logs"("resourceType", "resourceId");

-- CreateIndex
CREATE INDEX "educator_ai_interactions_teacherId_timestamp_idx" ON "educator_ai_interactions"("teacherId", "timestamp");

-- CreateIndex
CREATE INDEX "educator_ai_interactions_studentId_timestamp_idx" ON "educator_ai_interactions"("studentId", "timestamp");

-- CreateIndex
CREATE INDEX "educator_ai_interactions_classId_timestamp_idx" ON "educator_ai_interactions"("classId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "lti_platforms_issuer_key" ON "lti_platforms"("issuer");

-- AddForeignKey
ALTER TABLE "analytics_insights" ADD CONSTRAINT "analytics_insights_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics_insights" ADD CONSTRAINT "analytics_insights_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avatar_sessions" ADD CONSTRAINT "avatar_sessions_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "avatars"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avatar_sessions" ADD CONSTRAINT "avatar_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_messages" ADD CONSTRAINT "conversation_messages_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "avatar_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_messages" ADD CONSTRAINT "conversation_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district_nodes" ADD CONSTRAINT "district_nodes_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_evidenceFolderId_fkey" FOREIGN KEY ("evidenceFolderId") REFERENCES "evidence_folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence_folders" ADD CONSTRAINT "evidence_folders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generated_content_hub" ADD CONSTRAINT "generated_content_hub_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generations" ADD CONSTRAINT "generations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "graph_edges" ADD CONSTRAINT "graph_edges_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "graph_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "graph_edges" ADD CONSTRAINT "graph_edges_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "graph_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_documents" ADD CONSTRAINT "knowledge_documents_companion_id_fkey" FOREIGN KEY ("companion_id") REFERENCES "companion_certificates"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "knowledge_documents" ADD CONSTRAINT "knowledge_documents_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "legacy_ledger" ADD CONSTRAINT "legacy_ledger_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observations" ADD CONSTRAINT "observations_avatarSessionId_fkey" FOREIGN KEY ("avatarSessionId") REFERENCES "avatar_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observations" ADD CONSTRAINT "observations_evidenceFolderId_fkey" FOREIGN KEY ("evidenceFolderId") REFERENCES "evidence_folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observations" ADD CONSTRAINT "observations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_items" ADD CONSTRAINT "saved_items_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "generated_content_hub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_items" ADD CONSTRAINT "saved_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schools" ADD CONSTRAINT "schools_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategic_vault" ADD CONSTRAINT "strategic_vault_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_feedback" ADD CONSTRAINT "system_feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token_ledger" ADD CONSTRAINT "token_ledger_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "token_wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token_wallets" ADD CONSTRAINT "token_wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usage_tracking" ADD CONSTRAINT "usage_tracking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tier_id_fkey" FOREIGN KEY ("tier_id") REFERENCES "tiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vault_audits" ADD CONSTRAINT "vault_audits_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "vault_documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vault_documents" ADD CONSTRAINT "vault_documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vault_ocr" ADD CONSTRAINT "vault_ocr_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "vault_documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "screener_results" ADD CONSTRAINT "screener_results_student_profile_id_fkey" FOREIGN KEY ("student_profile_id") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "differentiated_materials" ADD CONSTRAINT "differentiated_materials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "differentiated_materials" ADD CONSTRAINT "differentiated_materials_student_profile_id_fkey" FOREIGN KEY ("student_profile_id") REFERENCES "student_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_improvement_plans" ADD CONSTRAINT "reading_improvement_plans_student_profile_id_fkey" FOREIGN KEY ("student_profile_id") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_improvement_plans" ADD CONSTRAINT "reading_improvement_plans_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district_listening" ADD CONSTRAINT "district_listening_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infra_monitors" ADD CONSTRAINT "infra_monitors_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infra_alerts" ADD CONSTRAINT "infra_alerts_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "infra_monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educator_ai_interactions" ADD CONSTRAINT "educator_ai_interactions_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educator_ai_interactions" ADD CONSTRAINT "educator_ai_interactions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
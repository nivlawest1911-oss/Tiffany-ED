# PowerSchool Integration Guide

## Overview

EdIntel integrates with PowerSchool Professional Learning to allow LEAs (districts) in Alabama to export verified clock hours (PLUs/CEUs) from EdIntel and record them in PowerSchool.

**Important Compliance Note**: EdIntel does NOT independently issue ALSDE certificates. We merely track completion and provide a verification pathway for the district to award credit in PowerSchool.

## OAuth Configuration

1. Install the EdIntel plugin XML (`integrations/powerschool/plugin.xml`) in the PowerSchool admin console.
2. The District Administrator must approve the requested fields (read-only for staff/school data).
3. Once installed, obtain the `Client ID` and `Client Secret`.
4. Configure these in the EdIntel environment variables:
   - `POWERSCHOOL_URL`
   - `POWERSCHOOL_CLIENT_ID`
   - `POWERSCHOOL_CLIENT_SECRET`

## Resilience Features

To prevent cascading failures or API rate limits, the EdIntel client uses several resilience patterns:
1. **Workload Bulkhead**: Limits concurrent interactive API requests.
2. **Circuit Breaker**: Stops requests if PowerSchool returns 5xx errors repeatedly.
3. **Full-Jitter Backoff**: Spaces out retries exponentially to avoid stampeding the API.

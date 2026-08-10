import { backoff } from "@/lib/resilience/backoff";

export class TokenManager {
  private token: string | null = null;
  private expiresAt: number = 0;
  private refreshPromise: Promise<string> | null = null;

  constructor(
    private clientId: string,
    private clientSecret: string,
    private tokenUrl: string
  ) {}

  async getToken(): Promise<string> {
    if (this.token && Date.now() < this.expiresAt) {
      return this.token;
    }

    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.refreshToken();
    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async refreshToken(): Promise<string> {
    return backoff(async () => {
      const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      const response = await fetch(this.tokenUrl, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });

      if (!response.ok) {
        if (response.status === 400 || response.status === 401) {
          // Do not retry on auth failures
          throw new Error("Invalid PowerSchool credentials");
        }
        throw new Error(`Failed to get PowerSchool token: ${response.status}`);
      }

      const data = await response.json();
      this.token = data.access_token;
      this.expiresAt = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1m early
      
      if (!this.token) {
          throw new Error("PowerSchool did not return an access token");
      }
      return this.token;
    }, { baseMs: 200, capMs: 5000, maxAttempts: 3, jitter: "full" });
  }
}

export class PowerSchoolClient {
  private tokenManager: TokenManager;

  constructor(
    private baseUrl: string,
    clientId: string,
    clientSecret: string
  ) {
    this.tokenManager = new TokenManager(clientId, clientSecret, `${baseUrl}/oauth/access_token`);
  }

  async getSchools() {
    return this.request("/ws/v1/district/school");
  }

  /**
   * Roster foundation: district schools + optional school enrollment expansion.
   * Uses public PowerSchool REST endpoints when plugin grants access.
   */
  async getRosterPreview(schoolId?: string) {
    if (schoolId) {
      return this.request(`/ws/v1/school/${encodeURIComponent(schoolId)}/section`);
    }
    // Without a school id, return school list as the roster sync entry point
    const schools = await this.getSchools();
    return {
      source: "powerschool",
      mode: "schools_index",
      schools,
      note: "Pass ?schoolId= to expand sections for a specific school.",
    };
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    return backoff(async () => {
      const token = await this.tokenManager.getToken();
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`PowerSchool API error: ${response.status}`);
      }

      return response.json();
    }, { baseMs: 500, capMs: 10000, maxAttempts: 3, jitter: "full" });
  }
}

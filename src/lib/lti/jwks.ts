import { exportJWK, importSPKI, importPKCS8 } from "jose";

// Pre-generated secure 2048-bit RSA key pair for stable fallback
const FALLBACK_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLrB7gxnfm47gx
tESA6U8GxW7svCKHn+hatKo8yl2brzIn7UL4hvh04+zVizCjEjJ/n/l160nfMgKI
10i1todx7MsV3RXJ5moQFFPwCfmfKCqLo9iy4g6vERINsyupUr56FfLVUp1uBQ25
XaGDk19mfsnOQDBSE+T0Vn+NQw+6KNpK/2LKTC3hzgm22NHIozdDDnEJeDRxlrX8
EheVNr56l4e9E0iLJ+EkBiQ3XpSMrsU4tSAWHgjeGEtKCEkwRWIQrblqaxCaSmBR
KsWXa6Zm5o+su0VJuUm4Lo28TmqtBIsWQ21uYqufmfH8jgsg4RsC1hE6vvIkBJ8w
OWnyt3HzAgMBAAECggEABIGYZUy+1mLvbloYsel3kCTKIX7AHNQS5f7dTV8E1y73
Ix8CvlDuKlfoo4ji2JjMeTpm4I8GIWQP3ks1FqAlOwYMMD2l/8OTUSvB96ug1D6l
QlWrs7mArarpBViTfLmR8U2PA91CEm8WMKW7rxeRosjnWiLdbtN121oWlF+Jd4rp
nuUx37aUP6cQbRBvW1LE//mgu+wh9MtX2m0o7xAXtK6pxKsiHFH+dcMrYtEFfIPrQ
5G6bFLAkoZ1fXKniBqNc4F3KsQ68861u2kqGabSE7L5PEZcLDbzl6k009oonvEOB
prEkCOB4tHma8qDASP2MEil29BCcSelsZbbhJXMqQQKBgQDzwzYC5C4wSzyEWtnx
2x06q1/BG+2uHrD0PYkEczIazDMwJWDCmZBGtq8KCQudM1ZKwYIUZo4bf5jniI6S
Euar/gtCh1rULNOszwL1hp8vv7BHQR6RuorIAdlmxxgVqh2je/7vkrPdo5jPgVmI
M2tIGsDq7YHL+yBB1PmHX+dgUQKBgQDV5a2drAiHgWD2quVJDw3PdLGew52NJuhT
tTTZiB6O64wYhhiYH7ndceFBLk+LPMEFA9K8AlNQR+X4Z+ulXhiHgs21luTNetBL
vqVkrniqsIctP866e8T9cJK41ZauRcW6Xs5tQli4oY4f9+dfqbGp/3gsvZpOUkGH
hyl80lEBAwKBgF1qEtm6zgSN4IwsMNdhi+r+37wmUshmVJPUvRxqdOoWFQu/Vzxc
ExE2Uw/6dWvxz4DodUwSHSVmmZcpGtHZ0nJY8cG2E1W6NAhGcLDcvUZUJF66Etfv
791D8CdV5uHuhlsvWnw+8RTf6+ChhkkOw28naYTeLd6YxzzTPCjn1MhxAoGAIGfo
ss+ihy0RzK09iaEPPZP3aQ9H6l+vqSb199MIliyXkAuY5EtCNIuRTfe/M2Aj+ieH
INbVWn9aFxVffTFRVA58LfvLdFob/q3Gjwdj3rBZ+oAFSPmBcchBYmFxr7uAZmkA
q0r2+Bn511wOoM6rzQ6YXWboXt9VcDwJDBEtFpMCgYEAqCPtNPVIBZ9SF9c1Uqdm
10wa4GiJP2Ol3gvhhDeye0+LS1YcevKwona64RAHsQGdAEMJkkcSEmDYyVOoNK1Q
2KykHFXhQuh4/ZjNZaUu+9G+qXk1VJSOijskBcv3GgVYBFug/JorAfu3fQVFaZTc
CJHSI/vyZ2Mn+y/lLkqOz9U=
-----END PRIVATE KEY-----`;

const FALLBACK_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy6we4MZ35uO4MbREgOlP
BsVu7Lwih5/oWrSqPMpdm68yJ+1C+Ib4dOPs1YswoxIyf5/5detJ3zICiNdItbaH
cezLFd0VyeZqEBRT8An5nygqi6PYsuIOrxESDbMrqVK+ehXy1VKdbgUNuV2hg5Nf
Zn7JzkAwUhPk9FZ/jUMPuijaSv9iykwt4c4JttjRyKM3Qw5xCXg0cZa1/BIXlTa+
epeHvRNIiyfhJAYkN16UjK7FOLUgFh4I3hhLSghJMEViEK25amsQmkpgUSrFl2um
ZuaPrLtFSblJuC6NvE5qrQSLFkNtbmKrn5nx/I4LIOEbAtYROr7yJASfMDlp8rdx
8wIDAQAB
-----END PUBLIC KEY-----`;

export function getPrivateKeyPem(): string {
  return (process.env.LTI_PRIVATE_KEY || FALLBACK_PRIVATE_KEY).replace(/\\n/g, "\n");
}

export function getPublicKeyPem(): string {
  return (process.env.LTI_PUBLIC_KEY || FALLBACK_PUBLIC_KEY).replace(/\\n/g, "\n");
}

/**
 * Returns the public keys in JWKS format for platform signature verification
 */
export async function getJWKSPublicKeys() {
  const pem = getPublicKeyPem();
  const publicKey = await importSPKI(pem, "RS256");
  const jwk = await exportJWK(publicKey);
  
  return {
    keys: [
      {
        ...jwk,
        kid: "edintel-sovereign-lti-key-1",
        kty: "RSA",
        alg: "RS256",
        use: "sig",
      }
    ]
  };
}

/**
 * Returns the private key as a jose KeyLike object for token signing
 */
export async function getPrivateKeyObject() {
  const pem = getPrivateKeyPem();
  return await importPKCS8(pem, "RS256");
}

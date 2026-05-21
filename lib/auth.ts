/** Web-Crypto-based auth helpers — work in both Edge and Node.js runtimes */

async function hmacHex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await globalThis.crypto.subtle.sign('HMAC', key, enc.encode(message))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function createAdminToken(): Promise<string> {
  return hmacHex('admin_session', process.env.JWT_SECRET!)
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const expected = await createAdminToken()
    if (token.length !== expected.length) return false
    let diff = 0
    for (let i = 0; i < token.length; i++) {
      diff |= token.charCodeAt(i) ^ expected.charCodeAt(i)
    }
    return diff === 0
  } catch {
    return false
  }
}

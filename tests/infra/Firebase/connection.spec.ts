import { describe, expect, it } from 'vitest'

describe('Connection Firebase', () => {
  it('Environment variables must be different from null', () => {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      databaseURL: import.meta.env.VITE_DATABASE_URL,
      projectId: import.meta.env.VITE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_MESSAGING_SEND_ID,
      appId: import.meta.env.VITE_APP_ID,
    }

    expect(firebaseConfig.apiKey.length).not.toBe(0)
    expect(firebaseConfig.authDomain.length).not.toBe(0)
    expect(firebaseConfig.databaseURL.length).not.toBe(0)
    expect(firebaseConfig.projectId.length).not.toBe(0)
    expect(firebaseConfig.storageBucket.length).not.toBe(0)
    expect(firebaseConfig.messagingSenderId.length).not.toBe(0)
    expect(firebaseConfig.appId.length).not.toBe(0)
  })
})

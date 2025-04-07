import * as crypto from 'crypto'

export const buildAvatar = (email: string, size: number) => {
    const emailHashed = crypto.createHash('sha256').update(email).digest('hex')
    
    return `https://api.gravatar.com/v3/qr-code/${emailHashed}?size=${size}`
}
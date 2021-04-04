import { randomBytes, scrypt, timingSafeEqual } from 'crypto';

async function hashPassword(password: string) {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(16).toString('hex');
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

async function verifyPassword(password: string, hash: string) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':');
    if (typeof salt === 'string' && typeof key === 'string') {
      scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        else resolve(timingSafeEqual(Buffer.from(key, 'hex'), derivedKey));
      });
    } else reject(new TypeError('Expected colon (:) separated hash string'));
  });
}

export { hashPassword, verifyPassword };

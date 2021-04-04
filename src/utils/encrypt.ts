import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = process.env.ENCRYPTION_ALG || 'aes-256-ctr';
const secretKey =
  process.env.ENCRYPTION_KEY ||
  '36Stt8hxv56kijWyya6TZSgW9RcFva4dCKjU39xCCFyL9bWboNbCLACjKZ4s2ULP';

const encrypt = (text: string) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (hash: string) => {
  const [iv, content] = hash.split(':');
  if (typeof iv === 'string' && typeof content === 'string') {
    const decipher = createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(iv, 'hex')
    );
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(content, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString();
  }
  throw new TypeError('Expected colon (:) separated hash string');
};

export {
  encrypt,
  decrypt,
};

import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  // return {
  //   iv: iv.toString('hex'),
  //   content: encrypted.toString('hex')
  // };
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (hash: string) => {
  const [iv, content] = hash.split(':');
  if (typeof iv === 'string' && typeof content === 'string') {
    const decipher = crypto.createDecipheriv(
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
  return false;
};

module.exports = {
  encrypt,
  decrypt,
};

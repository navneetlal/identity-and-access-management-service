import { sign, SignOptions, verify } from 'jsonwebtoken';

import { decrypt } from './encrypt';

import Kingdom from '../models/kingdom';
import Nobleman from '../models/nobleman';

async function signJwt(nobleman: Nobleman, kingdom: Kingdom): Promise<string> {
  return new Promise((resolve, reject) => {
    const { password, ...noblemanInfo } = nobleman;
    const signOptions: SignOptions = {
      algorithm: kingdom.jwtAlgorithm || 'RS256',
      audience: nobleman.fullName || nobleman.username,
      issuer: kingdom.jwtIssuer || kingdom.name,
      expiresIn: kingdom.jwtExpiresIn,
      notBefore: Math.floor(Date.now() / 100) - 10,
    }
    const jwtPrivateKey = decrypt(kingdom.jwtPrivateKey);
    sign(noblemanInfo, jwtPrivateKey, signOptions, (err, token) => {
      if (err) reject(err)
      else resolve(token as string)
    })
  })
}

async function verifyJwt(token: string, jwtPublicKey: string): Promise<any> {
  return new Promise((resolve, reject) => {
    verify(token, jwtPublicKey, {}, (err, decoded) => {
      if (err) reject(err)
      else resolve(decoded)
    })
  })
}

export { signJwt, verifyJwt }
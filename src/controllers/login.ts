import { Router as expressRouter } from 'express';
import Kingdom from '../models/kingdom';
import Nobleman from '../models/nobleman';
import { decrypt } from '../utils/encrypt';
import { verifyPassword } from '../utils/hash';

const router = expressRouter();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if(typeof username === 'string' && typeof password === 'string') {
    const nobleman = await Nobleman.findOne({ where: { username } });
    if(!nobleman) return res.status(404).send('User not found')
    if(!verifyPassword(password, nobleman.password)) return res.status(403).send('Invalid username or password')
    const kingdom = await Kingdom.findOne({ where: { id: nobleman.kingdomId } })
    if(!kingdom) return res.status(403).send('User not a part of any kingdom')
    const jwtPrivateKey = decrypt(kingdom.jwtPrivateKey)
    return res.status(200).send('success')
    

  }
  else return res.status(400).send('Invalid username or password');
})
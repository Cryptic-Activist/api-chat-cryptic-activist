import User from '@models/User/User';
import { generateRandonAdjective } from '../strings/strings';

export async function generatePrivateKeys(): Promise<string[]> {
  let privateKeysArr: null | string[];
  let userObj: any;

  do {
    privateKeysArr = [];

    for (let i = 0; i < 24; i += 1) {
      privateKeysArr.push(generateRandonAdjective());
    }

    userObj = await User.findOne({
      where: { private_keys: privateKeysArr },
    });
  } while (userObj);

  return privateKeysArr;
}

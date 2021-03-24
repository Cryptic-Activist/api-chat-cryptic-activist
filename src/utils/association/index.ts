import Language from '@models/Language/Language';
import User from '@models/User/User';

import { sanitizeInputLanguage } from '@utils/sanitizer';

export async function associateLanguageToUser(
  languageName: string,
  user_id: string,
): Promise<any> {
  const cleanReqBody: { languageName: string } = sanitizeInputLanguage(
    languageName,
  );

  const user = await User.findByPk(user_id);

  const [language] = await Language.findOrCreate({
    where: { name: cleanReqBody.languageName },
  });

  await user.addLanguage(language);

  return language;
}

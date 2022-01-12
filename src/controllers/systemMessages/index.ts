import { Request, Response } from 'express';
import { getSystemMessages } from 'cryptic-base';
import { sanitize, sanitizeQueryArray, convertWhere } from 'cryptic-utils';

export async function getSystemMessagesController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { associations } = req.query;

    const cleanReqQuery = sanitize({ ...req.query }, []);

    cleanReqQuery.associations = sanitizeQueryArray(associations);

    const where = convertWhere({ ...cleanReqQuery }, ['associations']);

    const systemMessages = await getSystemMessages(
      null,
      cleanReqQuery.associations,
      where,
    );

    return res.status(200).send({
      status_code: 200,
      results: systemMessages,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

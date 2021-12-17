import { Request, Response } from 'express';
import { createChat } from 'cryptic-base';

// export async function index(req: Request, res: Response): Promise<Response> {
//   try {
//     console.log(req);
//   } catch (err) {
//     return res.status(500).send({
//       status_code: 500,
//       results: {},
//       errors: [err.message],
//     });
//   }
// }

export async function createChatController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const newChat = await createChat({});

    return res.status(200).send({
      status_code: 200,
      results: newChat,
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

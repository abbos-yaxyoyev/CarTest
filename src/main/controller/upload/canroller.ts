import fs from 'fs';
import path from 'path';
import { CommonException } from '../../../common/constants/exceptions';


export async function uploadFileCantroller(request, reply) {

  try {

    const files = request.raw.files;

    const file = files['file'];

    const url = 'img-' + file.md5 + path.extname(file.name);

    const direction = path.join(__dirname, '../../../../');

    const wstream = fs.createWriteStream(direction + 'public/' + url);

    wstream.write(file.data);

    wstream.end();

    return reply.success(url);

  } catch (e) {
    throw CommonException.UnknownError(e);
  }
}

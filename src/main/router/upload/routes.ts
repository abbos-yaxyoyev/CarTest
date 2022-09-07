import { uploadFileCantroller } from "../../controller/upload/canroller";

export const uploadFileRoutes = [
  {
    method: 'POST',
    url: `/upload`,
    handler: uploadFileCantroller,
  },
];

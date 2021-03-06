import { Request, Response } from 'express';
import Photo, {} from '../model/photo.model';
import path from 'path';
import fs from 'fs-extra';
import { ExecException } from 'child_process';
import config from "config";

const port = config.get("port") as number;
const host = config.get("host") as string;

export async function getPhotos (req: Request, res: Response) {
    const photos: any = await Photo.find().lean();
    res.json(photos)
};

// export async function getPhoto (req: Request, res: Response) : Promise<Response>{
//     const photo = await Photo.findById(req.params.id).lean();
//     return res.json(photo);
// }

export async function createPhoto(req: any, res: Response) {
  const index = req.file.path.lastIndexOf('/');
  const pathName = req.file.path.slice(index);
    const photo = new Photo({
        name: req.body.name,
        img: `http://${host}:${port}${pathName}`,
      });

      photo
        .save()
        .then((res: any) => {
          console.log("image is saved");
          res.send('image is saved')
        })
        .catch((err: ExecException) => {
          console.log(err, "error has occured when store img");
          res.send('error has occured when store img')
        });
};

// export async function updatePhoto(req: Request, res: Response) : Promise<Response> {
//     const { id } = req.params;
//     const { title, description } = req.body;
//     console.log(req.body)
//     const photo = await Photo.findByIdAndUpdate(id, {
//         title,
//         description
//     }, {new: true}).lean();
//     return res.json({message: 'Successfully updated', photo});
// };

// export async function deletePhoto (req: Request, res: Response) : Promise<Response> {
//     const photo = await Photo.findByIdAndDelete(req.params.id).lean();
//     if (photo) {
//         const exist = await fs.pathExists(path.resolve(photo.imagePath));
//         if (exist)
//             await fs.unlink(path.resolve(photo.imagePath));
//     } else 
//         return res.json({message: 'Photo not found'});
//     return res.json({message: 'Photo Deleted', photo});
// };
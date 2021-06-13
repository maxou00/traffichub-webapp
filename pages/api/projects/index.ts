import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { extractUser } from "../../../core/authentication-utils";
import { database } from "../../../core/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let body = req.body as { title: string, comment: string};
    let errs : any = {};
    if(!body.title) {
        errs.title = "Indiquez le titre";
    }
    
    if(Object.keys(errs).length > 0) {
        return res.status(401).json({success: false, errors: errs});
    }

    let db = await database();
    let user = await extractUser(req, res, db);
    if(user) {
        let doc = {
            '_id': "project:"+nanoid(),
            'user': user._id,
            'title': body.title,
            'comment': body.comment,
            'createdAt': Date.now(),
            'updatedAt': Date.now()
        }

        let inserted = await db.insert(doc);
        if(inserted.ok){
            return res.json({success: true, data: inserted.id})
        }
    }
    return res.status(401).json({success: false, errors: errs});
}
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";
import { IProject } from "../../../../core";
import { extractUser } from "../../../../core/authentication-utils";
import { database } from "../../../../core/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method.toLowerCase() === "post") {
        let db = await database();
        let user = await extractUser(req, res, db);
        let projectId = req.query.id as string;
        let projects = await db.partitionedFind("project", {
            selector: {
                _id: projectId,
                user: user._id
            }
        })

        if(projects.docs.length > 0) {
            let project = (projects.docs[0] as unknown) as IProject;
            let body = req.body as {title: string, url: string};
            let errs: any = {};
            if(!body.title) {
                errs.title = "Indiquez un titre sur ce traqueur";
            }
            if(!body.url) {
                errs.url = "indiquez l'url de ce point de suivi";
            }

            if(Object.keys(errs).length > 0 ){
                return res.status(401).json({success: false, errors: errs});
            }
            let doc = {
                _id: `tracker:${nanoid()}`,
                project: project._id,
                type: 'web',
                title: body.title.trim(),
                url: body.url.trim(),
                tag: nanoid(),
                createdAt: Date.now(),
                updatedAt: Date.now()
            }

            let done = await db.insert(doc);
            if(done.ok) {
                return res.status(200).json({success: true, data: done.id});
            }

            return res.status(401).json({success: false, errors: errs});
        }
    }
    return res.status(401).json({success: false, errors: {}});
}
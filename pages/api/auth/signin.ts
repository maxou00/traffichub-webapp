import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../core";
import { database } from "../../../core/database";
import { createHash } from "crypto";
import Cookies from 'cookies';
import { sign } from "jsonwebtoken";

export default async function  handler(req: NextApiRequest, res: NextApiResponse) {
    let body = req.body as {email: string, password: string};
    let errs: any = {};
    if(!body.email) {
        errs.email = "Indiquez votre email";
    }
    if(!body.password) {
        errs.password = "Indiquez votre mot de passe";
    }

    if(Object.keys(errs).length > 0) {
        return res.status(401).json({success: false, errors: errs});
    }

    let db = await database();

    let matches = await db.partitionedFind("user", {
        selector: {
            email: body.email,
            password: createHash("sha256").update(body.password).digest("hex")
        }
    })

    if(matches.docs.length > 0 ){
        let profile = (matches.docs[0] as unknown) as IUser;
        let session = {
            owner: profile._id,
            type: "user",
            created: Date.now()
        }
        let jwt = sign(session, process.env.JWT_SECRET, {
            expiresIn: '6h',
            issuer: 'http://localhost:3000/api/auth/signin',
            audience: 'http://localhost:3000'
        })
        const cookies = new Cookies(req, res);
        cookies.set("token", jwt, {
            httpOnly: true,
            sameSite: true,
            expires: new Date(Date.now() + 6 * 3600 * 1000)
        });
        return res.status(200).json({success: true, data: { profile, token: jwt}});
    }
    return res.status(403).json({success: false, errors: errs});
}
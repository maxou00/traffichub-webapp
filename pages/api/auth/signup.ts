import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../core";
import { database } from "../../../core/database";
import { nanoid } from "nanoid";
import { createHash } from "crypto";
import Cookies from "cookies";
import { sign } from "jsonwebtoken";

export default async function  handler(req: NextApiRequest, res: NextApiResponse) {
    let body = req.body as {email: string, password: string, firstName: string, lastName: string};
    let errs: any = {};
    if(!body.email) {
        errs.email = "Indiquez votre email";
    }
    if(!body.password) {
        errs.password = "Indiquez votre mot de passe";
    }

    if(body.password) {
        if(body.password.length < 8) {
            errs.password = "Votre mot de passe doit contenir au minimum 8 caractères";
        }
    }

    if(!body.firstName) {
        errs.firstName = "Indiquez votre prénom";
    }

    if(!body.lastName) {
        errs.firstName = "Indiquez votre nom";
    }

    let db = await database();
    if(body.email) {
        let exists = await db.partitionedFind("user", {
            selector: {
                email: body.email
            }
        })

        if(exists.docs.length > 0) {
            errs.email = "Cette adresse mail existe déjà.";
        }
    }

    if(Object.keys(errs).length > 0) {
        return res.status(401).json({success: false, errors: errs});
    }

    let profile: IUser = {
        _id: "user:"+nanoid(),
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        email: body.email.trim(),
        password: createHash("sha256").update(body.password.trim()).digest("hex"),
        verified: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    let done = await db.insert(profile);
    if(done.id) {
        let session = {
            owner: profile._id,
            type: "user",
            created: Date.now()
        }

        let jwt = sign(session, process.env.JWT_SECRET, {
            expiresIn: '6h',
            issuer: 'http://localhost:3000/api/auth/signup',
            audience: 'http://localhost:3000'
        })

        const cookies = new Cookies(req, res);
        cookies.set("token", jwt, {
            httpOnly: true,
            sameSite: true,
            secure: true,
            expires: new Date(Date.now() + 6 * 3600 * 1000)
        });
        
        return res.status(200).json({success: true, data: { profile, token: jwt}});
    }

    return res.status(403).json({success: false, errors: errs});
}
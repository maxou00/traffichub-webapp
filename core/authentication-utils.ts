import Cookies from "cookies";
import { verify } from "jsonwebtoken";
import nano, { DocumentScope } from "nano";
import { GetServerSidePropsContext, GetStaticPropsContext, NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { IUser } from ".";
import { database } from "./database";

export async function extractUser(req: NextApiRequest, res: NextApiResponse, database: nano.DocumentScope<unknown>) {
    const cookies = new Cookies(req, res);
    let token = cookies.get("token");
    if (token) {
        let decoded = verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "object") {
            let parsed = decoded as any;
            let users = await database.partitionedFind("user", {
                selector: {
                    '_id': parsed.owner
                }
            });

            if (users.docs.length > 0) {
                return (users.docs[0] as unknown) as IUser;
            }
        }
    }
    return undefined;
}

export async function extractUserFromContext(context: GetServerSidePropsContext, database: nano.DocumentScope<unknown>) {
    const cookies = new Cookies(context.req, context.res);
    let token = cookies.get("token");
    if (token) {
        let decoded = verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "object") {
            let parsed = decoded as any;
            let users = await database.partitionedFind("user", {
                selector: {
                    '_id': parsed.owner
                }
            });

            if (users.docs.length > 0) {
                return (users.docs[0] as unknown) as IUser;
            }
        }
    }
    return undefined;
}

export interface InjectorProps {
    profile?: IUser;
}

export interface Injectable<T> {
    props: T
}

export async function userProfilePropsInjector(context: GetServerSidePropsContext, db: DocumentScope<unknown>): Promise<Injectable<InjectorProps>> {
    let user = await extractUserFromContext(context, db);
    if (user) {
        return { props: { profile: user } }
    }
    return {
        props: {}
    }
}

export async function projectsByUser(context: GetServerSidePropsContext, db: DocumentScope<unknown>): Promise<Injectable<any>> {
    let user = await extractUserFromContext(context, db);
    if (user) {
        let projects = await db.partitionedFind("project", {
            selector: {
                user: user._id
            }
        });
        return { props: { projects: projects.docs } }
    }
    return {
        props: {}
    }
}

export async function singleProjectByUser(context: GetServerSidePropsContext, db: DocumentScope<unknown>): Promise<Injectable<any>> {
    let user = await extractUserFromContext(context, db);
    if (user) {
        let projects = await db.partitionedFind("project", {
            selector: {
                _id: context.params.id,
                user: user._id,
            }
        });

        if(projects.docs.length > 0){
            let project = projects.docs[0];
            let trackers = await db.partitionedFind("tracker", {
                selector: {
                    project: project._id
                }
            });
            return { props: { project, trackers: trackers.docs } }
        }
    }
    return {
        props: {}
    }
}

type InjectorFunction = (context: GetServerSidePropsContext, database: DocumentScope<unknown>) => Promise<Injectable<any>>;

export function combineInjectors(...injectors: InjectorFunction[]){
    return async(context: GetServerSidePropsContext): Promise<Injectable<any>> => {
        let db = await database();
        return Promise.all(
                injectors.map((i) => Promise.resolve(i(context, db)))
            ).then((values) => {
            return (values as Array<Injectable<any>>).reduce((prev, curr, i) => {
                return {
                    props: {
                        ...prev.props,
                        ...curr.props
                    }
                }
            })
        })
    }
}
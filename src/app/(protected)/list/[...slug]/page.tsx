import { Params } from "next/dist/server/request/params";
import { Sidebar } from "./sidebar";
import { ListLayout } from "@/components/List/layout";
import { redirect } from "next/navigation";
import { ListPage } from "@/components/List/list-page";

export default async function SingleListPage({
    params
}: {
    params: Params
}) {
    const {
        slug
    } = await params;
    if(!slug) {
        redirect("/error");
    }
    return (
        <ListLayout
            slug={slug as string}
        >
            <Sidebar>
                <ListPage />
            </Sidebar>
        </ListLayout>
    )
}
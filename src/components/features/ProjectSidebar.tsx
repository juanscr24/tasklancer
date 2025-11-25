import { Button, SearchBar } from "@components"

export const ProjectSidebar = () => {
    return (
        <div className="w-86 h-screen flex flex-col bg-(--bg-2) py-7 px-4">
            <div className="flex gap-20 items-center">
                <h2 className="text-3xl text-(--text-1) font-bold">Projects</h2>
                <Button className="text-sm py-3 text-white" primary children="New Project" title="New Project" />
            </div>
            <SearchBar className="mt-8 bg-white dark:bg-[#232F48]" />
        </div>
    )
}

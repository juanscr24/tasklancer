import { Button } from ".."
import { SearchBar } from "../ui/SearchBar"

export const ProjectSidebar = () => {
    return (
        <div className="w-80 h-screen flex flex-col bg-(--bg-2) py-5 px-4">
            <div className="flex gap-14 items-center">
                <h2 className="text-3xl text-(--text-1) font-bold">Projects</h2>
                <Button className="text-sm py-3 text-white" primary children="New Project" title="New Project" />
            </div>
            <SearchBar className="mt-8 bg-white dark:bg-[#232F48]" />
        </div>
    )
}

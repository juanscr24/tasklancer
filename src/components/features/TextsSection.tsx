import { FaMoneyBillWave } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { Link } from "@/i18n/routing";
import { HeroImages } from "./HeroImages";

const TextsSection = () => {
    return (
        // CORRECCIÓN: Eliminé px extra en el section si el padre ya lo tiene, 
        // o aseguramos que coincida. Aquí mantenemos el estándar.
        <div className="max-w-8/10 mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 lg:py-20">

                <div className="flex flex-col gap-8"> {/* Aumenté gap para más aire */}
                    {/* Títulos */}
                    <div className="space-y-4">
                        <h2 className="font-bold text-4xl sm:text-5xl lg:text-5xl text-(--text-1) leading-[1.1]">
                            All your freelance work <br />
                            <span className="text-(--btn-1)">in one place.</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-(--text-2) max-w-lg leading-relaxed">
                            Organize projects, tasks, hours, and invoices without spreadsheets or a thousand tabs open.
                        </p>
                    </div>

                    {/* Lista de características */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-(--text-2) group"> {/* Group para hover effects opcionales */}
                            <div className="p-3 rounded-lg bg-(--bg-2) shrink-0 transition-colors group-hover:bg-(--btn-1)/10">
                                <FaMoneyBillWave className="w-5 h-5 text-(--text-1) group-hover:text-(--btn-1)" />
                            </div>
                            <h4 className="font-medium text-lg">Create and organize projects in minutes.</h4>
                        </div>

                        <div className="flex items-center gap-4 text-(--text-2) group">
                            <div className="p-3 rounded-lg bg-(--bg-2) shrink-0 transition-colors group-hover:bg-(--btn-1)/10">
                                <RiDashboardHorizontalFill className="w-5 h-5 text-(--text-1) group-hover:text-(--btn-1)" />
                            </div>
                            <h4 className="font-medium text-lg">Organize your day with simple Kanban boards.</h4>
                        </div>

                        <div className="flex items-center gap-4 text-(--text-2) group">
                            <div className="p-3 rounded-lg bg-(--bg-2) shrink-0 transition-colors group-hover:bg-(--btn-1)/10">
                                <FaFileInvoice className="w-5 h-5 text-(--text-1) group-hover:text-(--btn-1)" />
                            </div>
                            <h4 className="font-medium text-lg">Generate clear invoices based on your task and hours.</h4>
                        </div>
                    </div>
                </div>

                <div className="relative mt-10 lg:mt-0 flex justify-center lg:justify-end">
                    <HeroImages />
                </div>
            </div>
        </div>
    )
}

export default TextsSection

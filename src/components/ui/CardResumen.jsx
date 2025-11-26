export function CardResumen({ title, value }) {
    return (
        <div className="bg-(--bg-3)  rounded-lg w-full hover:scale-105 transition-all  border border-(--border-1)  p-5 flex flex-col items-start text-(--text-1) ">
            <h4 className="text-sm font-semibold mb-1">{title}</h4>
            <div className="text-3xl font-bold">{value}</div>
        </div>
    );
}
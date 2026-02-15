import React from "react"

export default function Card({
    icon,
    heading,
    value,
}: {
    icon: React.ReactElement
    heading: string
    value: string
}) {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md flex-1">
            <div className="flex items-center gap-2 text-gray-400">
                <div className="text-green-500 text-lg">
                    {icon}
                </div>
                <h3 className="text-sm font-medium">
                    {heading}
                </h3>
            </div>

            <h1 className="text-2xl font-semibold text-white">
                {value}
            </h1>
        </div>
    )
}

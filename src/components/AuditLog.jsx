import React, { useEffect, useState } from "react";
import { API } from "../api/axiosInstance";

const AuditLogsTable = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAuditLogs();
    }, []);

    const fetchAuditLogs = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            console.log("Token:", token);

            const response = await API.get("/logs", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setLogs(response.data.data);
        } catch (error) {
            console.error("Error fetching audit logs:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 my-8">
            <div className="overflow-x-auto">
                <h1 className="text-3xl font-bold pb-4">Audit Logs</h1>
                <table className="min-w-full bg-white shadow-lg rounded-lg">
                    <thead className="bg-red-900 text-white text-xs md:text-sm">
                        <tr>
                            <th className="px-4 py-3 font-semibold">User</th>
                            <th className="px-4 py-3 font-semibold">Type</th>
                            {/* <th className="px-4 py-3 font-semibold">Event</th>  to check from where the tracking coming from remove the comment */}
                            <th className="px-4 py-3 font-semibold">Description</th>
                            <th className="px-4 py-3 font-semibold">Time</th>
                            <th className="px-4 py-3 font-semibold">IP Address</th>
                        </tr>
                    </thead>
                    <tbody>
    {logs.map((log) => {
        console.log("log:", log); // Debug: Log the entire log object to inspect its structure
        return (
            <tr key={log._id}>
                <td className="border px-4 py-2 text-sm">{log.user}</td>
                <td className="border px-4 py-2 text-sm">{log.type}</td>
                {/* <td className="border px-4 py-2 text-sm">{log.event}</td> */}
                <td className="border px-4 py-2 text-sm">{log.message}</td>
                <td className="border px-4 py-2 text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-sm">
                    {log.ip || log.data?.ip || "N/A"} {/* Try log.ip first, then log.data?.ip */}
                </td>
            </tr>
        );
    })}
</tbody>
                </table>
            </div>
        </div>
    );
};

export default AuditLogsTable;
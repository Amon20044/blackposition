"use client"
import './button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
interface FieldData {
    name: string;
    values: string[];
}

interface DataItem {
    created_time: string;
    id: string;
    field_data: FieldData[];
}

function downloadCsv(data: DataItem[], filename: string = 'export.csv') {
    // Convert data to CSV
    const csvContent = jsonToCsv(data);

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});

    // Create a temporary link element
    const link = document.createElement('a');

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Set link attributes
    link.setAttribute('href', url);
    link.setAttribute('download', filename);

    // Make link invisible
    link.style.visibility = 'hidden';

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Free up memory
    URL.revokeObjectURL(url);
}


function jsonToCsv(data: DataItem[]) {
    // Define headers with explicit typing
    const headers = ['created_time', 'id', ...(() => {
        const uniqueHeaders = new Set();
        data.forEach(item =>
            item.field_data.forEach(field =>
                uniqueHeaders.add(field.name)
            )
        );
        return Array.from(uniqueHeaders);
    })()];

    // Create CSV rows
    const csvRows = [
        // Header row
        headers.join(','),

        // Data rows
        ...data.map(item => {
            // Create a map of field names to values for easy lookup
            const fieldMap: Record<string, string> = Object.fromEntries(
                item.field_data.map(field => [field.name, field.values[0]])
            );

            // Build row with all headers
            return headers.map(header => {
                // Handle created_time, id, and field data
                const value = header === 'created_time' ? item.created_time :
                    header === 'id' ? item.id :
                        //@ts-ignore
                        fieldMap[header] || '';

                // Escape commas and quotes
                const escaped = value ?
                    `"${value.toString().replace(/"/g, '""')}"` : '';

                return escaped;
            }).join(',');
        })
    ];

    return csvRows.join('\n');
}


export default function CSVDownload({leads}: {
    leads: { data: { created_time: string, id: string, field_data: { name: string, values: string[] }[] }[] }
}) {
    const csv = jsonToCsv(leads.data);
    console.log(csv)
    return (
        <>
            <button className="download-button .buttonn" onClick={() => downloadCsv(leads.data, 'user_data.csv')}>
                <FontAwesomeIcon icon={faDownload} className="icon-left ic" />
                Download File
            </button>
        </>
    )
}
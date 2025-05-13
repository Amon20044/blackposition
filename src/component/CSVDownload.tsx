"use client";

import './button.css';
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
    const csvContent = jsonToCsv(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function jsonToCsv(data: DataItem[]) {
    const headers = ['created_time', 'id', ...(() => {
        const uniqueHeaders = new Set<string>();
        data.forEach(item =>
            item.field_data.forEach(field => uniqueHeaders.add(field.name))
        );
        return Array.from(uniqueHeaders);
    })()];

    const csvRows = [
        headers.join(','),
        ...data.map(item => {
            const fieldMap: Record<string, string> = Object.fromEntries(
                item.field_data.map(field => [field.name, field.values[0]])
            );

            return headers.map(header => {
                let value = '';

                if (header === 'created_time') {
                    value = item.created_time;
                } else if (header === 'id') {
                    value = item.id;
                } else if (fieldMap[header]) {
                    value = fieldMap[header];
                    const lowerHeader = header.toLowerCase();

                    // Format phone number properly
                    if (lowerHeader === 'phone_number') {
                        if (!value.startsWith('+91')) {
                            value = '+91' + value;
                        }
                    }
                }

                // Always wrap in quotes to prevent Excel formatting issues
                return `"${value.replace(/"/g, '""')}"`;
            }).join(',');
        })
    ];

    return csvRows.join('\n');
}

export default function CSVDownload({ leads }: {
    leads: { data: DataItem[] }
}) {
    return (
        <button className="download-button buttonn" onClick={() => downloadCsv(leads.data, 'user_data.csv')}>
            <FontAwesomeIcon icon={faDownload} className="icon-left ic" />
            Download File
        </button>
    );
}

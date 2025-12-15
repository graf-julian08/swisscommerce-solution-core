'use client';

import React from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";
import { monokaiPro } from "@codesandbox/sandpack-themes";

interface LivePreviewProps {
    files: Record<string, { code: string }>;
}

export default function LivePreview({ files }: LivePreviewProps) {
    // Convert our file format { "/App.js": { code: "..." } } to Sandpack format { "/App.js": "..." }
    const sandpackFiles = Object.entries(files).reduce((acc, [path, file]) => {
        acc[path] = file.code;
        return acc;
    }, {} as Record<string, string>);

    // Add a hidden index.html to inject Tailwind
    sandpackFiles["/public/index.html"] = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Shop Preview</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `;

    return (
        <div className="w-full max-w-6xl mx-auto mt-8 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-white">Live Browser Preview</h3>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
            </div>
            <Sandpack
                template="react"
                theme={monokaiPro}
                files={sandpackFiles}
                customSetup={{
                    dependencies: {
                        "react": "^18.3.1",
                        "react-dom": "^18.3.1",
                        "lucide-react": "^0.344.0",
                        "@phosphor-icons/react": "^2.1.10",
                        "framer-motion": "^11.0.8",
                        "clsx": "^2.1.0",
                        "tailwind-merge": "^2.2.1",
                        "react-router-dom": "^6.22.3"
                    }
                }}
                options={{
                    showNavigator: true,
                    showTabs: true,
                    editorHeight: 600,
                    showLineNumbers: true,
                    externalResources: ["https://cdn.tailwindcss.com"],
                }}
            />
        </div>
    );
}

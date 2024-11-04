'use client';

import { Module } from '@/types';
import { ChevronDown, ChevronUp, Play, File } from 'lucide-react';
import { useState } from 'react';

export default function ModuleAccordion({ modules }: { modules: Module[] }) {
  const [openModule, setOpenModule] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <div key={module._id} className="border rounded-lg">
          <button
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            onClick={() => setOpenModule(openModule === module._id ? null : module._id)}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">{module.title}</span>
              <span className="text-sm text-gray-500">
                ({module.lessons.length} lessons)
              </span>
            </div>
            {openModule === module._id ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {openModule === module._id && (
            <div className="p-4 pt-0">
              <div className="space-y-2">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson._id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-blue-600" />
                      <span>{lesson.title}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {lesson.duration} min
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

import { Instructor } from '@/types';

export default function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Instructor</h3>
      <div className="flex items-center gap-4">
        <img
          src={instructor.avatar.asset.url}
          alt={instructor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{instructor.name}</h4>
          <p className="text-sm text-gray-600">{instructor.bio}</p>
        </div>
      </div>
    </div>
  );
}

import React from 'react'

const JobTracking: React.FC = () => {
  // Mock data for job applications
  const jobApplications = [
    { id: 1, company: 'Tech Corp', position: 'Frontend Developer', status: 'Applied' },
    { id: 2, company: 'Innovate Inc', position: 'Full Stack Engineer', status: 'Interview' },
    { id: 3, company: 'Digital Solutions', position: 'UX Designer', status: 'Offer Received' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Job Tracking</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobApplications.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap">{job.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.position}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default JobTracking
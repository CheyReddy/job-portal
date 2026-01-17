export const MENU_BY_ROLE = {
  JOB_SEEKER: [
    { label: 'Dashboard', path: '/jobseeker' },
    { label: 'Jobs', path: '/jobseeker/jobs' },
    { label: 'Applications', path: '/jobseeker/applications' },
    { label: 'Profile', path: '/jobseeker/profile' },
  ],

  RECRUITER: [
    { label: 'Dashboard', path: '/recruiter' },
    { label: 'Profile', path: '/recruiter/profile' },
    { label: 'Post Job', path: '/recruiter/post-job' },
    { label: 'My Jobs', path: '/recruiter/jobs' },
    { label: 'Applicants', path: '/recruiter/applicants' },
  ],

  ADMIN: [
    { label: 'Dashboard', path: '/admin' },
    { label: "Recruiter Approvals", path: "/admin/recruiters" },
    { label: 'Users', path: '/admin/users' },
    { label: 'Jobs', path: '/admin/jobs' },
  ]
}

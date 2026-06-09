// src/lib/data.ts

import { Project, Skill, SocialLink, Certification } from '@/types';

export const projects: Project[] = [
  {
    id: 'etera-web',
    title: 'Etera Web',
    description: 'ETERA is a digital ecosystem that provides value creation in the form of integration, accuracy, expertise, ease and speed of business processes through technological support in the context of realizing National Sugar Self-Sufficiency.',
    images: [
      '/assets/projects/etera-monitorng.webp',
      '/assets/projects/etera-login.webp',
    ],
    favicon: '/assets/icons/icon-etera.png',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://etera.co.id',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'etera-mobile',
    title: 'Etera Mobile',
    description: 'ETERA is a digital ecosystem that provides value creation in the form of integration, accuracy, expertise, ease and speed of business processes through technological support in the context of realizing National Sugar Self-Sufficiency.',
    images: [
      '/assets/projects/mobil-bg-1.webp',
      '/assets/projects/mobil-bg-2.webp',
    ],
    favicon: '/assets/icons/icon-etera.png',
    techStack: ['Flutter', 'Dart'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'people-analytics',
    title: 'People Analytics',
    description: 'Monitoring employee data for HR needs. Includes, HR Ratio, HR Total Employees, Learning & Development Cost, HC Maturity Level, Punishment Monitoring, etc.',
    images: [
      '/assets/projects/login-people.webp',
      '/assets/projects/people-dahsboard.webp',
      '/assets/projects/people-monitoring.webp',
    ],
    favicon: '/assets/icons/logo-people.png',
    techStack: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    liveUrl: 'https://people-analytic.digii.co.id/',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'akara',
    title: 'Akara',
    description: 'Akara is a digital map maker that presents visual geographic or special information using computer technology.',
    images: [
      '/assets/projects/akara-home.webp',
      '/assets/projects/akara-login.webp',
      '/assets/projects/akara-dashboard.webp',
      '/assets/projects/akara-maps.webp',
    ],
    favicon: '/assets/icons/logo-akara.png',
    techStack: ['React', 'Mapbox', 'Leaflet', 'Node.js'],
    liveUrl: 'https://akara.digii.co.id/',
    githubUrl: '#',
  },
  {
    id: 'montera',
    title: 'Montera',
    description: 'A digital map service for sugarcane plantation industry players to make quick operational decisions. Harnessing the true power of spatial analytic.',
    images: [
      '/assets/projects/montera-home.webp',
      '/assets/projects/montera-input.webp',
      '/assets/projects/montera-dashboard.webp',
    ],
    favicon: '/assets/icons/logo-akara.png',
    techStack: ['React', 'Mapbox', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://montera-beta.digii.co.id/',
    githubUrl: '#',
  },
  {
    id: 'dashnas',
    title: 'Dashboard Nasional',
    description: 'E-STDB National Monitoring Dashboard for Palm Oil Commodities.',
    images: [
      '/assets/projects/dashnas-login.webp',
      '/assets/projects/dashnas-1.webp',
      '/assets/projects/dashnas-2.webp',
    ],
    favicon: '/assets/icons/logo-dirjenbun.png',
    techStack: ['React', 'Chart.js', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://dashnas.ditjenbun.digii.co.id/',
    githubUrl: '#',
  },
  {
    id: 'palm-oil-detection',
    title: 'Palm Oil Detection',
    description: 'Palm tree detection using models that have been trained, namely satellite image models and aerial photos.',
    images: [
      '/assets/projects/plam-loginn.webp',
      '/assets/projects/palm-choose.webp',
      '/assets/projects/palm-result.webp',
    ],
    favicon: '/assets/icons/logo-akara.png',
    techStack: ['React', 'TensorFlow', 'Python', 'Node.js'],
    liveUrl: 'https://palm-akara.digii.co.id/',
    githubUrl: '#',
  },
  {
    id: 'bitres',
    title: 'BITRES',
    description: 'BITRES can develop innovative solutions to complex problems, driving positive social and environmental impact.',
    images: [
      '/assets/projects/bitres-home.webp',
      '/assets/projects/bitres-login.webp',
      '/assets/projects/bitres-choose.webp',
      '/assets/projects/bitres-result.webp',
    ],
    favicon: '/assets/icons/logo-bitres.png',
    techStack: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    liveUrl: 'https://bitres.digii.co.id/',
    githubUrl: '#',
  },
  {
    id: 'aws-ec2',
    title: 'AWS EC2 Instance',
    description: 'Manage vps servers AWS Ec Instance For Developing Etera.',
    images: [
      '/assets/projects/aws-console-home.webp',
      '/assets/projects/dashboard-aws.webp',
      '/assets/projects/linux-aws.webp',
    ],
    favicon: '/assets/icons/aws.ico',
    techStack: ['AWS', 'Linux', 'Docker'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'gotara',
    title: 'GOTARA',
    description: 'Application Farm Management System : Maggot',
    images: [
      '/assets/projects/gotara-login.webp',
      '/assets/projects/gotara-input.webp',
      '/assets/projects/goatar-list-simulasi.webp',
      '/assets/projects/gotara-simulasi.webp',
      '/assets/projects/gotara-post.webp',
    ],
    favicon: '/assets/icons/gotara.png',
    techStack: ['React', 'Laravel', 'MySQL'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'the-b-andara',
    title: 'The B Andara City',
    description: 'Cashier application with full features, barcode scanning, stock management, etc.',
    images: [
      '/assets/projects/theb/theb-home.webp',
      '/assets/projects/theb/booking-theb.webp',
      '/assets/projects/theb/simulasi-kpr.webp',
      '/assets/projects/theb/dashboard.webp',
      '/assets/projects/theb/list-nup.webp',
      '/assets/projects/theb/list-reject-nup.webp',
      '/assets/projects/theb/list-afiliasi.webp',
      '/assets/projects/theb/post-theb.webp',
      '/assets/projects/theb/price-list.webp',
      '/assets/projects/theb/track-user.webp',
    ],
    favicon: '/assets/icons/theb.svg',
    techStack: ['React', 'Node.js', 'MySQL', 'Barcode Scanning'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'pos-bintang',
    title: 'POS Bintang Elektronik',
    description: 'Application Farm Management System : Maggot',
    images: [
      '/assets/projects/bintang-login.webp',
      '/assets/projects/bintang-produk.webp',
      '/assets/projects/bintang-coupon.webp',
      '/assets/projects/bintang-transaksi.webp',
    ],
    favicon: '/assets/icons/bintang.svg',
    techStack: ['React', 'Laravel', 'MySQL'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'mgbox',
    title: 'MgBox System Warehouse',
    description: 'Application Warehouse Management System',
    images: [
      '/assets/projects/mgbox-login.webp',
      '/assets/projects/mgbox-input.webp',
      '/assets/projects/mgbox-pdf.webp',
      '/assets/projects/mgbox-staff.webp',
      '/assets/projects/mgbox-grafik.webp',
    ],
    favicon: '/assets/icons/box.webp',
    techStack: ['React', 'Node.js', 'MySQL', 'PDF Export'],
    liveUrl: 'https://mgboxyogya.com/',
    githubUrl: '#',
  },
];

export const certifications: Certification[] = [
  {
    title: 'Automate Generative AI workflows using Amazon Bedrock Flows',
    issuer: 'Amazon Web Services (AWS)',
    period: '2026',
    credentialUrl: 'https://media.licdn.com/dms/image/v2/D562DAQG3RP9LslGhCA/profile-treasury-document-images_1280/B56Z6rURS.JQAg-/1/1780990682162?e=1781740800&v=beta&t=2-gXCkNg7gSGU2Cw2dr3PiJIlfaen2HKgkc4HzxfSsQ'
  },
  {
    title: 'CRUD Operations in MongoDB',
    issuer: 'MongoDB',
    period: '2026',
    credentialId: 'MDBffs82l2nzx', // Ganti dengan nomor asli Anda jika ada
    credentialUrl: 'https://learn.mongodb.com/c/Df-xLOJ0T8Kn9I5VXQ5uGg', // Opsional, ganti atau hapus jika tidak ada
  },
  {
    title: 'Relational to Document Model',
    issuer: 'MongoDB',
    period: '2026',
    credentialId: 'MDBbkkj75q729', // Ganti dengan nomor asli Anda jika ada
    credentialUrl: 'https://learn.mongodb.com/c/w_4048jkT6S_DJgR29ziMw', // Opsional, ganti atau hapus jika tidak ada
  },
  {
    title: 'Fundamentals of Data Transformation',
    issuer: 'MongoDB',
    period: '2025',
    credentialId: 'MDBwd6hnkrpef', // Opsional, ganti atau hapus jika tidak ada
    credentialUrl: 'https://learn.mongodb.com/c/2DLwOfQgTMm6oulpQTkIoQ', // Opsional, ganti atau hapus jika tidak ada
  },
  {
    title: 'Certificate web development',
    issuer: 'NIIT',
    period: '2020',
  },
  {
    title: 'Certificate english in diploma',
    issuer: 'NIIT',
    period: '2020',
  }
];

export const skills: Skill[] = [
  { name: 'AI Agents & Autonomous Workflows', category: 'ai' },
  { name: 'LLM Integration & Prompt Engineering', category: 'ai' },
  { name: 'Claude Code, Anthropic & OpenAI APIs', category: 'ai' },
  { name: 'Ollama & Local Model Deployment', category: 'ai' },
  { name: 'Computer Vision (OpenCV & Spatial ML)', category: 'ai' },

  { name: 'PHP & Laravel Framework', category: 'backend' },
  { name: 'Node.js & Express.js', category: 'backend' },
  { name: 'Python (API & Analytics)', category: 'backend' },
  { name: 'RESTful API & Microservices', category: 'backend' },
  { name: 'SaaS Multi-Tenant Architecture', category: 'backend' },

  { name: 'React.js & Next.js', category: 'frontend' },
  { name: 'TypeScript & JavaScript', category: 'frontend' },
  { name: 'Flutter Mobile Development', category: 'frontend' },
  { name: 'Tailwind CSS & UI Components', category: 'frontend' },
  { name: 'Alpine.js & Responsive Design', category: 'frontend' },

  { name: 'WebGIS (Mapbox & Leaflet)', category: 'gis' },
  { name: 'GeoServer Spatial Infrastructure', category: 'gis' },
  { name: 'PostgreSQL & PostGIS Database', category: 'gis' },
  { name: 'MySQL & MongoDB Management', category: 'gis' },
  { name: 'Redis Caching & Optimization', category: 'gis' },

  { name: 'AWS Cloud (S3, EC2, Lambda)', category: 'tools' },
  { name: 'Docker Containerization', category: 'tools' },
  { name: 'Linux Server Administration (SSH)', category: 'tools' },
  { name: 'Git & GitHub Version Control', category: 'tools' },

  { name: 'Technical SEO Specialist', category: 'cms' },
  { name: 'WordPress Custom Plugin Dev', category: 'cms' },
  { name: 'Google Ads & Campaign ROI', category: 'cms' },
  { name: 'Data Driven Website Analytics', category: 'cms' },
];

export const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/pishapis_/',
    icon: 'instagram',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/pishapis/',
    icon: 'linkedin',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/pishapis',
    icon: 'github',
  },
  {
    name: 'Email',
    url: 'mailto:hapisadi12@gmail.com',
    icon: 'email',
  },
];
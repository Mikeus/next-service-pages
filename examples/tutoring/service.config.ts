import { parseServiceConfig, type ServiceConfig } from '../../lib/schemas';

/**
 * Example config: Chicago tutoring service.
 * Copy into lib/config/site.config.ts or merge with createServiceConfig().
 */
export const tutoringConfig: ServiceConfig = parseServiceConfig({
  businessName: 'BrightPath Tutoring',
  serviceType: 'tutoring',
  serviceVerb: 'tutor',
  phone: '(312) 555-0198',
  email: 'hello@brightpathtutoring.example',
  serviceArea: {
    primaryCity: 'Chicago',
    state: 'IL',
    cities: [
      { slug: 'chicago', name: 'Chicago', county: 'Cook', lat: 41.8781, lng: -87.6298 },
      { slug: 'evanston', name: 'Evanston', county: 'Cook', lat: 42.0451, lng: -87.6877 },
      { slug: 'oak-park', name: 'Oak Park', county: 'Cook', lat: 41.885, lng: -87.7845 },
      { slug: 'naperville', name: 'Naperville', county: 'DuPage', lat: 41.7508, lng: -88.1535 },
    ],
  },
  pricing: {
    startingAt: 65,
    currency: 'USD',
    unit: 'per hour',
  },
  seo: {
    titleTemplate: '%s | BrightPath Tutoring',
    defaultDescription:
      'Expert K-12 and test prep tutoring in Chicago and suburbs. In-home and virtual sessions with vetted educators.',
    ogImage: '/og-tutoring.jpg',
  },
  features: {
    aiBlog: true,
    onlineBooking: true,
    cityPages: true,
  },
  services: [
    {
      title: 'K-12 Subject Tutoring',
      description: 'Math, reading, science, and writing support aligned to school curriculum.',
    },
    {
      title: 'SAT & ACT Prep',
      description:
        'Structured test prep with practice exams, strategy sessions, and score tracking.',
    },
    {
      title: 'College Application Coaching',
      description: 'Essay review, interview prep, and application timeline planning.',
    },
    {
      title: 'Virtual Tutoring',
      description:
        'Live one-on-one sessions via video with shared whiteboard and session recordings.',
    },
  ],
  whyUs: [
    {
      title: 'Background-Checked Educators',
      description:
        'All tutors are screened, reference-checked, and experienced in their subject areas.',
    },
    {
      title: 'Personalized Learning Plans',
      description:
        'Every student gets a custom plan based on goals, learning style, and school requirements.',
    },
    {
      title: 'Flexible Scheduling',
      description: 'After-school, weekend, and virtual slots to fit busy family calendars.',
    },
    {
      title: 'Progress Reports',
      description:
        'Parents receive monthly summaries with attendance, focus areas, and next steps.',
    },
  ],
  faqs: [
    {
      question: 'Do you offer tutoring in {{cityName}}, {{state}}?',
      answer:
        'Yes — BrightPath Tutoring serves students in {{cityName}} and throughout {{county}} County with in-home and online options.',
    },
    {
      question: 'What subjects can a {{serviceVerb}} help with in {{cityName}}?',
      answer:
        'We cover K-12 core subjects, AP courses, SAT/ACT prep, and college application coaching for {{cityName}} families.',
    },
    {
      question: 'How do I book a {{serviceVerb}} near {{cityName}}?',
      answer:
        'Call {{phone}} or submit a booking request online. We match you with a {{serviceVerb}} within 48 hours.',
    },
    {
      question: 'Are sessions in-person or online in {{cityName}}?',
      answer:
        'Both. Most {{cityName}} families choose in-home sessions; virtual tutoring is available everywhere we serve.',
    },
  ],
});

export default tutoringConfig;

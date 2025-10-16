import type { Task } from '@/types/task.types';

export const currentTasks: Task[] = [
  {
    title: 'Join a cybersecurity community',
    content:
      'There are a number of online and offline cybersecurity communities. Joining a community allows you to connect with industry experts, stay updated on the latest threats and security practices, and get support from peers facing similar challenges.',
    type: 'practice',
    isCompleted: false,
  },
  {
    title: 'Analyze a security log',
    content:
      'Security logs contain information about all of the activity that occurs on a computer system. This activity includes both normal system operations.',
    type: 'reading',
    isCompleted: false,
  },
];

export const pastTasks: Task[] = [
  {
    title: 'Complete basic security fundamentals',
    content:
      'Foundation course covering essential cybersecurity concepts including CIA triad, threat modeling, and basic security controls.',
    type: 'training',
    isCompleted: true,
  },
  {
    title: 'Read Introduction to Cryptography',
    content:
      'Understanding symmetric and asymmetric encryption, hashing algorithms, and digital signatures.',
    type: 'reading',
    isCompleted: true,
  },
  {
    title: 'Set up virtual machine environment',
    content:
      'Configure VirtualBox or VMware environment for safe penetration testing and malware analysis.',
    type: 'practice',
    isCompleted: true,
  },
  {
    title: 'Read the OWASP Top 10',
    content:
      'The OWASP Top 10 is a list of the top 10 web application security risks. It is a great resource for developers and security professionals.',
    type: 'reading',
    isCompleted: true,
  },
  {
    title: 'Read the NIST Cybersecurity Framework',
    content:
      'The NIST Cybersecurity Framework is a voluntary framework that provides guidance on how organizations can assess and improve their ability to prevent, detect, and respond to cyber attacks.',
    type: 'reading',
    isCompleted: true,
  },
  {
    title: 'Attend cybersecurity conferences',
    content:
      'Cybersecurity conferences and events are a great way to learn about the latest trends, threats, and technologies in the field.',
    type: 'training',
    isCompleted: true,
  },
  {
    title: 'Configure a firewall',
    content:
      'A firewall is a security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules.',
    type: 'practice',
    isCompleted: true,
  },
  {
    title: 'Build a home lab',
    content:
      'A home lab is a great way to experiment with cybersecurity tools and technologies without worrying about breaking anything in a production environment.',
    type: 'practice',
    isCompleted: true,
  },
  {
    title: 'Read Top 3 1.0 SANS Institute Information...',
    content:
      'The SANS Institute Information Security Reading Room is a collection of over 10,000 research documents about various information security topics, written by information security practitioners.',
    type: 'reading',
    isCompleted: true,
  },
];

export const futureTasks: Task[] = [
  {
    title: 'Advanced penetration testing',
    content:
      'Learn advanced techniques for ethical hacking including web application testing, network penetration testing, and social engineering.',
    type: 'training',
    isCompleted: false,
  },
  {
    title: 'Incident response simulation',
    content:
      'Participate in tabletop exercises simulating real-world cyber incidents and practice incident response procedures.',
    type: 'practice',
    isCompleted: false,
  },
  {
    title: 'Study cloud security fundamentals',
    content:
      'Understanding security challenges and best practices for cloud computing environments including AWS, Azure, and GCP.',
    type: 'reading',
    isCompleted: false,
  },
  {
    title: 'Malware analysis workshop',
    content:
      'Hands-on training in reverse engineering and analyzing malicious software using static and dynamic analysis techniques.',
    type: 'training',
    isCompleted: false,
  },
  {
    title: 'Digital forensics investigation',
    content:
      'Learn to collect, preserve, and analyze digital evidence from various devices and storage media.',
    type: 'practice',
    isCompleted: false,
  },
];

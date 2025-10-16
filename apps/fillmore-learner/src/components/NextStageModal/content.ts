import type { TaskType } from '@/types/task.types';

export interface TrainingQuestion {
  id: string;
  prompt: string;
}

export interface TrainingOption {
  id: string;
  label: string;
}

export interface TrainingQuestionGroup {
  id: string;
  prompts: TrainingQuestion[];
  options: TrainingOption[];
}

export interface ReadingContent {
  title: string;
  paragraphs: string[];
}

export interface PracticePrompt {
  id: string;
  title: string;
  description: string;
}

export const progressLabelByTaskType: Record<
  TaskType,
  (step: number) => string
> = {
  training: (step: number) => `Question ${step + 1} - Fill in blanks`,
  reading: (step: number) => `Article ${step + 1}`,
  practice: (step: number) =>
    `Question ${step + 1} - Command Prompt Simulation`,
};

export const trainingQuestionGroup: TrainingQuestionGroup = {
  id: 'default-training-set',
  prompts: [
    {
      id: '1',
      prompt:
        'A ___ brute force attack involves trying all possible combinations of characters until the correct one is found.',
    },
    {
      id: '2',
      prompt:
        '___ attacks use a list of potential passwords compiled into a dictionary file, which might include words from the dictionary or commonly used passwords.',
    },
    {
      id: '3',
      prompt:
        'A ___ brute force attack combines elements of both dictionary attacks and simple brute force attacks by appending or prepending characters to the words in a dictionary file.',
    },
    {
      id: '4',
      prompt:
        '___ is a method used to differentiate between humans and ___, which can help prevent automated brute force tools from making login attempts.',
    },
    {
      id: '5',
      prompt:
        'To enhance security against brute force attacks, implementing ___ alongside strong ___ policies can significantly reduce the risk of unauthorized access.',
    },
  ],
  options: [
    { id: 'dictionary', label: 'Dictionary' },
    { id: 'encryption', label: 'Encryption' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'captcha', label: 'CAPTCHA' },
    { id: 'simple', label: 'Simple' },
    { id: 'multi-factor authentication', label: 'Multi-Factor Authentication' },
    { id: 'passwords', label: 'Passwords' },
    { id: 'account lockout', label: 'Account Lockout' },
    { id: 'ip address', label: 'IP Address' },
    { id: 'automated scripts', label: 'Automated Scripts' },
  ],
};

export const readingContent: ReadingContent = {
  title:
    'Navigating the Threat Landscape: Understanding Code Injection Attacks',
  paragraphs: [
    'Landscape: Understanding Code Injection Attacks',
    'In the vast and complex world of cyber security, code injection attacks stand out as a particularly insidious threat. These attacks involve the insertion of malicious code into a vulnerable program or website, exploiting security vulnerabilities to execute unauthorized commands or access sensitive information. Understanding the mechanics, impact, and defense strategies against code injection is crucial for maintaining the integrity and security of digital assets.',
    'The Mechanics of Code Injection Attacks',
    "Code injection can take various forms, including SQL Injection (SQLi), Cross-Site Scripting (XSS), and Remote Code Execution (RCE), among others. The essence of these attacks lies in the attacker's ability to insert malicious code into a system where input data is not properly sanitized or validated. For example, in an SQL injection attack, an attacker might input malicious SQL code into a web form to manipulate the database behind a website, allowing them to steal data, corrupt the database, or gain unauthorized access to sensitive areas of the website.",
    'The Impact of Code Injection',
    'The impact of code injection attacks can be devastating. They can lead to data breaches, loss of sensitive or proprietary information, damage to systems or websites, and erosion of user trust. In some cases, attackers can gain full control over the affected systems, allowing them to carry out further attacks, spread malware, or establish persistent access to the network.',
    'Defending Against Code Injection',
    'Defending against code injection attacks requires a multi-faceted approach. Key strategies include validating and sanitizing user input, using prepared statements and parameterized queries, implementing Content Security Policies (CSP), conducting regular security audits, and educating teams about secure coding practices.',
    'Conclusion',
    'Code injection attacks represent a significant threat in the cyber landscape. By understanding the nature of these attacks and implementing robust defense strategies, organizations can protect themselves against potential damage and maintain the trust of their users.',
  ],
};

export const practicePrompts: PracticePrompt[] = [
  {
    id: 'p1',
    title: 'Detecting Unauthorized Access',
    description:
      "You've noticed unusual activity on your network and suspect an unauthorized access attempt. Which command do you use to view active network connections and associated programs?",
  },
  {
    id: 'p2',
    title: 'Analyzing Network Traffic',
    description:
      'To further investigate potential security breaches, you decide to capture and analyze network traffic. Which command initiates packet capturing?',
  },
  {
    id: 'p3',
    title: 'Updating System to Patch Vulnerabilities',
    description:
      'A critical security update has been released for your system. Which command will you use to update your system?',
  },
];

import React from 'react';
import ContentContainer from '@/components/ContentContainer';

import { VStack, Text } from '@fillmore/ui';

interface SkillItem {
  title: string;
  description: string;
}

const StrengthsWeaknessesSection: React.FC = () => {
  const strengths: SkillItem[] = [
    {
      title: 'Technical skills:',
      description:
        'knowledge of networking, operating systems, and programming languages',
    },
    {
      title: 'Problem-solving skills:',
      description: 'able to think critically and solve problems effectively',
    },
    {
      title: 'Analytical skills:',
      description:
        'able to collect and analyze data to identify and mitigate security threats',
    },
    {
      title: 'Communication skills:',
      description:
        'able to communicate effectively with both technical and non-technical audiences',
    },
  ];

  const weaknesses: SkillItem[] = [
    {
      title: 'Limited experience with advanced penetration testing techniques',
      description:
        'Need to improve knowledge and practical experience in advanced penetration testing methodologies',
    },
    {
      title: 'Need to develop stronger incident response capabilities',
      description:
        'Require more experience in handling and responding to security incidents',
    },
    {
      title: 'Could benefit from more hands-on cloud security experience',
      description:
        'Need to gain more practical experience with cloud security platforms and tools',
    },
  ];

  return (
    <ContentContainer title="Strengths & Weaknesses">
      <VStack
        gap={8}
        align="start"
        style={{
          height: '200px',
          overflow: 'scroll',
          paddingBottom: '24px',
        }}
      >
        <VStack gap={8} align="start" fullWidth={true}>
          <Text as="b" size={12} weight="bold">
            Strengths:
          </Text>
          <VStack gap={4} align="start" fullWidth={true}>
            {strengths.map((strength, index) => (
              <Text key={index} as="span" size={12}>
                •{' '}
                <Text as="b" size={12} weight="bold">
                  {strength.title}
                </Text>{' '}
                {strength.description}
              </Text>
            ))}
          </VStack>
        </VStack>

        <VStack gap={8} align="start" fullWidth={true}>
          <Text as="b" size={12} weight="bold">
            Weaknesses:
          </Text>
          <VStack gap={4} align="start" fullWidth={true}>
            {weaknesses.map((weakness, index) => (
              <Text key={index} as="span" size={12}>
                •{' '}
                <Text as="b" size={12} weight="bold">
                  {weakness.title}
                </Text>{' '}
                {weakness.description}
              </Text>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </ContentContainer>
  );
};

export default StrengthsWeaknessesSection;

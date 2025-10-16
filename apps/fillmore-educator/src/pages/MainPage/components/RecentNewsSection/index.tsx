import React, { useState } from 'react';
import ContentContainer from '@/components/ContentContainer';

import {
  BaseModal,
  Button,
  CloseButton,
  HStack,
  Text,
  VStack,
} from '@fillmore/ui';
import S from './styles';

const RecentNewsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <ContentContainer title="Recent News">
        <VStack
          gap={8}
          align="start"
          style={{
            height: '200px',
            overflow: 'scroll',
            paddingBottom: '24px',
          }}
        >
          <Text as="b" size={12} weight="bold">
            Cyber Espionage and Nation-State Threats
          </Text>
          <Text as="b" size={10} weight="bold">
            SEPTEMBER 4, 2023
          </Text>
          <Text as="p" size={12}>
            Ongoing cyber espionage activities, often linked to nation-states,
            continued to make headlines. Notable actors include groups
            associated with Russia, China, Iran, and North Korea, engaging in
            cyber espionage against governments, corporations, and research
            institutions.
          </Text>
          <Button onClick={openModal}>Read full Story</Button>
        </VStack>
      </ContentContainer>

      <BaseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        gap="12px"
        zIndex={1400}
      >
        <HStack align="center" justify="space-between">
          <Text as="b" size={26} weight="bold">
            Cyber Espionage and Nation-State Threats
          </Text>
          <CloseButton onClick={closeModal} />
        </HStack>
        <Text as="b" size={16} weight="bold">
          February 4, 2024
        </Text>
        <S.ModalContent>
          <Text as="p" size={12}>
            In our increasingly digitized world, the role of cybersecurity
            analysts has never been more critical. These dedicated professionals
            stand as the guardians of digital realms, protecting organizations
            from ever-evolving cyber threats. If you're aspiring to join this
            elite group, here are the core skills and knowledge areas you need
            to become a cybersecurity analyst.
            <br />
            <br />
            <strong>1. Technical Proficiency:</strong>
            <br />
            <br />
            At the heart of cybersecurity lies technical expertise. You must
            have a solid grasp of operating systems, networking, and programming
            languages. A deep understanding of how different technologies
            interact and potential vulnerabilities is crucial. Proficiency in
            tools like Wireshark, Metasploit, and IDS/IPS (Intrusion Detection
            System/Intrusion Prevention System) is a must.
            <br />
            <br />
            <strong>2. Cybersecurity Fundamentals:</strong>
            <br />
            <br />
            Begin with a strong foundation. Understand the basic principles of
            cybersecurity, including threat types, attack vectors, and risk
            management. Familiarize yourself with concepts like cryptography,
            access controls, and network security protocols.
            <br />
            <br />
            <strong>3. Threat Intelligence:</strong>
            <br />
            <br />
            Stay up-to-date with the latest threats and vulnerabilities. Cyber
            threats are constantly evolving, and analysts need to know the
            enemy. Follow cybersecurity news, participate in forums, and engage
            with threat intelligence sources to anticipate and defend against
            emerging threats.
            <br />
            <br />
            <strong>4. Security Frameworks and Regulations:</strong>
            <br />
            <br />
            Compliance with industry standards and regulations is paramount.
            Familiarize yourself with cybersecurity frameworks such as NIST
            Cybersecurity Framework, CIS Controls, and ISO 27001. Understanding
            data protection laws like GDPR or HIPAA, depending on your region,
            is essential.
            <br />
            <br />
            <strong>5. Analytical Skills:</strong>
            <br />
            <br />
            Cybersecurity analysts are detectives in the digital realm. You need
            strong analytical skills to dissect incidents, identify patterns,
            and assess risks. Critical thinking and problem-solving abilities
            are vital for effective incident response plans for organizations.
            <br />
            <br />
            <strong>6. Incident Response:</strong>
            <br />
            <br />
            Being prepared for the worst is part of the job. Learn about
            incident response procedures, including how to detect, analyze,
            mitigate, and recover from security incidents. Creating an incident
            response plan for organizations is a valuable skill.
            <br />
            <br />
            <strong>7. Networking and Communication:</strong>
            <br />
            <br />
            Effective communication is key. Cybersecurity analysts often
            collaborate with IT teams, management, and external partners. Clear
            communication helps convey risks, recommend solutions, and
            facilitate coordinated responses.
          </Text>
        </S.ModalContent>
      </BaseModal>
    </>
  );
};

export default RecentNewsSection;
